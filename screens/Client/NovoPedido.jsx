import React, {useState,useEffect} from 'react'
import { SafeAreaView, StyleSheet,Text,View} from 'react-native';
import { cores } from '../../style/globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';


/*
id cliente => pegar no storage
id profissional => receber na rota
id servico => receber na rota

*/


const NovoPedido = ({route}) => {
     const [idCliente,setIdCliente] = useState('');
   

    useEffect(()=>{
        
      }, []);




  return (
   <SafeAreaView style={styles.container}>
    <View style={styles.titleArea}>
            <Text style={styles.titleText}>Novo Pedido</Text>
    </View>
   </SafeAreaView>
  
  )
}

export default NovoPedido


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
    titleArea:{
        width: '100%',
        height: 50,
       flexDirection: 'row',
       justifyContent: 'space-between',
       paddingHorizontal: 5,
       marginBottom: 10,
      

    },
    titleText:{
      fontWeight: 'bold',
      fontSize: 18,
      color: cores.amarelo,

    },
   
   
    
  });