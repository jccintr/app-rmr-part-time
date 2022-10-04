import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const navigation = useNavigation();


    const onLogout = async () => {

        await AsyncStorage.setItem('token','');
        await AsyncStorage.setItem('userId', '');
        await AsyncStorage.setItem('userRole', '');
        navigation.reset({routes:[{name:'SignIn'}]});
    }
    



    return (
        <SafeAreaView style={styles.container}>
           <Text>Perfil do Cliente</Text>
           <TouchableOpacity onPress={onLogout}>
              <Text>Logout</Text>
           </TouchableOpacity>
        </SafeAreaView>
       )
}

export default Profile


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