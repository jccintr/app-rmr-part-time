import React, { useEffect,useState,useContext } from 'react';
import { StyleSheet, Image, SafeAreaView,ActivityIndicator,StatusBar } from 'react-native';
import logo from '../assets/logo-500.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import { cores } from '../style/globalStyle';
import DataContext from './context/DataContext';
import ModalErro from '../components/Modals/ModalErro';

const Preload = () => {
  const [errorMessage,setErrorMessage] = useState('');
  const [modalVisible,setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false);
    const {setLoggedUser,setApiToken} = useContext(DataContext);

    useEffect(()=>{
        const checkToken = async () => {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            
            if(token){
                
               try {
                    let response = await Api.getUser(token);
                    setApiToken(token);
                    if (response.status===200){

                       let jsonUser = await response.json(); 
                       setLoggedUser(jsonUser);
                       if (jsonUser.role === 1) // 0-admin 1-cliente 2-profissional
                         navigation.reset({routes:[{name:'ClientTab'}]});
                       else
                         navigation.reset({routes:[{name:'WorkerTab'}]});
                        
                    } else {

                      if (response.status===403){
                        navigation.reset({routes:[{name:'VerifyEmail'}]});  
                      } else {
                        navigation.reset({routes:[{name:'Login'}]});
                      }  
                      
                    }


                }  catch (e){
                    setIsLoading(false);
                    console.log(e);
                    setErrorMessage('Falha ao obter dados. Tente novamente mais tarde.');
                    setModalVisible(true);
                  }
                
            }
            else {
                navigation.reset({
                    routes:[{name:'Login'}]
                });
            }


        }
        checkToken();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
            <Image source={logo} style={styles.imagelogo}/>
            {isLoading&&<ActivityIndicator size="large" color={cores.azulEscuro}/>}
            <ModalErro visible={modalVisible} setVisible={setModalVisible} mensagem={errorMessage}/>
        </SafeAreaView>
       )
}

export default Preload 

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: cores.azulClaro,
        
    },
    imagelogo:{
        height: 200,
        width: 200,
    },
    
  });