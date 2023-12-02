import { StyleSheet, Text, SafeAreaView,StatusBar } from 'react-native'
import React, {useContext} from 'react'
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native'; 
import { FontAwesome } from '@expo/vector-icons';
import HeightSpacer from '../../components/reusable/HeightSpacer';
import Botao from '../../components/reusable/Botao';
import DataContext from '../context/DataContext';



const EmailVerified = () => {
    const navigation = useNavigation();
    const { loggedUser } = useContext(DataContext);
    
const onProsseguir = () =>{

  if (loggedUser.role === 1) {
    navigation.reset({routes:[{name:'ClientTab'}]}); 
 } else {
   navigation.reset({routes:[{name:'WorkerTab'}]});
 }

}

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
    <FontAwesome name="check-circle" size={120} color={cores.azulEscuro} />
    <HeightSpacer h={30}/>
    <Text style={styles.title}>Seja Bem-vindo !</Text>
    <HeightSpacer h={20}/>
    <Text style={styles.text}>A sua conta foi ativada.</Text>
    <HeightSpacer h={20}/>
    <Botao 
      onPress={()=>onProsseguir()}
      text={'PROSSEGUIR'}
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

export default EmailVerified

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