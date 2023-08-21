import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from "native-base";

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type FormDataProps = {
    email: string;
    password: string;

}

const signInSchema = yup.object({

    email: yup.string().required('Informe o e-mail.'),
    password: yup.string().required('Informe a senha.'),

});

export function SignIn() {


    const { signIn } = useAuth();

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    const toast = useToast();

    function handleNewAccount() {
        navigation.navigate('signUp');
    }

    async function handleSignIn({ email, password }: FormDataProps) {

        try {

            await signIn(email,password);

        } catch (error) {

            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })

        }


    }

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema)
    });

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsHorizontalScrollIndicator={false}
        >
            <VStack flex={1} px={10}>

                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas Treinando"
                    resizeMode="contain"
                    position="absolute"
                />

                <Center my={24}>
                    <LogoSvg />
                    <Text color={"gray.100"} fontSize={"sm"}>
                        Treine sua mente e o seu corpo.
                    </Text>

                </Center>

                <Center>

                    <Heading color={"gray.100"} fontSize={"xl"} mb={6} fontFamily={"heading"}>
                        Acesse sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />



                    <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />


                </Center>

                <Center mt={24}>

                    <Text
                        color={"gray.100"}
                        fontSize={"sm"}
                        mb={3}
                        fontFamily={"body"}
                    >
                        Ainda não tem acesso?
                    </Text>

                    <Button title="Criar conta" variant={"outline"} onPress={handleNewAccount} />
                </Center>


            </VStack>
        </ScrollView>
    );
}