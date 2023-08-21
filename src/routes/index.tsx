import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { Box, useTheme } from 'native-base';
import { useAuth } from '@hooks/useAuth';
import { AppRoutes } from './app.routes';

export function Routes() {

    const { colors } = useTheme();

    const {user} = useAuth();

    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    return (
        <Box flex={1} bg={"gray.700"}>

            <NavigationContainer>
                { user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>

        </Box>
    );
}