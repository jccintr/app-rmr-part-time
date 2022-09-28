import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Preload from "../screens/Preload";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

import ClientTab from "./ClientTab";
import WorkerTab from "./WorkerTab";



const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Preload">
        <Stack.Screen  name="Preload" component={Preload}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="ClientTab" component={ClientTab}/>
        <Stack.Screen name="WorkerTab" component={WorkerTab}/>
      
    </Stack.Navigator>
  )
}

export default MainStack
