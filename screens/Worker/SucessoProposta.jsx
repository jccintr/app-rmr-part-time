import { StyleSheet, Text, SafeAreaView,StatusBar } from 'react-native'
import React, {useContext} from 'react'
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native'; 
import { FontAwesome } from '@expo/vector-icons';
import Botao from '../../components/reusable/Botao';
import HeightSpacer from '../../components/reusable/HeightSpacer';


const SucessoProposta = () => {
    const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
      <FontAwesome name="check-circle" size={120} color={cores.azulEscuro} />
      <HeightSpacer h={30}/>
      <Text style={styles.title}>Parabéns !</Text>
      <HeightSpacer h={20}/>
      <Text style={styles.text}>A sua proposta foi enviada.</Text>
      <HeightSpacer h={20}/>
      <Text style={styles.text}>Boa sorte! Estamos torcendo por você.</Text>
      <HeightSpacer h={20}/>
      <Botao 
        onPress={()=>navigation.reset({routes:[{name:'WorkerTab'}]})}
        text={'RETORNAR A TELA INICIAL'}
        textSize={16}
        textColor={'#fff'}
        width={'100%'}
        backgroundColor={cores.azulEscuro}
        borderWidth={0}
        borderColor={cores.azulEscuro}
        borderRadius={15}
      />
    </SafeAreaView>
  )
}

export default SucessoProposta

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