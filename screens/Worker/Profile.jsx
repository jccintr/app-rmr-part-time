import React, { useState,useContext } from 'react'
import { StyleSheet, Text, SafeAreaView, View,Image,TouchableOpacity,StatusBar,Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MenuPerfil from '../../components/MenuPerfil';
import { cores } from '../../style/globalStyle';
import * as ImagePicker from 'expo-image-picker';
import Api from '../../Api';
import { FontAwesome } from '@expo/vector-icons'; 
import DataContext from '../context/DataContext';
import HeightSpacer from '../../components/reusable/HeightSpacer';
import { useFocusEffect } from '@react-navigation/native';


const Profile = () => {
const {loggedUser,setLoggedUser,setApiToken,apiToken} = useContext(DataContext)
const navigation = useNavigation();
//const [userData,setUserData] = useState([]);
//const [userId,setUserId] = useState(null);
//const [documento,setDocumento] = useState('');
//const [endereco,setEndereco] = useState('');
//const [bairro,setBairro] = useState('');
//const [cidade,setCidade] = useState('');
const [avatar,setAvatar] = useState(null);
const [isLoading,setIsLoading] = useState(false);

useFocusEffect(
    React.useCallback(() => {
        
         StatusBar.setBackgroundColor(cores.azulEscuro); //add color code
        
    }, []),
  );

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


const onContatoPress = () => {
    const telefone = '35999122008';
    const mensagem = "dkdk dkdk dkdk dkdk dkdk dkdk";
    Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
    
  }

const onLogout = async () => {

    let response = await Api.logout(apiToken);
    if (response.status===200) {
        await AsyncStorage.removeItem('token');
        setApiToken('');
        setLoggedUser(null);
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
               {loggedUser&&<Text style={styles.userNameText}>{loggedUser.name}</Text>}
               
        </View>
        <HeightSpacer h={10}/>
       
        <MenuPerfil iconName="whatsapp" iconProvider="FontAwesome5" label="Fale Conosco" onPress={()=>onContatoPress()}/>
        <MenuPerfil iconName="checklist" iconProvider="Octicons" label="Termo de Uso" onPress={()=>navigation.navigate('Termos')}/>
        <MenuPerfil iconName="logout" iconProvider="MaterialIcons" label="Sair" onPress={onLogout}/>
        
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

  