import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { Heading, VStack, SectionList, Text, useToast } from 'native-base'
import { useCallback, useState } from 'react'


export function History() {

    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);

    const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

    async function fetchExerciseHistory() {
        try {
            setIsLoading(true)
            const response = await api.get('/history');
            setExercises(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi obter o histórico.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() =>{
        fetchExerciseHistory();
    }, []))

    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />
            <SectionList
                sections={exercises}
                keyExtractor={item => item.id}
                renderItem={({item}) => (<HistoryCard />)}
                renderSectionHeader={({section})=>(
                    <Heading color={"gray.100"} fontSize={"md"} mt={10} mb={3} fontFamily={"heading"}>
                        {section.title}
                    </Heading>
                )}
                px={6}
                contentContainerStyle={!exercises.length && {flex: 1, justifyContent: "center"}}
                ListEmptyComponent={()=>(
                    <Text color={"gray.100"} textAlign={"center"}>
                        Nenhum exercício registado.
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
            />
            
        </VStack>
    )

}