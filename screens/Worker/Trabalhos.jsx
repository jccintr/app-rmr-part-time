import React, {useState,useEffect} from 'react'
import { SafeAreaView, StyleSheet,Text, TouchableOpacity} from 'react-native';
import { cores } from '../../style/globalStyle';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrabalhoCard from '../../components/TrabalhoCard';
import ModalTrabalho from '../../components/ModalTrabalho';



const Trabalhos = () => {
  //const [userId,setUserId] = useState(null);
  const [trabalhos,setTrabalhos] = useState([]);
  const [trabalhoSelecionado,setTrabalhoSelecionado] = useState(null);
  const [modalVisible,setModalVisible] = useState(false);

  useEffect(()=>{
    const getTrabalhos = async () => {
        const userId = await AsyncStorage.getItem('userId');
        //setUserId(userId);
        console.log('userid='+userId);
        let json = await Api.getContratosByProfissional(userId);
        setTrabalhoSelecionado(json[0]);
        console.log('trabalhos='+json.length);
        setTrabalhos(json);
    }
    getTrabalhos();
}, []);



const abreModalTrabalho = (trabalho) => {
 console.log('tocou no trabalho card');
  setTrabalhoSelecionado(trabalho);
  console.log(trabalhoSelecionado.cliente.name);
 setModalVisible(true);
}

  return (
    <SafeAreaView style={styles.container}>
       <Text style={styles.title}>Meus Trabalhos</Text>
       {trabalhos.map((trabalho) => (
           <TrabalhoCard  key={trabalho.id} trabalho={trabalho} onPress={()=>abreModalTrabalho(trabalho)}/>
        ))}
        {trabalhoSelecionado &&<ModalTrabalho trabalho={trabalhoSelecionado} modalVisible={modalVisible} setModalVisible={setModalVisible} /> }
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