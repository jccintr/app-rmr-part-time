import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View,Image,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MenuPerfil from '../../components/MenuPerfil';
import { cores } from '../../style/globalStyle';

import * as ImagePicker from 'expo-image-picker';
import Api from '../../Api';
import ImgAvatar from '../../assets/avatar.jpg';
import ModalCadastro from '../../components/ModalCadastro';

const Profile = () => {

const navigation = useNavigation();
const [userData,setUserData] = useState([]);
const [modalVisible,setModalVisible] = useState(false);
const [token,setToken] = useState(null);
const [userId,setUserId] = useState(null);
const [documento,setDocumento] = useState('');
const [endereco,setEndereco] = useState('');
const [bairro,setBairro] = useState('');
const [cidade,setCidade] = useState('');
const [avatar,setAvatar] = useState(null);

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


const selectAvatar = async () =>{
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });


  

    if (!result.cancelled) {
     
      const fd = new FormData();
      
      fd.append('userId',userId);
      fd.append('imagem',{uri: result.uri,type: 'image/jpg',name: 'image.jpg',});
      
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
                setAvatar(jsonuser.imagem);
            }

      }

  }
}

const onCadastroPress = () => {

  setModalVisible(true);

}

const updateCadastro = async () => {

    let json = Api.updateUser(userData.id,documento,endereco,bairro,cidade,token);
    setModalVisible(false);

}

         
const onNada = () => {

    alert("Ainda não disponível.");

}

const onLogout = async () => {

    await AsyncStorage.setItem('token','');
    await AsyncStorage.setItem('userId', '');
    await AsyncStorage.setItem('userRole', '');
    navigation.reset({routes:[{name:'SignIn'}]});

}

  
return (
    <SafeAreaView style={styles.container}>
        <View style={styles.userNameArea}>
             <Text style={styles.userNameText}>{userData.name}</Text>
             <Text style={styles.fraseHeader}>{userData.role==='cliente'?'Cliente':'Profissional'}</Text>
        </View>
        
        <TouchableOpacity  onPress={selectAvatar}>
            <Image style={styles.avatar} source={avatar !== null ? {uri:`${Api.base_storage}/${avatar}`,} : ImgAvatar}/>
        </TouchableOpacity>
        
        <MenuPerfil iconName="tools" iconProvider="Entypo" label="Meus Serviços" onPress={onNada}/>
        <MenuPerfil iconName="user-circle-o" iconProvider="FontAwesome" label="Meus Cadastro" onPress={onCadastroPress}/>
        <MenuPerfil iconName="mail" iconProvider="AntDesign" label="Fale Conosco" onPress={onNada}/>
        <MenuPerfil iconName="checklist" iconProvider="Octicons" label="Termo de Uso" onPress={onNada}/>
        <MenuPerfil iconName="policy" iconProvider="MaterialIcons" label="Política de Privacidade" onPress={onNada}/>
        <MenuPerfil iconName="logout" iconProvider="MaterialIcons" label="Sair" onPress={onLogout}/>
            <ModalCadastro
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                userData={userData} 
                token={token} 
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
        paddingTop: 40,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal:5,
       
    },
    userNameArea:{
        width: '100%',
        height: 50,
       flexDirection: 'row',
       justifyContent: 'space-between',
       paddingHorizontal: 5,
       marginBottom: 10,
      

    },
    userNameText:{
      fontWeight: 'bold',
      fontSize: 18,
      color: cores.amarelo,

    },
    fraseHeader:{
        fontSize: 18,
        color: '#d1d1d1',
        fontStyle: 'italic',
    },
    avatar:{
        height: 100,
        width: 100,
        borderRadius:50,
        marginBottom: 10,
    }
    
  });

  