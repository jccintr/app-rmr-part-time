import React, {useState,useEffect} from 'react'
import { SafeAreaView, StyleSheet,Text, TouchableOpacity} from 'react-native';
import { cores } from '../../style/globalStyle';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrabalhoCard from '../../components/TrabalhoCard';
import ModalTrabalho from '../../components/ModalTrabalho';



const Trabalhos = () => {
  const [userId,setUserId] = useState(null);
  const [trabalhos,setTrabalhos] = useState([]);
  const [trabalhoSelecionado,setTrabalhoSelecionado] = useState(null);
  const [modalVisible,setModalVisible] = useState(false);

  useEffect(()=>{
    const getUser = async () => {
        const userId = await AsyncStorage.getItem('userId');
        setUserId(userId);
        json = await Api.getContratosByProfissional(userId);
        setTrabalhos(json);
    }
    getUser();
}, []);

const abreModalTrabalho = (trabalho) => {
 // console.log('cliente='+trabalho.cliente.name);
  setTrabalhoSelecionado(trabalho);
  setModalVisible(true);
}

  return (
    <SafeAreaView style={styles.container}>
       <Text style={styles.title}>Meus Trabalhos</Text>
       {trabalhos.map((trabalho) => (
                     
                          <TrabalhoCard  trabalho={trabalho} onPress={()=>abreModalTrabalho(trabalho)}/>
                     
                    ))}
           <ModalTrabalho trabalho={trabalhoSelecionado} modalVisible={modalVisible} setModalVisible={setModalVisible} />      
    </SafeAreaView>
  )
}

export default Trabalhos


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