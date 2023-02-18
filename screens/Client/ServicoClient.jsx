import React, { useEffect,useState } from 'react';
import { StyleSheet,Image,Text, SafeAreaView,View,ScrollView, TouchableOpacity,ActivityIndicator,StatusBar} from 'react-native';
import { cores } from '../../style/globalStyle';
import Api from '../../Api';
//import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WorkerCard from '../../components/WorkerCard';
import { FontAwesome5 } from '@expo/vector-icons';







const ServicoClient = ({route}) => {
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

    const onWorkerPress  = (contratado) =>{
    //  console.log(contratado.id);
      navigation.navigate('NovoPedido',{servico: servico,contratado: contratado})
   }



    return (
   <SafeAreaView style={styles.container}>
    <StatusBar
                animated={true}
                backgroundColor={cores.branco}
                barStyle="dark-content"
            />
    <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={styles.horarioText}>{servico.valor_cliente}€ por {servico.unidade==='hora'? 'hora': 'diária'} {servico.periodo_minimo!=='0'?'(Mínimo '+servico.periodo_minimo +' horas)':''}</Text>
         </View>

        
         {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.amarelo}/>}

         {(contratados.length > 0 && !isLoading)? <Text style={styles.subTitle}>Profissionais encontrados</Text>: <Text style={{color:'red',marginTop:100}}>Nenhum profissional encontrado.</Text>}
        
         {contratados.filter(contratado=>contratado.ativo==true).map((contratado) => (
             <WorkerCard key={contratado.id} contratado={contratado} onPress={()=>onWorkerPress(contratado)}/>
             ))}
    </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default ServicoClient


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
       top: 10,
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
