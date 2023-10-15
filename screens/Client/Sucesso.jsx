import { StyleSheet, Text, SafeAreaView,TouchableOpacity } from 'react-native'
import React from 'react'
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native'; 
import { FontAwesome } from '@expo/vector-icons';


const Sucesso = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome name="check-circle" size={60} color={cores.azulEscuro} />
      <Text style={styles.title}>Parabéns !</Text>
      <Text style={styles.text}>O seu orçamento foi enviado.</Text>
      <Text style={styles.text}>Agora é só aguardar o contato de um profissional.</Text>
      <TouchableOpacity onPress={()=>navigation.reset({routes:[{name:'ClientTab'}]})} style={styles.button}>
                   <Text style={styles.buttonText} >RETORNAR A TELA INICIAL</Text>
            </TouchableOpacity> 
    </SafeAreaView>
  )
}

export default Sucesso

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: cores.azulClaro,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
       },
       button:{
        height: 50,
        marginBottom: 10,
        width: '90%',
        backgroundColor: cores.azulEscuro,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
      },
      title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: cores.azulEscuro,
        marginBottom: 20,
      },
      text:{
         fontSize: 18,
         color: cores.azulEscuro,
         marginBottom: 20,
         textAlign: 'center'
      },
      buttonText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
})