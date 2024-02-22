import { NavigationContainer } from '@react-navigation/native';
import MainStack from './stacks/MainStack'
import { DataProvider } from './screens/context/DataContext';
import { StripeProvider } from '@stripe/stripe-react-native';


export default function App() {
  const STRIPE_KEY = 'pk_live_51Mwa3YDbWrltuzJ3gue14Q32zp2Utib18LxjvHBgWkksrvM29InrKmjHvH7CPgl1cZ6VYudWLCDk8wLWgmxZxoWr00Kq3I5rHA';
  
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
