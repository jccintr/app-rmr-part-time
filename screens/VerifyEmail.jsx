import { StyleSheet, Text, SafeAreaView,StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import { cores } from '../style/globalStyle';
import Botao from '../components/reusable/Botao';
import HeightSpacer from '../components/reusable/HeightSpacer';
import AssetImage from '../components/reusable/AssetImage';

const VerifyEmail = () => {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
      <AssetImage width={'100%'} height={150} radius={0} mode={'contain'} source={require('../assets/logo-500.png')}/>
      <HeightSpacer h={40}/>      
      <Text style={{color:cores.azulEscuro, fontSize:16,textAlign:'center',fontWeight:'bold'}}>Para ativar a sua conta informe o código que enviamos para o seu e-mail</Text>
      <HeightSpacer h={10}/>      
      <Botao 
        onPress={()=>{}}
        text={'VERIFICAR EMAIL'}
        textSize={16}
        textColor={'#fff'}
        width={'100%'}
        backgroundColor={cores.azulEscuro}
        borderWidth={0}
        borderColor={cores.azulEscuro}
        borderRadius={15}
      />
      <HeightSpacer h={20}/>      
      <TouchableOpacity onPress={()=>{}}>
          <Text style={{color:cores.azulEscuro,fontSize:14}}>Solicitar novo código de verificação</Text>
      </TouchableOpacity>
      
      
    </SafeAreaView>
  )
}

export default VerifyEmail

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: cores.azulClaro,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      },
})