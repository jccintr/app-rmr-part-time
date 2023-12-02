import { StyleSheet, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import {CodeField,Cursor,useBlurOnFulfill,useClearByFocusCell} from 'react-native-confirmation-code-field';
import ModalErro from '../components/Modals/ModalErro';
import Botao from '../components/reusable/Botao';
import InputField from '../components/InputFields/InputField';
import HeightSpacer from '../components/reusable/HeightSpacer';
import AssetImage from '../components/reusable/AssetImage';
import Api from '../Api';




const CELL_COUNT = 6;


const ResetPassword = () => {
  const [errorMessage,setErrorMessage] = useState('');
  const [modalVisible,setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({value,setValue,});
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [passwordConfirm,setPasswordConfirm] = useState('');


const onAlterPassword = async () => {

  if(value.trim().length != 6 ){
    setErrorMessage('Insira o código de verificação por favor.');
    setModalVisible(true);
    return;
  }

  if(email.trim().length === 0 || password.trim().length === 0 || passwordConfirm.trim().length === 0){
    setErrorMessage('Preencha todos os campos por favor.');
    setModalVisible(true);
    return;
  }

  if(password!=passwordConfirm){
    setErrorMessage('As senhas informadas são diferentes.');
    setModalVisible(true);
    return;
  }
  
  setIsLoading(true);   
  let response = await Api.changePassword(email,password,value);
  
  if (response.status===200){
     navigation.reset({ routes: [{ name: 'PasswordChanged' }] });
  } else {
    const json = await response.json();
    setErrorMessage(json.mensagem);
    setModalVisible(true);
  }
  setIsLoading(false);

}

const getNewVerificationCode = () => {

  navigation.reset({ routes: [{ name: 'ForgetPassword' }] });

}

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content" />
       <AssetImage width={'100%'} height={150} radius={0} mode={'contain'} source={require('../assets/logo-500.png')} />
       <HeightSpacer h={40} />
       <Text style={{ color: cores.azulEscuro, fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Para ativar a sua conta informe o código que enviamos para o seu e-mail</Text>
       <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <InputField
            iconProvider="AntDesign"
            iconName="mail"
            placeholder="Digite o seu e-mail"
            value={email}
            onChangeText={t=>setEmail(t)}
            password={false}
            keyboard="email-address"
        />
       <InputField 
            iconProvider="AntDesign"
            iconName="lock1"
            placeholder="Digite a nova senha"
            value={password}
            onChangeText={t=>setPassword(t)}
            password={true}
            keyboard="default"
        />
        <InputField 
            iconProvider="AntDesign"
            iconName="lock1"
            placeholder="Confirme a senha"
            value={passwordConfirm}
            onChangeText={t=>setPasswordConfirm(t)}
            password={true}
            keyboard="default"
        />
        <HeightSpacer h={10} />
      <Botao
        onPress={() =>onAlterPassword()}
        text={'ALTERAR A SENHA'}
        textSize={16}
        textColor={'#fff'}
        width={'100%'}
        backgroundColor={cores.azulEscuro}
        borderWidth={0}
        borderColor={cores.azulEscuro}
        borderRadius={15}
        isLoading={isLoading}
      />
      <HeightSpacer h={20} />
      <TouchableOpacity onPress={() => getNewVerificationCode()}>
        <Text style={{ color: cores.azulEscuro, fontSize: 14, fontWeight:'bold' }}>Solicitar novo código de verificação</Text>
      </TouchableOpacity>
      <HeightSpacer h={20} />
      <TouchableOpacity onPress={() => navigation.reset({ routes: [{ name: 'Login' }] })}>
        <Text style={{ color: cores.azulEscuro, fontSize: 14, fontWeight:'bold' }}>Retornar ao Login</Text>
      </TouchableOpacity>
      <ModalErro visible={modalVisible} setVisible={setModalVisible} mensagem={errorMessage}/>
    </SafeAreaView>
  )
}

export default ResetPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.azulClaro,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  codeFieldRoot: {
    marginTop: 10,
    marginBottom: 10,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 10,
    color: cores.azulEscuro,
    borderColor: cores.azulEscuro,
    textAlign: 'center',
    margin: 5,
  },
  focusCell: {
    borderColor: cores.azulEscuro,
  },
})