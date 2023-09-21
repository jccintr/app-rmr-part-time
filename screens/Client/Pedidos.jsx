import React, {useState,useEffect,useContext} from 'react'
import { SafeAreaView, StyleSheet,Text,StatusBar,ActivityIndicator} from 'react-native';
import { cores } from '../../style/globalStyle';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PedidoCard from '../../components/PedidoCard';
import DataContext from '../context/DataContext';
import { useNavigation } from '@react-navigation/native';



const Pedidos = () => {
  const navigation = useNavigation();
  const [userId,setUserId] = useState(null);
  const {loggedUser} = useContext(DataContext)
  const [pedidos,setPedidos] = useState([]);
  const [isLoading,setIsLoading] = useState(false);


  /*
  useEffect(()=>{
    const getUser = async () => {
        setIsLoading(true);
        const userId = await AsyncStorage.getItem('userId');
        setUserId(userId);
        json = await Api.getContratosByCliente(userId);
        console.log('pedidos length= ' + json.length);
        setIsLoading(false);
        setPedidos(json);
    }
    getUser();
}, []);
*/

useEffect(()=>{
  if(!loggedUser) {
   navigation.navigate('Login');
  }
}, []);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
                animated={true}
                backgroundColor={cores.branco}
                barStyle="dark-content"
            />
       <Text style={styles.title}>Meus Pedidos</Text>
       {isLoading&&<ActivityIndicator  size="large" color={cores.amarelo}/>}
       {pedidos.map((pedido) => (
                       
                      <PedidoCard key={pedido.id} contrato={pedido}/>
                    
                    ))}
    </SafeAreaView>
  )
}

export default Pedidos


const styles = StyleSheet.create({
  container: {
    flex:1,
    
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