import { HistoryDTO } from "@dtos/HistoryDTO";
import { HStack, Heading, VStack, Text } from "native-base";

type Props = {
    data: HistoryDTO;
}

export function HistoryCard({ data }: Props) {
    return(
        <HStack justifyContent={"space-between"} alignItems={"center"} bg={"gray.600"} rounded={"md"} px={5} py={4} mb={3}>
            <VStack mr={5} flex={1}>
                <Heading color={"white"} fontSize={"md"} textTransform={"capitalize"} fontFamily={"heading"}>{data.group}</Heading>
                <Text color={"gray.100"} fontSize={"lg"} numberOfLines={1}>{data.name}</Text>
            </VStack>
            <Text color={"gray.300"} fontSize={"md"}>{data.hour}</Text>
        </HStack>
    )
}