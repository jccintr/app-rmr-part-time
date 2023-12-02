import React, { useState,useContext } from 'react'
import { StyleSheet, Text,Image,ActivityIndicator, View,TouchableOpacity, KeyboardAvoidingView,StatusBar} from 'react-native';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo-500.png';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputFields/InputField';
import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from './context/DataContext';
import ModalErro from '../components/Modals/ModalErro';




const Login = () => {
  const [errorMessage,setErrorMessage] = useState('');
  const [modalVisible,setModalVisible] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const navigation = useNavigation(); 
  const {setLoggedUser,setApiToken} = useContext(DataContext);


  const login = async () => {
    
    if(email.trim().length === 0 || password.trim().length === 0){
      setErrorMessage('Informe seu email e sua senha por favor.')
      setModalVisible(true);
      return;
    }

    setIsLoading(true);
    let response = await Api.login(email, password);
    if(response.status===404){
      setErrorMessage('Email e ou senha inválidos.')
      setModalVisible(true);
      setPassword('');
      setIsLoading(false);
      return;
    }
    
    if(response.status===200 || response.status===401){
      const jsonUser = await response.json();
      if (jsonUser.token) await AsyncStorage.setItem('token', jsonUser.token);
      setApiToken(jsonUser.token);
      setLoggedUser(jsonUser);
      
      if (response.status ===200){

        if (jsonUser.role === 1) {
           navigation.reset({routes:[{name:'ClientTab'}]}); 
        } else {
          navigation.reset({routes:[{name:'WorkerTab'}]});
        }
        
      } else {
          navigation.reset({routes:[{name:'VerifyEmail'}]}); 
      }
      
    }

    setIsLoading(false);
  
  }

  const onGuest  = () => {
    navigation.reset({routes:[{name:'ClientTab'}]});
  }


 
  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
     <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/> 
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
        <TouchableOpacity onPress={login} style={styles.button}>
         {!isLoading?<Text style={styles.buttonText}>ENTRAR</Text>:<ActivityIndicator style={styles.loading} size="large" color={cores.branco}/>}
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>navigation.navigate('ForgetPassword')} style={styles.signUpMessage}>
          <Text style={styles.signUpMessageTextBold}>Esqueceu a sua senha ?</Text>
        </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.signUpMessage}>
          <Text style={styles.signUpMessageText}>Não tem uma conta ?</Text>
          <Text style={styles.signUpMessageTextBold}> Cadastre-se !</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onGuest} style={styles.signUpMessage}>
          <Text style={styles.signUpMessageTextBold}>Entrar como visitante</Text>
        </TouchableOpacity>

     </View>
     <ModalErro visible={modalVisible} setVisible={setModalVisible} mensagem={errorMessage}/>
   </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: cores.azulClaro,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header:{
       flexGrow:1,
       alignItems: 'center',
       justifyContent: 'center',

    },

    logo: {
      width: 200,
      height: 200,
      marginBottom:20,
    },
    headerText:{
      color: cores.azulEscuro,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,

    },
    inputArea:{
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: cores.azulClaro,
      paddingBottom: 40,
    },
    button:{
      height: 50,
      backgroundColor: cores.azulEscuro,
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
      color: cores.azulEscuro,
      fontWeight: 'bold',
    },


  });
