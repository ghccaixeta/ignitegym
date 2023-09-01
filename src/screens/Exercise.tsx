import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetiotionSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';
import { useEffect, useState } from 'react';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Loading } from '@components/Loading';

type RouteParamsProps = {
    exerciseId: string;
}

export function Exercise() {
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    const route = useRoute();
    const toast = useToast();

    const { exerciseId } = route.params as RouteParamsProps

    function handleGoBack() {
        navigation.goBack()
    }

    async function fetchExerciseDetails() {
        try {
            
            const response = await api.get(`/exercises/${exerciseId}`);
            setExercise(response.data);

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar o exercício.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchExerciseDetails();
    }, [exercise])

    return (
        <VStack flex={1}>


            <VStack px={8} bg={"gray.600"} pt={12}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={Feather} name='arrow-left' color={"green.500"} size={6} />
                </TouchableOpacity>
                <HStack mt={4} mb={8} justifyContent={"space-between"} alignItems={"center"}>
                    <Heading color={"gray.100"} fontSize={"lg"} flexShrink={1} fontFamily={"heading"}>
                        {exercise.name}
                    </Heading>
                    <HStack alignItems={"center"}>
                        <BodySvg />
                        <Text color={"gray.200"} ml={1} textTransform={'capitalize'}>
                            {exercise.group}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
            <ScrollView>

                {
                    isLoading ? <Loading /> :
                        <VStack p={8}>
                            <Image
                                w={"full"}
                                h={80}
                                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                                rounded={'lg'}
                                mb={3}
                                resizeMode='cover'
                                alt='Imagem do exercício'
                            />

                            <Box bg={"gray.600"} rounded={"lg"} py={6} px={3}>
                                <HStack justifyContent={"space-around"} mb={4}>
                                    <HStack>

                                        <SeriesSvg />
                                        <Text ml={3} color={"gray.100"} fontSize={"sm"}>
                                            {exercise.series} séries
                                        </Text>
                                    </HStack>
                                    <HStack>

                                        <RepetiotionSvg />
                                        <Text ml={3} color={"gray.100"} fontSize={"sm"}>
                                            {exercise.repetitions} Repetições
                                        </Text>
                                    </HStack>
                                </HStack>
                                <Button title='Marcar cmo realizado' />
                            </Box>
                        </VStack>
                }

            </ScrollView>
        </VStack>

    )

}