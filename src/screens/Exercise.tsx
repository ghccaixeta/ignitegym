import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetiotionSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button';

type RouteParamsProps = {
    exerciseId: string;
}

export function Exercise() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    const route = useRoute();

    const {exerciseId} = route.params as RouteParamsProps

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <VStack flex={1}>


            <VStack px={8} bg={"gray.600"} pt={12}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={Feather} name='arrow-left' color={"green.500"} size={6} />
                </TouchableOpacity>
                <HStack mt={4} mb={8} justifyContent={"space-between"} alignItems={"center"}>
                    <Heading color={"gray.100"} fontSize={"lg"} flexShrink={1} fontFamily={"heading"}>
                        Remada Unilateral
                    </Heading>
                    <HStack alignItems={"center"}>
                        <BodySvg />
                        <Text color={"gray.200"} ml={1} textTransform={'capitalize'}>
                            Costas
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
            <ScrollView>

                <VStack p={8}>
                    <Image
                        w={"full"}
                        h={80}
                        source={{ uri: 'https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-3.jpg' }}
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
                                    3 séries
                                </Text>
                            </HStack>
                            <HStack>

                                <RepetiotionSvg />
                                <Text ml={3} color={"gray.100"} fontSize={"sm"}>
                                    12 Repetições
                                </Text>
                            </HStack>
                        </HStack>
                        <Button title='Marcar cmo realizado' />
                    </Box>
                </VStack>

            </ScrollView>
        </VStack>

    )

}