import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from 'native-base'
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PHOTO_SIZE = 33;

export function Profile() {
    const [photoIsLoading, setPhotoIsLoading] = useState(false);

    async function handleUserPhotoSelect() {
        const photoSelected = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4,4],
            allowsEditing: true,

        });

        console.log(photoSelected)
    }

    return (
        <VStack flex={1}>
            <ScreenHeader title='Perfil' />
            <ScrollView contentContainerStyle={{paddingBottom: 36}}>
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

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color={"green.500"} fontSize={"md"} fontWeight={"bold"} mt={2} mb={8}>
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>

                    <Input 
                        bg={"gray.600"}
                        placeholder='Nome'
                    />
                    <Input 
                        bg={"gray.600"}
                        placeholder='E-mail'
                        isDisabled
                    />

                    <Heading color={"gray.200"} fontSize={"md"} mb={2} alignSelf={"flex-start"} mt={12}>
                        Alterar Senha
                    </Heading>
                    <Input 
                        bg={"gray.600"}
                        placeholder='Senha antiga'
                        secureTextEntry
                        ml={0}
                    />
                    <Input 
                        bg={"gray.600"}
                        placeholder='Nova aenha'
                        secureTextEntry
                        ml={0}
                    />
                    <Input 
                        bg={"gray.600"}
                        placeholder='Confirme a nova senha'
                        secureTextEntry
                        ml={0}
                    />
                    <Button title='Atualizar' />
                </Center>
                
                
            </ScrollView>
        </VStack>
    )

}