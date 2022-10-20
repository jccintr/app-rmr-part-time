import React, { useState } from 'react'
import { StyleSheet, Text,Image,TextInput, SafeAreaView,View,TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo-rmr-transparente-1080.png';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SignIn = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigation = useNavigation();



 

 const onSignInTouch = async () => {

  if(email != '' && password != ''){

     let response = await Api.signIn(email, password);
     const json = await response.json(); 
     if(json.authToken){
      await AsyncStorage.setItem('token', json.authToken);
      let response = await Api.getUser(json.authToken);
      let jsonUser = await response.json(); 
      await AsyncStorage.setItem('userName', jsonUser.name);
      await AsyncStorage.setItem('userId', jsonUser.id.toString());
      await AsyncStorage.setItem('userRole', jsonUser.role);
      if (jsonUser.role === 'cliente')
         navigation.reset({routes:[{name:'ClientTab'}]});
      else
         navigation.reset({routes:[{name:'WorkerTab'}]});
      } else {
      alert("Email e ou senha inválidos.");
     }

  } else {
    alert("Por favor, informe o seu email e a sua senha.");
  }


 }

 const onGuest = () => {

  alert('tocou no entrar como convidado');

 }

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
     <View style={styles.header}>   
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.headerText}>Bem-vindo ao RMR Part-Time</Text>
     </View>
     <View style={styles.inputArea}>
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
            placeholder="Digite a sua senha"
            value={password}
            onChangeText={t=>setPassword(t)}
            password={true}
            keyboard="default"
        />
        <TouchableOpacity onPress={onSignInTouch} style={styles.button}>
         <Text style={styles.buttonText}>ENTRAR</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signUpMessage}>
          <Text style={styles.signUpMessageText}>Não tem uma conta?</Text>
          <Text style={styles.signUpMessageTextBold} > Cadastre-se!</Text>
        </TouchableOpacity>
        
        
     </View> 
   </KeyboardAvoidingView>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: cores.amarelo,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header:{
       flexGrow:1,
       alignItems: 'center',
       justifyContent: 'center',
        
    },
   
    logo: {
      width: 150,
      height: 150,
      marginBottom:20,
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
      backgroundColor: cores.amarelo,
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
      color: cores.amarelo,
      fontWeight: 'bold',
    },
    
   
  });

  