

import { NavigationContainer } from '@react-navigation/native';
import MainStack from './stacks/MainStack'
import { DataProvider } from './screens/context/DataContext';

export default function App() {
  return (
    <DataProvider>
       <NavigationContainer>
       <MainStack />
    </NavigationContainer>
    </DataProvider>
    
  );
}
