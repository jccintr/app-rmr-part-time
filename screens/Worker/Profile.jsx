import React, { useState,useEffect,useContext } from 'react'
import { StyleSheet, Text, SafeAreaView, View,Image,TouchableOpacity,StatusBar,Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MenuPerfil from '../../components/MenuPerfil';
import { cores } from '../../style/globalStyle';
import * as ImagePicker from 'expo-image-picker';
import Api from '../../Api';

import { FontAwesome } from '@expo/vector-icons'; 
import ModalCadastro from '../../components/Modals/ModalCadastro';
import DataContext from '../context/DataContext';
import HeightSpacer from '../../components/reusable/HeightSpacer';


const Profile = () => {
const {loggedUser,setLoggedUser,setApiToken,apiToken} = useContext(DataContext)
const navigation = useNavigation();
const [userData,setUserData] = useState([]);
const [modalVisible,setModalVisible] = useState(false);
const [userId,setUserId] = useState(null);
const [documento,setDocumento] = useState('');
const [endereco,setEndereco] = useState('');
const [bairro,setBairro] = useState('');
const [cidade,setCidade] = useState('');
const [avatar,setAvatar] = useState(null);
const [isLoading,setIsLoading] = useState(false);


/*
useEffect(()=>{
    const getUser = async () => {
        const token = await AsyncStorage.getItem('token');
        
        if(token){
            setToken(token);
            let response = await Api.getUser(token);
            if (response.status===200){
                let jsonUser = await response.json(); 
                setUserData(jsonUser);
                setUserId(jsonUser.id);
                setDocumento(jsonUser.documento);
                setEndereco(jsonUser.endereco);
                setBairro(jsonUser.bairro);
                setCidade(jsonUser.cidade);
                setAvatar(jsonUser.imagem);
            }
        } 

    }
    getUser();
}, []);
*/

const selectAvatar = async () =>{
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
     
      const fd = new FormData();
      
      fd.append('userId',userId);
      fd.append('imagem',{uri: result.assets[0].uri,type: 'image/jpg',name: 'image.jpg',});
      
      let responseAvatar = await Api.updateAvatar(fd);
     
      let ret = await responseAvatar.json();
     
      if (responseAvatar.status===200){
        let response = await Api.getUser(token);
            if (response.status===200){
                let jsonUser = await response.json(); 
                setUserData(jsonUser);
                setDocumento(jsonUser.documento);
                setEndereco(jsonUser.endereco);
                setBairro(jsonUser.bairro);
                setCidade(jsonUser.cidade);
                setAvatar(jsonUser.imagem);
            }
      }
  }

}

const onCadastroPress = () => {

 // setModalVisible(true);
  alert("Ainda não disponível.");
}

const updateCadastro = async () => {
    setIsLoading(true);
    let json = await Api.updateUser(userData.id,documento,endereco,bairro,cidade,token);
    setIsLoading(false);
    setModalVisible(false);

}

         
const onNada = () => {

    alert("Ainda não disponível.");

}

const onLogout = async () => {

    let response = await Api.logout(apiToken);
    if (response.status===200) {
        await AsyncStorage.removeItem('token');
        setApiToken('');
        navigation.reset({routes:[{name:'Login'}]});
    }

}

  
return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={cores.azulEscuro} barStyle="dark-content" />
        <View style={styles.header}>
               {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.branco}/>}
               {loggedUser&&!isLoading&&<TouchableOpacity  onPress={selectAvatar}>
               {avatar?<Image style={styles.avatar} source={{uri:`${Api.base_storage}/${avatar}`,} }/>:<FontAwesome color={cores.azulClaro} name="user-circle-o" size={100}  />}
               </TouchableOpacity>}
               <HeightSpacer h={10}/>
               <Text style={styles.userNameText}>{loggedUser.name}</Text>
               
        </View>
        <HeightSpacer h={10}/>
       
        
        <MenuPerfil iconName="tools" iconProvider="Entypo" label="Minhas Propostas" onPress={onNada}/>
        <MenuPerfil iconName="user-circle-o" iconProvider="FontAwesome" label="Meus Cadastro" onPress={onCadastroPress}/>
        <MenuPerfil iconName="lock1" iconProvider="AntDesign" label="Alterar minha senha" onPress={onNada}/>
        <MenuPerfil iconName="mail" iconProvider="AntDesign" label="Fale Conosco" onPress={onNada}/>
        <MenuPerfil iconName="checklist" iconProvider="Octicons" label="Termo de Uso" onPress={onNada}/>
        <MenuPerfil iconName="policy" iconProvider="MaterialIcons" label="Política de Privacidade" onPress={onNada}/>
        <MenuPerfil iconName="logout" iconProvider="MaterialIcons" label="Sair" onPress={onLogout}/>
            <ModalCadastro
                isLoading={isLoading}
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                userData={userData} 
                token={apiToken} 
                documento={documento}
                setDocumento={setDocumento}
                endereco={endereco} 
                setEndereco={setEndereco}
                bairro={bairro}
                setBairro={setBairro}
                cidade={cidade}
                setCidade={setCidade}
                updateCadastro={updateCadastro}
            />   
    </SafeAreaView>
)

}





export default Profile


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
       
    },
    header:{
        backgroundColor: cores.azulEscuro,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height: 180,
       
    },
    avatar:{
        height: 100,
        width: 100,
        borderRadius:50,
        borderColor: '#fff',
        borderWidth: 2,
     },
    
    userNameText:{
      fontWeight: 'bold',
      fontSize: 18,
      color: cores.branco,
      },
    fraseHeader:{
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
   
    
  });

  