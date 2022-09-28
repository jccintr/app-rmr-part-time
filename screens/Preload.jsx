import React, { useEffect } from 'react';
import { StyleSheet, Image, SafeAreaView,ActivityIndicator,TouchableOpacity } from 'react-native';
import logo from '../assets/logo-rmr.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';


const Preload = () => {
    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');

            if(token){
                // pegar os dados do usuario
                let jsonUser = await Api.getUser(token);
                if (jsonUser.role === 'cliente')
                    navigation.reset({routes:[{name:'ClientTab'}]});
                else
                    navigation.reset({routes:[{name:'WorkerTab'}]});

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
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} >
                <Image source={logo} style={styles.imagelogo}/>
            </TouchableOpacity>
            <ActivityIndicator size="large" color="#000"/>
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