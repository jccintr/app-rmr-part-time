import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Preload from "../screens/Preload";
import Categoria from "../screens/Client/Categoria";
import DetCategoria from "../screens/Client/DetCategoria";
import Orcamento from "../screens/Client/Orcamento";

import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import VerifyEmail from "../screens/VerifyEmail";
import Sucesso from "../screens/Client/Sucesso";
import EmailVerified from "../screens/Client/EmailVerified";
import Erro from "../screens/Client/Erro";
import ForgetPassword from "../screens/ForgetPassword";
import ResetPassword from "../screens/ResetPassword";
import PasswordChanged from "../screens/PasswordChanged";
import ViewOrcamento from "../screens/Worker/ViewOrcamento";

import ClientTab from "./ClientTab";
import WorkerTab from "./WorkerTab";



const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Preload">
        <Stack.Screen  name="Preload" component={Preload}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="VerifyEmail" component={VerifyEmail}/>
        <Stack.Screen name="EmailVerified" component={EmailVerified}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword}/>
        <Stack.Screen name="PasswordChanged" component={PasswordChanged}/>
        <Stack.Screen name="ClientTab" component={ClientTab}/>
        <Stack.Screen name="WorkerTab" component={WorkerTab}/>
        <Stack.Screen name="Categoria" component={Categoria}/>
        <Stack.Screen name="DetCategoria" component={DetCategoria}/>
        <Stack.Screen name="Orcamento" component={Orcamento}/>
        <Stack.Screen name="ViewOrcamento" component={ViewOrcamento}/>
        <Stack.Screen name="Sucesso" component={Sucesso}/>
        <Stack.Screen name="Erro" component={Erro}/>
      
    </Stack.Navigator>
  )
}

export default MainStack
