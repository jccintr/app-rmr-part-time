import React, { useState,useEffect,useContext } from 'react'
import { StyleSheet, Text, SafeAreaView, View,Image,TouchableOpacity,StatusBar,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MenuPerfil from '../../components/MenuPerfil';
import { cores } from '../../style/globalStyle';
import * as ImagePicker from 'expo-image-picker';
import Api from '../../Api';
import ModalCadastro from '../../components/Modals/ModalCadastro';
import ModalSenha from '../../components/Modals/ModalSenha';
import DataContext from '../context/DataContext';
import { FontAwesome } from '@expo/vector-icons'; 
import HeightSpacer from '../../components/reusable/HeightSpacer'


const Profile = () => {
    const navigation = useNavigation();
    const {loggedUser,setLoggedUser,apiToken,setApiToken} = useContext(DataContext)
    const [userData,setUserData] = useState([]);
    const [modalVisible,setModalVisible] = useState(false);
    const [modalSenhaVisible,setModalSenhaVisible] = useState(false);
    const [documento,setDocumento] = useState('');
    const [endereco,setEndereco] = useState('');
    const [bairro,setBairro] = useState('');
    const [cidade,setCidade] = useState('');
    const [avatar,setAvatar] = useState(loggedUser!==null?loggedUser.avatar:null);
    const [novaSenha,setNovaSenha] = useState('');
    const [confirmeNovaSenha,setConfirmeNovaSenha] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
       if(!loggedUser) {
        navigation.reset({routes:[{name:'Login'}]});
       }
    }, []);


    const selectAvatar = async () =>{
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 4],
          quality: 1,
        });
    
        if (!result.canceled) {
          setIsLoading(true);
          const fd = new FormData();
          fd.append('imagem',{uri: result.assets[0].uri,type: 'image/jpg',name: 'image.jpg',});
          let responseAvatar = await Api.updateAvatar(apiToken,fd);
        
          if (responseAvatar.status===200){
            
            let response = await Api.getUser(apiToken);
                if (response.status===200){
                    let jsonUser = await response.json(); 
                    setLoggedUser(jsonUser);
                    setAvatar(jsonUser.avatar);
                    setDocumento(jsonUser.documento);
                    setEndereco(jsonUser.endereco);
                    setBairro(jsonUser.bairro);
                    setCidade(jsonUser.cidade);
                    
                }
          }
          setIsLoading(false);
      }
      
    }



const onCadastroPress = () => {
    //setModalVisible(true);
    alert("Ainda não disponível.");
}


const onSenhaPress = () => {
    setModalSenhaVisible(true);
}
    
const updateCadastro = async () => {
    let json = Api.updateUser(userData.id,documento,endereco,bairro,cidade,token)
    setModalVisible(false);
}

const updateSenha = async () => {
  setModalSenhaVisible(false);
}
       
const onNada = () => {
    console.log(loggedUser);
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
            
           <MenuPerfil iconName="tools" iconProvider="Entypo" label="Meus Serviços" onPress={onNada}/>
           <MenuPerfil iconName="user-circle-o" iconProvider="FontAwesome" label="Meus Cadastro" onPress={onCadastroPress}/>
           <MenuPerfil iconName="lock1" iconProvider="AntDesign" label="Alterar minha senha" onPress={onSenhaPress}/>
           <MenuPerfil iconName="mail" iconProvider="AntDesign" label="Fale Conosco" onPress={onNada}/>
           <MenuPerfil iconName="checklist" iconProvider="Octicons" label="Termo de Uso" onPress={onNada}/>
           <MenuPerfil iconName="policy" iconProvider="MaterialIcons" label="Política de Privacidade" onPress={onNada}/>
           <MenuPerfil iconName="logout" iconProvider="MaterialIcons" label="Sair" onPress={onLogout}/>
             <ModalCadastro
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
               <ModalSenha
                    modalVisible={modalSenhaVisible} 
                    setModalVisible={setModalSenhaVisible} 
                    novaSenha={novaSenha}
                    setNovaSenha={setNovaSenha}
                    confirmeNovaSenha={confirmeNovaSenha}
                    setConfirmeNovaSenha={setConfirmeNovaSenha}
                    updateSenha={updateSenha}
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
        color: cores.iconeSearchField,
        fontWeight: 'bold',
        fontStyle: 'italic'
        },
   
    
  });