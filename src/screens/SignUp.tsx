import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useState } from "react";

export function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleLogin() {
        navigation.navigate('signIn');
    }

    function handleSignUp() {
        console.log({name, email, password, passwordConfirm});
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

                    <Input
                        placeholder="Nome"
                        onChangeText={setName}

                    />

                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={setEmail}
                    />
                    <Input
                        placeholder="Senha"
                        secureTextEntry
                        onChangeText={setPassword}
                    />

                    <Input
                        placeholder="Confirme a senha"
                        secureTextEntry
                        onChangeText={setpasswordConfirm}
                    />

                    <Button title="Criar e acessar" onPress={handleSignUp} />


                </Center>

                <Button title="Voltar para o login" variant={"outline"} mt={24} onPress={handleLogin} />



            </VStack>
        </ScrollView>
    );
}
