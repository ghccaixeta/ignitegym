import { HStack, Heading, Text, VStack } from "native-base";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
    return (
        <HStack background={"gray.600"} pt={16} pb={5} px={8} alignItems={"center"}>
            <UserPhoto 
                source={{ uri: 'https://github.com/ghccaixeta.png' }}
                size={16}
                alt="Imagem do usuário"
                mr={4}
            />
            <VStack>

                <Text color={"gray.100"} fontSize={"md"}>
                    Olá,
                </Text>
                <Heading color={"gray.100"} fontSize={"md"}>
                    Gustavo
                </Heading>
            </VStack>
        </HStack>
    )
}