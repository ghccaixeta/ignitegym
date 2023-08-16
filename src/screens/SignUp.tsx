import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useForm, Controller } from "react-hook-form";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;

}

export function SignUp() {

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>();

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleLogin() {
        navigation.navigate('signIn');
    }

    function handleSignUp(data: FormDataProps) {
        console.log(data)
    }

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
                        Crie sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="name"
                        rules={{
                            required: 'Informe o nome.'
                        }}
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}

                            />
                        )}
                    />
                    <Text color={"white"}>
                        {errors.name?.message}
                    </Text>

                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'Informe o e-mail.',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'E-mail inválido'
                            }
                        }}
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Text color={"white"}>
                        {errors.email?.message}
                    </Text>

                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: 'Informe a senha.'
                        }}
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Text color={"white"}>
                        {errors.password?.message}
                    </Text>

                    <Controller
                        control={control}
                        name="password_confirm"
                        rules={{
                            required: 'Confirme a senha.'
                        }}
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Confirme a senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType="send"
                            />
                        )}
                    />

                    <Text color={"white"}>
                        {errors.password_confirm?.message}
                    </Text>





                    <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />


                </Center>

                <Button title="Voltar para o login" variant={"outline"} mt={24} onPress={handleLogin} />



            </VStack>
        </ScrollView>
    );
}
