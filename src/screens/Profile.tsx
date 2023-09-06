import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base'
import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'


const PHOTO_SIZE = 33;

type FormDataProps = {
    name: string;
    email: string;
    old_password: string;
    password: string;
    confirm_password: string;

}

const profileSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o email'),
    old_password: yup.string().required('Informe a senha antiga.'),
    password: yup.string().required('Informe a nova senha'),
    confirm_password: yup.string().required('Confirme a nova senha.'),
})

export function Profile() {
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState('https://github.com/ghccaixeta.png');

    const toast = useToast();
    const { user } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema)
    });


    async function handleUserProfileUpdate(data:FormDataProps) {
        console.log(data);
    }

    async function handleUserPhotoSelect() {
        setPhotoIsLoading(true)
        try {

            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,

            });

            if (photoSelected.canceled) return

            if (photoSelected.assets[0].uri) {

                const uri = photoSelected.assets[0].uri

                const photoInfo = await FileSystem.getInfoAsync(uri) as FileSystem.FileInfo

                if (photoInfo.size && (photoInfo.size / 1024 / 1024 > 2)) {

                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
                        placement: 'top',
                        bgColor: "red.500"
                    })


                }

                setUserPhoto(uri)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false)

        }

    }


    return (
        <VStack flex={1}>
            <ScreenHeader title='Perfil' />
            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
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
                                source={{ uri: userPhoto }}
                                size={PHOTO_SIZE}
                                alt="Imagem do usuário"

                            />
                    }

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color={"green.500"} fontSize={"md"} fontWeight={"bold"} mt={2} mb={8}>
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>

                    <Controller
                        control={control}
                        name='name'
                        render={({ field: { value, onChange } }) => (

                            <Input
                                bg={"gray.600"}
                                placeholder='Nome'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='email'
                        render={({ field: { value, onChange } }) => (

                            <Input
                                bg={"gray.600"}
                                placeholder='E-mail'
                                isDisabled
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Heading color={"gray.200"} fontSize={"md"} mb={2} alignSelf={"flex-start"} mt={12} fontFamily={"heading"}>
                        Alterar Senha
                    </Heading>
                    <Controller
                        control={control}
                        name='old_password'
                        render={({ field: { onChange } }) => (


                            <Input
                                bg={"gray.600"}
                                placeholder='Senha antiga'
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.old_password?.message}
                                ml={0}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='password'
                        render={({ field: { onChange } }) => (


                            <Input
                                bg={"gray.600"}
                                placeholder='Nova aenha'
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                                ml={0}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='confirm_password'
                        render={({ field: { value, onChange } }) => (
                            <Input
                                bg={"gray.600"}
                                placeholder='Confirme a nova senha'
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.confirm_password?.message}
                                ml={0}
                            />
                        )}
                    />
                    <Button title='Atualizar' onPress={handleSubmit(handleUserProfileUpdate)} />
                </Center>


            </ScrollView>
        </VStack>
    )

}