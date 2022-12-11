import React, {useState,useEffect} from 'react'
import { SafeAreaView, StyleSheet,Text} from 'react-native';
import { cores } from '../../style/globalStyle';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContratoCard from '../../components/ContratoCard';



const Pedidos = () => {
  const [userId,setUserId] = useState(null);
  const [pedidos,setPedidos] = useState([]);

  useEffect(()=>{
    const getUser = async () => {
        const userId = await AsyncStorage.getItem('userId');
        setUserId(userId);
        
        json = await Api.getContratosBycliente(userId);
        console.log('pedidos length= ' + json.length);
        setPedidos(json);
    }
    getUser();
}, []);


  return (
    <SafeAreaView style={styles.container}>
       <Text style={styles.title}>Meus Pedidos</Text>
       {pedidos.map((pedido) => (
                       
                      <ContratoCard key={pedido.id} contrato={pedido}/>
                    
                    ))}
    </SafeAreaView>
  )
}

export default Pedidos


const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 40,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
},
title:{
  fontWeight: 'bold',
  fontSize: 18,
  color: cores.amarelo,
  width: '100%',
  marginBottom: 10,
},

   
   
    
  });