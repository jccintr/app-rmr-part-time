import React, { useEffect,useState } from 'react';
import { StyleSheet,Image,Text, SafeAreaView,View,ScrollView, TouchableOpacity,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cores } from '../style/globalStyle';
import Api from '../Api';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WorkerCard from '../components/WorkerCard';
import { FontAwesome5 } from '@expo/vector-icons';







const Servico = ({route}) => {
    const [contratados,setContratados] = useState([]);
    const {servico} = route.params;
    const [isLoading,setIsLoading] = useState(true);
    const navigation = useNavigation();


    useEffect(()=>{
      const getContratados = async (idServico) => {
      let json = await Api.getContratadosByService(idServico);
      setIsLoading(false);
      setContratados(json);
      }
      getContratados(servico.id);
    }, []);




   
    return (
   <SafeAreaView style={styles.container}>
    <StatusBar />
    <TouchableOpacity style={styles.botaoVoltar} onPress={()=>navigation.goBack()}>
       <Ionicons name="chevron-back" size={30} color="#fff" />
    </TouchableOpacity>
    <Image style={styles.serviceImage} source={{uri: servico.Imagem.url,}}/>
    <View style={styles.body}>
         <Text style={styles.serviceName}>{servico.Nome}</Text>
         <View style={styles.textArea}>
            <Text style={styles.serviceDescription}>{servico.Descricao}</Text>
         </View>
         <View style={styles.horarioArea}>
            <FontAwesome5 name="clock" size={24} color={cores.amarelo} />
            <Text style={styles.horarioText}>Das 8h a 17h</Text>
         </View>
         <View style={styles.horarioArea}>
            <FontAwesome5 name="money-bill-alt" size={24} color={cores.amarelo} />
            <Text style={styles.horarioText}>{servico.Valor_Cliente}€ por {servico.Unidade==='H'? 'hora': 'diária'} {servico.Periodo_Minimo?'(Mínimo '+servico.Periodo_Minimo +' horas)':''}</Text>
         </View>
         <Text style={styles.subTitle}>Profissionais disponíveis</Text>
         {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.amarelo}/>}
         {contratados.map((contratado) => (
                     
                       <WorkerCard key={contratado.id} contratado={contratado}/>
                    ))}
    </View>
   </SafeAreaView>
  )
}

export default Servico


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
       top: 30,
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
      }
   
   
    
  });