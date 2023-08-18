import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';

import { THEME } from './src/theme';
import { Routes } from '@routes/index';
import { AppRoutes } from '@routes/app.routes';
import { AuthContext } from '@contexts/AuthContext';

export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (

    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthContext.Provider value={{
        user:{

          id: '2',
          name: 'Gustavo Caixeta',
          email: 'gustavo@email.com',
          avatar: 'ghccaixeta.png',
        }
      }}>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>


    </NativeBaseProvider>

  );
}
