import { HStack, Heading, Image, VStack, Text, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'
import { ExerciseDTO } from "@dtos/ExerciseDTO";

type Props = TouchableOpacityProps & {
    data: ExerciseDTO;
}

export function ExerciseCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <HStack bg={"gray.500"} alignItems={"center"} p={2} pr={4} rounded={"md"} mb={3}>
                <Image
                    source={{ uri: 'https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-3.jpg' }}
                    alt="Imagem Remada Lateral"
                    w={16}
                    h={16}
                    rounded={"md"}
                    mr={4}
                    resizeMode="cover"
                />
                <VStack flex={1}>
                    <Heading color={"white"} fontSize={"lg"} fontFamily={"heading"}>
                        {data.name}
                    </Heading>
                    <Text color={"gray.200"} fontSize={"sm"} mt={1} numberOfLines={2}>
                         {data.series} séries x {data.repetitions} repetições
                    </Text>
                </VStack>
                <Icon as={Entypo} name="chevron-thin-right" color={"gray.300"} />
            </HStack>
        </TouchableOpacity>
    )
}