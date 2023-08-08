import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center, ScrollView, Skeleton, VStack } from 'native-base'
import { useState } from 'react';

const PHOTO_SIZE = 33;

export function Profile() {
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    return (
        <VStack flex={1}>
            <ScreenHeader title='Perfil' />
            <ScrollView>
                <Center mt={6} px={10}>
                    {
                        photoIsLoading ?
                            <Skeleton
                                w={PHOTO_SIZE}
                                h={PHOTO_SIZE}
                                rounded={"full"}
                                startColor={"gray.500"}
                                endColor={"gray.400"}
                            />
                            :
                            <UserPhoto
                                source={{ uri: 'https://github.com/ghccaixeta.png' }}
                                size={PHOTO_SIZE}
                                alt="Imagem do usuário"

                            />
                    }

                </Center>
            </ScrollView>
        </VStack>
    )

}