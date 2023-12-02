import { StyleSheet, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { cores } from '../style/globalStyle';
import Botao from '../components/reusable/Botao';
import HeightSpacer from '../components/reusable/HeightSpacer';
import Api from '../Api';
import AssetImage from '../components/reusable/AssetImage';
import InputField from '../components/InputFields/InputField';

const ForgetPassword = () => {
  const navigation = useNavigation(); 
    const [email,setEmail] = useState('');
    const [isLoading,setIsLoading] = useState(false);

const onRecoveryPassword = async () => {
     setIsLoading(true);
     let response = await Api.requestPasswordEmail(email);
     navigation.navigate('ResetPassword');
}

  return (
    <SafeAreaView style={styles.container}>
         <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content" />
         <AssetImage width={'100%'} height={150} radius={0} mode={'contain'} source={require('../assets/logo-500.png')} />
         <HeightSpacer h={40} />
         <Text style={{ color: cores.azulEscuro, fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Para recuperar a sua senha, informe o e-mail que está associado a sua conta</Text>
         <HeightSpacer h={20} />
         <InputField
            iconProvider="AntDesign"
            iconName="mail"
            placeholder="Digite o e-mail"
            value={email}
            onChangeText={t=>setEmail(t)}
            password={false}
            keyboard="email-address"
          />
          <HeightSpacer h={20} />
          <Botao
            onPress={() =>onRecoveryPassword()}
            text={'RECUPERAR SENHA'}
            textSize={16}
            textColor={'#fff'}
            width={'100%'}
            backgroundColor={cores.azulEscuro}
            borderWidth={0}
            borderColor={cores.azulEscuro}
            borderRadius={15}
            isLoading={isLoading}
      />
    </SafeAreaView>
      
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.azulClaro,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      },
})