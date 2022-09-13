import React, { useState } from 'react'
import { StyleSheet, Text,Image,TextInput, SafeAreaView,View,TouchableOpacity} from 'react-native';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo-rmr.png';



import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';

const SignUp = () => {
    const [nome,setNome] = useState('');
    const [telefone,setTelefone] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');
    const navigation = useNavigation();

  return (
    
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>   
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo}/>
        </View>
       <Text style={styles.headerText}>Cadastro</Text>
    </View>
    <View style={styles.inputArea}>
       <InputField 
           iconProvider="AntDesign"
           iconName="user"
           placeholder="Digite o seu nome"
           value={nome}
           onChangeText={t=>setNome(t)}
           password={false}
       />
       <InputField 
            iconProvider="FontAwesome"
            iconName="whatsapp"
           placeholder="Digite o seu telefone"
           value={telefone}
           onChangeText={t=>setTelefone(t)}
           password={false}
       />
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
       <InputField 
       iconProvider="AntDesign"
           iconName="lock1"
           placeholder="Confirme a senha"
           value={passwordConfirm}
           onChangeText={t=>setPasswordConfirm(t)}
           password={true}
       />
       <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.signUpMessage}>
         <Text style={styles.signUpMessageText}>Já tem uma conta?</Text>
         <Text style={styles.signUpMessageTextBold} > Entre!</Text>
       </TouchableOpacity>
       
        
    </View> 
  </SafeAreaView>

  )
}

export default SignUp

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
        width: 170,
        height: 170,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 110,
        backgroundColor:'#fff',
       
    },
    logo: {
      width: 120,
      height: 120,
     
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
    }
   
  });

  