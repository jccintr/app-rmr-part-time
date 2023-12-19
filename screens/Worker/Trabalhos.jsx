import React, {useState,useEffect} from 'react'
import { SafeAreaView, StyleSheet,Text,ActivityIndicator,StatusBar,Dimensions} from 'react-native';
import { cores } from '../../style/globalStyle';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrabalhoCard from '../../components/TrabalhoCard';
import ModalTrabalho from '../../components/ModalTrabalho';
import { useFocusEffect } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Trabalhos = () => {
  //const [userId,setUserId] = useState(null);
 
  const [trabalhos,setTrabalhos] = useState([]);
  const [trabalhoSelecionado,setTrabalhoSelecionado] = useState(null);
  const [modalVisible,setModalVisible] = useState(false);
  const [isLoading,setIsLoading] = useState(false);


  useFocusEffect(
    React.useCallback(() => {
        
         StatusBar.setBackgroundColor(cores.azulClaro); //add color code
        
    }, []),
  );
  
  useEffect(()=>{
    const getTrabalhos = async () => {
        setIsLoading(true);
        const userId = await AsyncStorage.getItem('userId');
        console.log('userid='+userId);
        let json = await Api.getContratosByProfissional(userId);
        setTrabalhoSelecionado(json[0]);
        console.log('trabalhos='+json.length);
        setTrabalhos(json);
        setIsLoading(false);
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
      <StatusBar
                animated={true}
                backgroundColor={cores.branco}
                barStyle="dark-content"
            />
       <Text style={styles.title}>Meus Trabalhos</Text>
       {isLoading&&<ActivityIndicator  size="large" color={cores.amarelo}/>}
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