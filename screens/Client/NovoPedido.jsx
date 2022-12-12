import React, {useState,useEffect} from 'react'
import { SafeAreaView, StyleSheet,Text,View,TouchableOpacity,Image,ScrollView,Dimensions,ToastAndroid} from 'react-native';
import { cores } from '../../style/globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import InputArea from '../../components/InputArea';
import InputField2 from '../../components/InputField2';
import DateTimePicker from '@react-native-community/datetimepicker';
import Api from '../../Api';





const NovoPedido = ({route}) => {
     const screenWidth = Dimensions.get('window').width;
     const [idCliente,setIdCliente] = useState('');
     const {servico,contratado} = route.params;
     const navigation = useNavigation();
     const [data,setData] = useState(new Date());
     const [descricao,setDescricao] = useState('');
     const [local,setLocal] = useState('');
     const [quant,setQuant] = useState(1);
     const [unidade,setUnidade] = useState(servico.unidade);
     const [valorUnitario,setValorUnitario] = useState(servico.valor_cliente/100);
     const [total,setTotal] = useState(servico.valor_cliente/100);
     const [mensagem,setMensagem] = useState('Cuidado com o cachorro');
     const [showDatePicker, setShowDatePicker] = useState(false);
    


    useEffect(() => {
      CalculaTotal();
    }, [quant, valorUnitario]);

/*
    const LoadData = () => {

      setUnidade(servico.Unidade);
    }
*/

const onChange = (event, selectedDate) => {
  const currentDate = selectedDate;
  setShowDatePicker(false);
  setData(currentDate);
};

const showDatepicker = () => {
    setShowDatePicker(true);
};

const formataData = (data) => {
  
  let dia = data.getDate().toString();
  let mes = (data.getMonth()+1).toString();
  let ano = data.getFullYear();
  dia = (dia.length==1) ? "0"+dia : dia;
  mes = (mes.length==1) ? "0"+mes : mes;
  
  return dia + "/" + mes + "/" + ano;
}

const formataDataApi = (data) => {
  let dia = data.getDate().toString();
  let mes = (data.getMonth()+1).toString();
  let ano = data.getFullYear();
  dia = (dia.length==1) ? "0"+dia : dia;
  mes = (mes.length==1) ? "0"+mes : mes;
  
  return ano + "/"+ mes +"/"+ dia;
}
const buttonPlus = () => {

    setQuant(quant+1);
    
}

const buttonMinus = () => {

  if (quant>1){
      setQuant(quant-1);
      
  }
}

const CalculaTotal = () => {
  let tt = quant * valorUnitario;
  setTotal(tt);
};

const addContrato = async () => {
  let servico_id = servico.id;
  let cliente_id  = await AsyncStorage.getItem('userId');
  let profissional_id = contratado.user.id;
  let valor_unitario_cliente = valorUnitario;
  let valor_unitario_profissional  = servico.valor_profissional * 100;
  let total_cliente = total;
  let total_profissional = quant * servico.valor_profissional * 100;
  let data_servico = formataDataApi(data);
  let data_criacao = formataDataApi(new Date());
 
   let response = await Api.addContrato(servico_id,cliente_id,profissional_id, data_criacao,data_servico,local,descricao,quant,valor_unitario_cliente,valor_unitario_profissional,total_cliente,total_profissional);
  
   if (response.status===201) {
    ToastAndroid.show('Pedido enviado ao profissional.', ToastAndroid.SHORT);
    navigation.navigate('Pedidos')
  }
}


  return (
   <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView style={{width: screenWidth}} showsVerticalScrollIndicator={false}>
            <Image style={styles.serviceImage} source={{uri: `${Api.base_storage}/${servico.imagem}`,}}/>
            <TouchableOpacity style={styles.titleArea} onPress={()=>navigation.goBack()}>
              <Ionicons name="chevron-back" size={30} color={cores.amarelo} />
              <Text style={styles.titleText}>Novo Pedido</Text>
            </TouchableOpacity>
            
            <View style={styles.body}>
            
                  <View style={styles.contratadoArea}>
                      <Image style={styles.workerImage} source={{uri: `${Api.base_storage}/${contratado.user.imagem}`,}}/>
                      <View style={styles.contratadoAreaDetail}>
                          <Text style={styles.contratadoNameText}>{contratado.user.name}</Text>
                          <Text>{servico.nome}</Text>
                      </View>
                  </View>
                  <TouchableOpacity onPress={showDatepicker}>
                  <InputField2 
                  label="Data da Execução do Serviço:"
                  placeholder="Data da execução do serviço"
                  password={false}
                  keyboard="default"
                  value={formataData(data)}
                  onChangeText={t=>setData(t)}
                  editable={false}
                  />
                  </TouchableOpacity>
                  <InputArea 
                  label="Descreva o serviço:"
                  placeholder="Informe os detalhes do serviço"
                  password={false}
                  keyboard="default"
                  value={descricao}
                  onChangeText={t=>setDescricao(t)}
                  linhas={2}
                  
                />
                  <InputArea 
                  label="Local do Serviço:"
                  placeholder="Informe onde o serviço será efetuado"
                  password={false}
                  keyboard="default"
                  value={local}
                  onChangeText={t=>setLocal(t)}
                  linhas={2}
                  
                />
                
                <View style={styles.quantArea}>
                    <View style={styles.quantAreaLeft}>
                      <TouchableOpacity style={styles.quantButton} onPress={buttonMinus}>
                          <Text style={styles.quantButtonText}>-</Text>
                      </TouchableOpacity>
                      <View style={styles.labelQuantArea}>
                        <Text style={styles.labelQuant}>{quant} {unidade}{quant>1?'s':''} </Text>
                      </View>
                    
                      <TouchableOpacity style={styles.quantButton} onPress={buttonPlus}>
                          <Text style={styles.quantButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.quantAreaRight}>
                      <Text style={styles.totalText}>Total: {total} €</Text>
                    </View>
                </View>

                <InputArea 
                  label="Mensagem:"
                  placeholder="Informações adicionais ao contratado"
                  password={false}
                  keyboard="default"
                  value={mensagem}
                  onChangeText={t=>setMensagem(t)}
                  linhas={4}
                />
            
            </View>
            <TouchableOpacity style={styles.button} onPress={addContrato}>
                  <Text style={styles.buttonText}>CONTRATAR</Text>
            </TouchableOpacity> 
              {showDatePicker && (
                <DateTimePicker
                
                  value={data}
                  mode="date"
                  is24Hour={true}
                  onChange={onChange}
                  display="default"
                />
              )}
   </ScrollView>
   </SafeAreaView>
  
  )
}

