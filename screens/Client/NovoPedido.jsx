import React, {useState,useEffect} from 'react'
import { SafeAreaView, StyleSheet,Text,View,TouchableOpacity,Image} from 'react-native';
import { cores } from '../../style/globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import InputArea from '../../components/InputArea';
import InputField2 from '../../components/InputField2';
import DateTimePicker from '@react-native-community/datetimepicker';




const NovoPedido = ({route}) => {
     const [idCliente,setIdCliente] = useState('');
     const {servico,contratado} = route.params;
     const navigation = useNavigation();
     const [data,setData] = useState(new Date());
     const [local,setLocal] = useState('Avenida dos Autonomistas, 345 - Centro - Osasco - SP');
     const [quant,setQuant] = useState(1);
     const [unidade,setUnidade] = useState(servico.Unidade);
     const [valorUnitario,setValorUnitario] = useState(servico.Valor_Cliente);
     const [total,setTotal] = useState(servico.Valor_Cliente);
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
       
        return dia +"/"+mes+"/"+ano;
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


  return (
   <SafeAreaView style={styles.container}>
      <StatusBar />
     <Image style={styles.serviceImage} source={{uri: servico.Imagem.url,}}/>
     <TouchableOpacity style={styles.titleArea} onPress={()=>navigation.goBack()}>
       <Ionicons name="chevron-back" size={30} color={cores.amarelo} />
       <Text style={styles.titleText}>Novo Pedido</Text>
     </TouchableOpacity>
     <View style={styles.body}>
     <View style={styles.contratadoArea}>
        <Image style={styles.workerImage} source={{uri: contratado._user.foto.url,}}/>
        <View style={styles.contratadoAreaDetail}>
             <Text style={styles.contratadoNameText}>{contratado._user.name}</Text>
             <Text>{servico.Nome}</Text>
        </View>
       
     </View>
          <TouchableOpacity onPress={showDatepicker}>
          <InputField2 
           label="Data:"
           placeholder="Data da execução do serviço"
           password={false}
           keyboard="default"
           value={formataData(data)}
           onChangeText={t=>setData(t)}
           editable={false}
          />
          </TouchableOpacity>
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
                 <Text style={styles.labelQuant}>{quant} {unidade}</Text>
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
     <TouchableOpacity style={styles.button} >
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
      paddingHorizontal: 5,
      marginBottom: 10,

    },
    titleText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: cores.amarelo,
   },
    body:{
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
      marginTop: 20,
      
    
    },
    buttonText:{
      color: '#fff',
      fontSize: 16,
   
      fontWeight: 'bold',
    },

   
   
    
  });