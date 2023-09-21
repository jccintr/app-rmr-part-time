import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Preload from "../screens/Preload";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ServicoClient from "../screens/Client/ServicoClient";
import NovoPedido from "../screens/Client/NovoPedido";
import ServicoWorker from "../screens/Worker/ServicoWorker";
import Categoria from "../screens/Client/Categoria";
import DetCategoria from "../screens/Client/DetCategoria";
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";

import ClientTab from "./ClientTab";
import WorkerTab from "./WorkerTab";



const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Preload">
        <Stack.Screen  name="Preload" component={Preload}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="ServicoClient" component={ServicoClient}/>
        <Stack.Screen name="NovoPedido" component={NovoPedido}/>
        <Stack.Screen name="ServicoWorker" component={ServicoWorker}/>
        <Stack.Screen name="ClientTab" component={ClientTab}/>
        <Stack.Screen name="WorkerTab" component={WorkerTab}/>
        <Stack.Screen name="Categoria" component={Categoria}/>
        <Stack.Screen name="DetCategoria" component={DetCategoria}/>
      
    </Stack.Navigator>
  )
}

export default MainStack
