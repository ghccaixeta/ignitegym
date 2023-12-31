import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, VStack, SectionList, Text } from 'native-base'
import { useState } from 'react'


export function History() {
    const [exercises, setExercises] = useState([
        {
            title: '26.08.22',
            data: ['Puxada Frontal', 'Remada Unilateral'],
        },
        {
            title: '27.08.22',
            data: ['Puxada Frontal'],
        }
    ])
    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />
            <SectionList
                sections={exercises}
                keyExtractor={item => item}
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