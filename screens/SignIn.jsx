import React, { useState } from 'react'
import { StyleSheet, Text,Image,TextInput, SafeAreaView,View,TouchableOpacity} from 'react-native';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo-rmr.png';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';



const SignIn = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigation = useNavigation();

 const onSingUp = () => {


alert('tocou no tenho cadastro');


 }

 const onGuest = () => {

  alert('tocou no entrar como convidado');

 }

  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.header}>   
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo}/>
        </View>
        <Text style={styles.headerText}>Bem-vindo ao RmrPart-Time</Text>
     </View>
     <View style={styles.inputArea}>
        <InputField 
            iconProvider="AntDesign"
            iconName="mail"
            placeholder="Digite o seu e-mail"
            value={email}
            onChangeText={t=>setEmail(t)}
            password={false}
        />
        <InputField 
            iconProvider="AntDesign"
            iconName="lock1"
            placeholder="Digite a sua senha"
            value={password}
            onChangeText={t=>setPassword(t)}
            password={true}
        />
        <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>ENTRAR</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signUpMessage}>
          <Text style={styles.signUpMessageText}>Não tem uma conta?</Text>
          <Text style={styles.signUpMessageTextBold} > Cadastre-se!</Text>
        </TouchableOpacity>
        
        
     </View> 
   </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: cores.azul,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header:{
       flexGrow:1,
       alignItems: 'center',
       justifyContent: 'flex-end',
        
    },
    logoContainer:{
        width: 220,
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 110,
        backgroundColor:'#fff',
        marginBottom: 20,
    },
   
    logo: {
      width: 150,
      height: 150,
    },
    headerText:{
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,

    },
    inputArea:{
      
     paddingTop: 40,
     paddingLeft: 20,
     paddingRight: 20,
     borderTopLeftRadius: 20,
     borderTopRightRadius: 20,
      backgroundColor: '#fff',
      paddingBottom: 40,
    },
    button:{
     
      height: 50,
      backgroundColor: cores.azul,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:15,
    
    },
    buttonText:{
      color: '#fff',
      fontSize: 16,
   
      fontWeight: 'bold',
    },
    signUpMessage:{
      flexDirection:'row',
      justifyContent: 'center',
      marginTop: 20,


    },
    signUpMessageText:{

    },
    signUpMessageTextBold:{
      color: cores.azul,
      fontWeight: 'bold',
    },
    
   
  });

  