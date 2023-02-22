import React, { useEffect,useState } from 'react';
import { StyleSheet, Image, SafeAreaView,ActivityIndicator,TouchableOpacity,StatusBar } from 'react-native';
import logo from '../assets/logo-rmr.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import { cores } from '../style/globalStyle';

const Preload = () => {
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        const checkToken = async () => {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
          
            if(token){
               try {
                    let response = await Api.getUser(token);
                    if (response.status===200){
                       let jsonUser = await response.json(); 
                       await AsyncStorage.setItem('userId', jsonUser.id.toString());
                       await AsyncStorage.setItem('userRole', jsonUser.role);
                       if (jsonUser.role === 'cliente')
                         navigation.reset({routes:[{name:'ClientTab'}]});
                       else
                         navigation.reset({routes:[{name:'WorkerTab'}]});
                    } else
                    {
                      navigation.reset({
                        routes:[{name:'SignIn'}] 
                      });
                    }


                }  catch (e){
                    setIsLoading(false);
                    alert("Falha ao obter dados.");
                  }
                
            }
            else {
                navigation.reset({
                    routes:[{name:'SignIn'}]
                });
            }


        }
        checkToken();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={cores.branco}
                barStyle="dark-content"
            />
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} >
                <Image source={logo} style={styles.imagelogo}/>
            </TouchableOpacity>
            {isLoading&&<ActivityIndicator size="large" color={cores.amarelo}/>}
        </SafeAreaView>
       )
}

export default Preload 

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        
    },
    imagelogo:{
        height: 200,
        width: 200,
    },
    
  });