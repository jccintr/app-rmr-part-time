import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View,Image,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MenuPerfil from '../../components/MenuPerfil';
import { cores } from '../../style/globalStyle';
import { StatusBar } from 'expo-status-bar';
import Api from '../../Api';
import avatar from '../../assets/avatar.jpg';
import ModalCadastro from '../../components/ModalCadastro';



const Profile = () => {
    const navigation = useNavigation();
    const [userData,setUserData] = useState([]);
    const [modalVisible,setModalVisible] = useState(false);
    const [token,setToken] = useState(null);

    


    useEffect(()=>{
        const getUser = async () => {
            const token = await AsyncStorage.getItem('token');
           
            if(token){
                setToken(token);
                let response = await Api.getUser(token);

                if (response.status===200){
                    let jsonUser = await response.json(); 
                    
                    setUserData(jsonUser);
                }
            }

        }
        getUser();
    }, []);



    
            
    



    const onLogout = async () => {

        await AsyncStorage.setItem('token','');
        await AsyncStorage.setItem('userId', '');
        await AsyncStorage.setItem('userRole', '');
        navigation.reset({routes:[{name:'SignIn'}]});
    }

    const onNada = () =>{

    }
    


    return (
        <SafeAreaView style={styles.container}>
        
             <View style={styles.userNameArea}>
                    <Text style={styles.userNameText}>{userData.name}</Text>
                    <Text style={styles.fraseHeader}>{userData==='cliente'?'Cliente':'Profissional'}</Text>
            </View>
            <Image style={styles.avatar} source={userData.foto != null ? {uri: userData.foto.url,} : avatar}/>
           <MenuPerfil iconName="tools" iconProvider="Entypo" label="Meus Serviços" onPress={onNada}/>
           <MenuPerfil iconName="user-circle-o" iconProvider="FontAwesome" label="Meus Cadastro" onPress={()=>setModalVisible(true)}/>
           <MenuPerfil iconName="mail" iconProvider="AntDesign" label="Fale Conosco" onPress={onNada}/>
           <MenuPerfil iconName="checklist" iconProvider="Octicons" label="Termo de Uso" onPress={onNada}/>
           <MenuPerfil iconName="policy" iconProvider="MaterialIcons" label="Política de Privacidade" onPress={onNada}/>
           <MenuPerfil iconName="logout" iconProvider="MaterialIcons" label="Sair" onPress={onLogout}/>
             <ModalCadastro modalVisible={modalVisible} setModalVisible={setModalVisible} user={userData} token={token}/>   
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