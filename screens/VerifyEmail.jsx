import { StyleSheet, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { cores } from '../style/globalStyle';
import Botao from '../components/reusable/Botao';
import HeightSpacer from '../components/reusable/HeightSpacer';
import AssetImage from '../components/reusable/AssetImage';
import Api from '../Api';
import DataContext from './context/DataContext';
import { useNavigation } from '@react-navigation/native';
import ModalErro from '../components/Modals/ModalErro';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';



const CELL_COUNT = 6;

const VerifyEmail = () => {
  const [errorMessage,setErrorMessage] = useState('');
  const [modalVisible,setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { apiToken } = useContext(DataContext);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({value,setValue,});

  const onVerify = async () => {
    
    setIsLoading(true);
    let response = await Api.verifyEmail(apiToken, value);
    
    if (response.status === 200) {
      navigation.reset({ routes: [{ name: 'EmailVerified' }] });
    } else {
      const json = await response.json();
      setErrorMessage(json.mensagem);
      setModalVisible(true);
    }
    setIsLoading(false);
  }

  const getNewVerificationCode = async () => {
    setIsLoading(true);
    let response = await Api.getVerificationEmail(apiToken);
    setIsLoading(false);
    if (response.status === 200) {
      setErrorMessage('Novo código de verificação enviado.');
      setModalVisible(true);
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content" />
      <AssetImage width={'100%'} height={150} radius={0} mode={'contain'} source={require('../assets/logo-500.png')} />
      <HeightSpacer h={40} />
      <Text style={{ color: cores.azulEscuro, fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Para ativar a sua conta informe o código que enviamos para o seu e-mail</Text>
      <HeightSpacer h={10} />
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
      <HeightSpacer h={10} />
      <Botao
        onPress={() => onVerify()}
        text={'VERIFICAR EMAIL'}
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
        <Text style={{ color: cores.azulEscuro, fontSize: 14, fontWeight:'bold' }}>Entrar com outra conta</Text>
      </TouchableOpacity>

      <ModalErro visible={modalVisible} setVisible={setModalVisible} mensagem={errorMessage}/>
    </SafeAreaView>
  )
}

export default VerifyEmail

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