import { NavigationContainer } from '@react-navigation/native';
import MainStack from './stacks/MainStack'
import { DataProvider } from './screens/context/DataContext';
import { StripeProvider } from '@stripe/stripe-react-native';


export default function App() {
  const STRIPE_KEY = 'pk_test_51OUqNWEywxSDAMQCske9J5uP34oMnpnElP7i3SiqIvcYEkGOaIgxrV7IfkUwdpQ4D6wnPgjpzRbTtJwdJuAXoyVG00lLRqNXdz';
  
  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
        <DataProvider>
            <NavigationContainer>
                <MainStack />
            </NavigationContainer>
        </DataProvider>
    </StripeProvider>
    
  );
}
