import React, { useEffect,useState } from 'react';
import { StyleSheet,Image,Text, SafeAreaView,View,ScrollView, TouchableOpacity,ActivityIndicator,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cores } from '../../style/globalStyle';
import Api from '../../Api';
//import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome5 } from '@expo/vector-icons';


const ServicoWorker = ({route}) => {
    const [contratados,setContratados] = useState([]);
    const [idContrato,setIdContrato] = useState(0);
    const [inscrito,setInscrito] = useState(false);
    const [cadastrado,setCadastrado] = useState(false);
    const {servico} = route.params;
    const [userId,setUserId] = useState('');
    const [isLoading,setIsLoading] = useState(true);
   
    const navigation = useNavigation();


    useEffect(()=>{
      const getContratados = async (idServico) => {
      let json = await Api.getContratadosByService(idServico);
      let userId = await AsyncStorage.getItem('userId');
      setUserId(userId);
      for(let i=0;i<json.length;i++){
        
         if (json[i].user_id==userId){
             setCadastrado(true);
             setInscrito(json[i].ativo);
             setIdContrato(json[i].id);
         }

      }
      setIsLoading(false);
      setContratados(json);
      }
      getContratados(servico.id);
    }, []);

   

    const subscribeService = async (idServico) => {
      setIsLoading(true);
      if (!cadastrado) {
        let json = await Api.subscribeService(userId,idServico);
        setInscrito(true);
        setCadastrado(true);
        
      } else { // já cadastrado, apenas ativar o contrato
        let json = await Api.activeService(idContrato);
        setInscrito(true);
        setCadastrado(true);
      
      }
      let jsonContratados = await Api.getContratadosByService(idServico);
      setContratados(jsonContratados);
      setIsLoading(false);
    }

    const unSubscribeService = async (idServico) => {

     setIsLoading(true);
     if(cadastrado) { // já cadastrado, apenas desativar o contrato
      //console.log('idContratado='+idContrato);
      let json = await Api.deactiveService(idContrato);
      setInscrito(false);
      setCadastrado(true);
      let jsonContratados = await Api.getContratadosByService(idServico);
      setContratados(jsonContratados);
     }
     setIsLoading(false);
    }




   
    return (
   <SafeAreaView style={styles.container}>
    <StatusBar />
    <TouchableOpacity style={styles.botaoVoltar} onPress={()=>navigation.goBack()}>
       <Ionicons name="chevron-back" size={30} color="#fff" />
    </TouchableOpacity>
    <Image style={styles.serviceImage} source={{uri: `${Api.base_storage}/${servico.imagem}`,}}/>
    <View style={styles.body}>
         <Text style={styles.serviceName}>{servico.nome}</Text>
         <View style={styles.textArea}>
            <Text style={styles.serviceDescription}>{servico.descricao}</Text>
         </View>
         <View style={styles.horarioArea}>
            <FontAwesome5 name="clock" size={24} color={cores.amarelo} />
            <Text style={styles.horarioText}>{servico.horario}</Text>
         </View>
         <View style={styles.horarioArea}>
            <FontAwesome5 name="money-bill-alt" size={24} color={cores.amarelo} />
            <Text style={styles.horarioText}>{servico.valor_profissional} € por {servico.unidade==='H'? 'hora': 'diária'} {servico.periodo_minimo?'(Mínimo '+servico.periodo_minimo +' horas)':''}</Text>
         </View>

         {/*cadastrado && inscrito &&  <Text style={styles.warningText}>Você já está inscrito neste serviço.</Text>*/}
         {cadastrado & inscrito ? 
             <TouchableOpacity style={styles.button} onPress={()=>unSubscribeService(servico.id)}>
                  {!isLoading?<Text style={styles.buttonText}>CANCELAR INSCRIÇÃO</Text>:<ActivityIndicator style={styles.loading} size="large" color={cores.branco}/>}
             </TouchableOpacity> : 
             <TouchableOpacity style={styles.button} onPress={()=>subscribeService(servico.id)}>
                {!isLoading?<Text style={styles.buttonText}>INSCREVA-SE NESTE SERVIÇO</Text>:<ActivityIndicator style={styles.loading} size="large" color={cores.branco}/>} 
             </TouchableOpacity>
          }
         
        
    </View>
   </SafeAreaView>
  )

}

export default ServicoWorker


const styles = StyleSheet.create({
    container: {
        flex:1,
      
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#fff",
     
    },
    botaoVoltar:{
       position: 'absolute',
       ...Platform.select({
        android: {
          top: 10,
        },
        ios: {
          top:30,
        },
        
      }),
       
       left: 10,
       zIndex: 99,
    },
    serviceImage:{
      width: '100%',
      height: 200,
      
    },
    body:{
        flex:1,
     marginTop: 10,
     paddingHorizontal: 5,
     alignItems: 'center',
     width: '100%',
    },
    textArea:{
        backgroundColor: cores.cinzaClaro,
        width:'100%',
        borderRadius:15,
        padding:10,
        marginTop:10,

    },
    horarioArea:{
      paddingTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
     
       width:'100%',
     
    },
    horarioText: {
       fontSize: 16,
       marginLeft: 10,
    },
    serviceName:{
        fontWeight: 'bold',
        fontSize: 20,
        width: '100%',
        textAlign: 'left',
        minWidth: '100%',
        color: cores.amarelo,
        paddingLeft: 10,
      },
      serviceDescription:{
        fontSize: 16,
      },
      subTitle:{
        width: '100%',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 10,
      },
      button:{
        width: '90%',
        height: 50,
        backgroundColor: cores.amarelo,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        marginTop: 20,
      
      },
      buttonText:{
        color: '#fff',
        fontSize: 16,
     
        fontWeight: 'bold',
      },
      warningText:{
        color: '#f00',
        fontSize: 16,
        marginTop: 10,
      }
   
   
    
  });