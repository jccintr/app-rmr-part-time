import React, { useState } from 'react'
import { StyleSheet, Text,Image,ScrollView, SafeAreaView,View,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo-rmr-transparente-1080.png';
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';






const SignUp = () => {
    const [nome,setNome] = useState('');
    const [telefone,setTelefone] = useState('');
    const [email,setEmail] = useState('');
    const [role,setRole] = useState(0);  // 0->cliente 1->profissional
    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');
    const navigation = useNavigation();


    const onSignUpTouch = async () => {

      if(nome != '' && telefone != '' && email != '' && password != '' && passwordConfirm != ''){
        if(password===passwordConfirm){
        
          if (role===0)
              roleString = 'cliente'
          else
             roleString = 'profissional'
          //console.log(email);
          let json = await Api.signUp(nome,email,telefone, password,roleString);
         
        
          
          if(json.token){
           
            await AsyncStorage.setItem('token', json.token);
            await AsyncStorage.setItem('userName', json.name);
            await AsyncStorage.setItem('userId', json.id.toString());
            await AsyncStorage.setItem('userRole', json.role);
            if (role===0)
               navigation.reset({routes:[{name:'ClientTab'}]});
            else
               navigation.reset({routes:[{name:'WorkerTab'}]});

          } else {
            alert("Email já utilizado.");
          }
        } else {

          alert("As senhas informadas são diferentes.");

        }
      } else {

        alert("Preencha todos os campos por favor.");

      }
    
    }





  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <KeyboardAvoidingView behavior='height' style={styles.container}>
  
    <View style={styles.header}>   
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.headerText}>Novo Cadastro</Text>
    </View>
   
    <View style={styles.inputArea}>
   
       <InputField 
           iconProvider="AntDesign"
           iconName="user"
           placeholder="Digite o seu nome"
           value={nome}
           onChangeText={t=>setNome(t)}
           password={false}
           keyboard="default"
       />
       <InputField 
            iconProvider="FontAwesome"
            iconName="whatsapp"
           placeholder="Digite o seu telefone"
           value={telefone}
           onChangeText={t=>setTelefone(t)}
           password={false}
           keyboard="number-pad"
       />
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
       <InputField 
       iconProvider="AntDesign"
           iconName="lock1"
           placeholder="Confirme a senha"
           value={passwordConfirm}
           onChangeText={t=>setPasswordConfirm(t)}
           password={true}
           keyboard="default"
       />
       <View style={styles.roleArea}>
         <TouchableOpacity onPress={()=>setRole(0)} style={role===0?styles.roleButtonSelected:styles.roleButton}>
           <Text style={role===0?styles.roleTextSelected:styles.roleText}>Sou Cliente</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>setRole(1)} style={role===1?styles.roleButtonSelected:styles.roleButton}>
           <Text style={role===1?styles.roleTextSelected:styles.roleText}>Sou Profissional</Text>
         </TouchableOpacity>
       </View>

       <TouchableOpacity onPress={onSignUpTouch} style={styles.button}>
        <Text  style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.signUpMessage}>
         <Text style={styles.signUpMessageText}>Já tem uma conta?</Text>
         <Text style={styles.signUpMessageTextBold} > Entre!</Text>
       </TouchableOpacity>
     
      
    </View> 
  
  </KeyboardAvoidingView>
  </ScrollView>
 
  )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
      paddingTop: 30,
      flex:1,
      backgroundColor: cores.amarelo,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    header:{
     
       alignItems: 'center',
       justifyContent: 'flex-end',
        
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
      flexGrow: 1,
     paddingTop: 40,
     paddingLeft: 20,
     paddingRight: 20,
     borderTopLeftRadius: 20,
     borderTopRightRadius: 20,
     backgroundColor: '#fff',
     paddingBottom: 40,
    },
    roleArea:{
       flexDirection:'row',
       justifyContent: 'space-around',
       alignItems:'center',
       marginBottom: 20,
    },
    roleButton:{
       height:40,
       width: 150,
       borderWidth: 1,
       borderColor: cores.amarelo,
       alignItems: 'center',
       justifyContent:'center',
      
    },
    roleButtonSelected:{
       height:40,
       width:150,
       backgroundColor: cores.amarelo,
       alignItems: 'center',
       justifyContent:'center',
    },
    roleText:{
      color: cores.amarelo,
    },
    roleTextSelected:{
       color: '#fff',
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
    }
   
  });

  