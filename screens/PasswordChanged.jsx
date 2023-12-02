import { StyleSheet, Text, SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native'; 
import { FontAwesome } from '@expo/vector-icons';
import Botao from '../components/reusable/Botao';
import HeightSpacer from '../components/reusable/HeightSpacer';


const PasswordChanged = () => {
    const navigation = useNavigation();
    


  return (
    <SafeAreaView style={styles.container}>
    <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
    <FontAwesome name="check-circle" size={120} color={cores.azulEscuro} />
    <HeightSpacer h={30}/>
    <Text style={styles.title}>Sucesso !</Text>
    <HeightSpacer h={20}/>
    <Text style={styles.text}>A sua senha foi alterada.</Text>
    <HeightSpacer h={20}/>
    <Botao 
      onPress={()=>navigation.reset({routes:[{name:'Login'}]})}
      text={'SEGUIR PARA LOGIN'}
      textSize={16}
      textColor={'#fff'}
      width={'100%'}
      backgroundColor={cores.azulEscuro}
      borderWidth={0}
      borderColor={cores.azulEscuro}
      borderRadius={15}
      isLoading={false}
    />
  </SafeAreaView>
  )
}

export default PasswordChanged

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.azulClaro,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
       },
      
      title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: cores.azulEscuro,
      },
      text:{
         fontSize: 18,
         color: cores.azulEscuro,
         textAlign: 'center'
      },
})