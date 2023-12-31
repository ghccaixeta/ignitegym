import { HStack, Heading, VStack, Text } from "native-base";

export function HistoryCard() {
    return(
        <HStack justifyContent={"space-between"} alignItems={"center"} bg={"gray.600"} rounded={"md"} px={5} py={4} mb={3}>
            <VStack mr={5} flex={1}>
                <Heading color={"white"} fontSize={"md"} textTransform={"capitalize"} fontFamily={"heading"}>Costas</Heading>
                <Text color={"gray.100"} fontSize={"lg"} numberOfLines={1}>Puxada Frontral</Text>
            </VStack>
            <Text color={"gray.300"} fontSize={"md"}>08:56</Text>
        </HStack>
    )
}