export default NovoPedido


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        
    },
    serviceImage:{
      width: '100%',
      height: 200,
      marginBottom: 10,
    },
    titleArea:{
      position: 'absolute',
      top: 30,
      left: 10,
      zIndex: 99,
      width: '100%',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 10,
      
    },
    titleText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: cores.amarelo,
   },
    body:{
      flex:1,
      width:'100%',
      paddingHorizontal: 10,
      
    },
    contratadoArea: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height:70,
     marginBottom: 10,
  
    },
    contratadoAreaDetail:{
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      height:70,
      paddingLeft: 10,
    },
    
    workerImage: {
      width: 70,
      height: 70,
     borderRadius:10,
      
    },
    contratadoNameText:{
      fontWeight: 'bold',
      fontSize: 16,
     
    },
    serviceNameText:{
      fontSize: 16,
     
    },
    quantArea:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    quantAreaLeft:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    quantAreaRight:{
       backgroundColor: cores.vermelho,
       height: 40,
       width: 150,
       borderRadius: 10,
       backgroundColor: cores.amarelo,
       alignItems: 'center',
       justifyContent: 'center',
    },
    quantButton:{
      backgroundColor: cores.amarelo,
      width: 40,
      height: 40,
      justifyContent:'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    quantButtonText:{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 22,
    },
    labelQuantArea:{
      marginHorizontal: 3,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelQuant:{
      
       fontSize: 16,
    
    },
    totalText:{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 14,
    },
    button:{
     width:'90%',
      height: 50,
      backgroundColor: cores.amarelo,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:10,
      marginTop: 5,
      marginBottom: 20,
      alignSelf: 'center',
      
    
    },
    buttonText:{
      color: '#fff',
      fontSize: 16,
   
      fontWeight: 'bold',
    },

   
   
    
  });