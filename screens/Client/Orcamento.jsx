import { StyleSheet, Image, SafeAreaView,StatusBar,View,TouchableOpacity,Text,Dimensions,ScrollView,ActivityIndicator } from 'react-native'
import React, {useContext,useState,useEffect} from 'react'
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native'; 
import DataContext from '../context/DataContext';
import Header from '../../components/Headers/Header';
import InputField3 from '../../components/InputFields/InputField3';
import SelectInput2 from '../../components/InputFields/SelectInput2';
import Api from '../../Api';
import InputArea from '../../components/InputFields/InputArea';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ModalErro from '../../components/Modals/ModalErro';
import  DateTimePicker  from '@react-native-community/datetimepicker';


const Orcamento = ({route}) => {
  const [errorMessage,setErrorMessage] = useState('');
  const [modalVisible,setModalVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const {loggedUser,apiToken} = useContext(DataContext);
  const navigation = useNavigation();
  const {categoria} = route.params;  
  const [logradouro,setLogradouro] = useState('');
  const [numero,setNumero] = useState('');
  const [titulo,setTitulo] = useState('');
  const [descricao,setDescricao] = useState('');
  const [imagem,setImagem] = useState(null);
  const [distrito,setDistrito] = useState(null);
  const [concelho,setConcelho] = useState(null);
  const [concelhos,setConcelhos] = useState([]);
  const [distritos,setDistritos] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [data,setData] = useState(new Date());
  const [dataDisplay,setDataDisplay] = useState('');
  const [hora,setHora] = useState(new Date()); 
  const [horaDisplay,setHoraDisplay] = useState('');
  const [minimumDate, setMinimumDate] = useState(new Date);

    
  const onChangeDatePicker = (event, selectedDate) => {
    
    // if (event.type === 'dismissed') {
    //    return
    // }

    const currentDate = selectedDate;
    setDatePickerVisible(false);
    setData(currentDate);
    setDataDisplay(formataData(currentDate));
    
  };

  const onChangeTimePicker = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTimePickerVisible(false);
    let min = currentDate.getMinutes() < 10 ? '0'+currentDate.getMinutes().toString() : currentDate.getMinutes().toString()
    setHoraDisplay(currentDate.getHours()+':'+ min);
    setHora(currentDate);
  };
  

    useEffect(()=>{
      const getDistritos = async () => {
          let jsonDistritos = await Api.getDistritos();
          setDistritos(jsonDistritos);
      }
      getDistritos();
   },[]);
   
   useEffect(()=>{
     const getConcelhos = async (distrito) => {
         let jsonConcelhos = await Api.getConcelhos(distrito.id);
         setConcelhos(jsonConcelhos);
     }
     if (distrito) {
       getConcelhos(distrito);
     }
     
   },[distrito]);

   const onChangeSelectDistrito = (distrito) => {
    setDistrito(distrito);
 }

 const onChangeSelectConcelho = (concelho) => {
   setConcelho(concelho);
}

const selectImage = async () =>{
    
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [4, 4],
    quality: 1,
  });

  if (!result.canceled) {
    setImagem(result.assets[0].uri);
  }

}

const formataData = (data) => {
  
  let dia = data.getDate().toString();
  let mes = (data.getMonth()+1).toString();
  let ano = data.getFullYear();
  dia = (dia.length==1) ? "0"+dia : dia;
  mes = (mes.length==1) ? "0"+mes : mes;
  
  return dia + "/" + mes + "/" + ano;
}

const formataDataApi = () => {
  let dia = data.getDate().toString();
  let mes = (data.getMonth()+1).toString();
  let ano = data.getFullYear();
  dia = (dia.length==1) ? "0"+dia : dia;
  mes = (mes.length==1) ? "0"+mes : mes;
  
  return ano + "-"+ mes +"-"+ dia + ' ' + horaDisplay;
}


const onAddOrcamento = async () => {



//alert(formataDataApi());
//return;

if (titulo.trim().length===0 || descricao.trim().length===0 || logradouro.trim().length===0 || numero.trim().length===0 || distrito === null || concelho === null || dataDisplay.trim().length===0 || horaDisplay.trim().length===0 ) {
    setErrorMessage('Preencha todos os campos por favor.');
    setModalVisible(true);
    return;
}
    setIsLoading(true);
    const fd = new FormData();
    fd.append('titulo',titulo);
    fd.append('descricao',descricao);
    fd.append('categoria_id',categoria.id);
    fd.append('logradouro',logradouro);
    fd.append('numero',numero);
    fd.append('distrito_id',distrito.id);
    fd.append('concelho_id',concelho.id);
    fd.append('data_execucao',formataDataApi());
    
    if (imagem!=null){
       fd.append('imagem',{uri: imagem,type: 'image/jpg',name: 'image.jpg',});
    }
    let response = await Api.addOrcamento(apiToken,fd);
    if (response.status===201){
         navigation.navigate('Sucesso');
    } else {
        navigation.navigate('Erro');
    }
    setIsLoading(false);
}


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
          <Header title="Novo Orçamento" onPress={()=>navigation.goBack()}/>
          <ScrollView style={{width: screenWidth}} contentContainerStyle={{alignItems:'center',padding:5,}} showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
              <View style={styles.cabecalho}>
                    <Text style={{fontWeight:'bold',fontSize:14,color:cores.azulEscuro}}>Categoria: </Text>
                    <Text style={{color:cores.azulEscuro}}>{categoria.nome}</Text>
              </View>
              <View style={styles.itensArea}>
                    <Text style={styles.title}>Título do Orçamento</Text>
                    <InputField3 
                      label="Titulo:"
                      placeholder=""
                      password={false}
                      editable={true}
                      value={titulo}
                      onChangeText={t=>setTitulo(t)}
                      keyboard="default"
                    />
              </View>      
              <View style={styles.itensArea}>
                    <Text style={styles.title}>Onde será executado o serviço</Text>
                    <InputField3 
                      label="Logradouro:"
                      placeholder=""
                      password={false}
                      editable={true}
                      value={logradouro}
                      onChangeText={t=>setLogradouro(t)}
                      keyboard="default"
                    />
                    <InputField3 
                      label="Numero:"
                      placeholder=""
                      password={false}
                      editable={true}
                      value={numero}
                      onChangeText={t=>setNumero(t)}
                      keyboard="number-pad"
                    />
                    <SelectInput2 label="Distrito:" placeholder="Selecione o Distrito" options={distritos} onChangeSelect={onChangeSelectDistrito}/>
                    {distrito&&<SelectInput2 label="Concelho:" placeholder="Selecione o Concelho" options={concelhos} onChangeSelect={onChangeSelectConcelho}/>}
              </View>
              <View style={styles.itensArea}>
                   <Text style={styles.title}>Melhor data e horário para executar o serviço</Text>
                   <View style={{flexDirection:'row',width:'95%'}}>
                      <TouchableOpacity style={{flex:1,marginRight:10}} onPress={()=>setDatePickerVisible(true)}>
                          <InputField3 
                              label="Data:"
                              placeholder=""
                              password={false}
                              editable={false}
                              value={dataDisplay}
                              onChangeText={t=>setData(t)}
                              keyboard="default"
                            />
                      </TouchableOpacity>
                      <TouchableOpacity style={{flex:1}} onPress={()=>setTimePickerVisible(true)}>
                          <InputField3 
                              label="Hora:"
                              placeholder=""
                              password={false}
                              editable={false}
                              value={horaDisplay}
                              onChangeText={t=>setHoraDisplay(t)}
                              keyboard="default"
                            />
                      </TouchableOpacity>
                   </View>
              </View>
              <View style={styles.itensArea}>
                    <Text style={styles.title}>Descreva o serviço</Text>
                    <InputArea 
                       label="Descrição do serviço:"
                       placeholder=""
                       value={descricao}
                       onChangeText={t=>setDescricao(t)}
                       linha={8}
                    />
              </View>
              <View style={styles.itensArea}>
                    <Text style={styles.title}>Anexe uma imagem</Text>
                    <TouchableOpacity onPress={selectImage} style={styles.imgButton}>
                    {imagem===null&&<>
                      <FontAwesome name="photo" size={50} color={cores.azulEscuro} />
                      <Text style={{color:cores.azulEscuro,fontSize:14,fontWeight:'bold'}}>Adicionar Imagem</Text>
                    </>}
                    {imagem&&<Image style={styles.imagem} source={{uri:`${imagem}`,}}/>}
                 </TouchableOpacity>
              </View>
              {loggedUser&&<TouchableOpacity onPress={()=>onAddOrcamento()} style={styles.button}>
                 {!isLoading?<Text style={styles.buttonText} >ENVIAR ORÇAMENTO</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
               </TouchableOpacity>} 
               
          </View>
          </ScrollView>
          <ModalErro visible={modalVisible} setVisible={setModalVisible} mensagem={errorMessage}/>
          {datePickerVisible && (<DateTimePicker
                  value={data}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeDatePicker}
                  display="default"
                  minimumDate={minimumDate}
                />
              )}
          {timePickerVisible && (<DateTimePicker
                  value={hora}
                  mode="time"
                  is24Hour={true}
                  onChange={onChangeTimePicker}
                  display="default"
                  minimumDate={minimumDate}
                />
              )}
    </SafeAreaView>
  )
}

export default Orcamento

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: cores.whiteSmoke,
        alignItems: 'center',
        justifyContent: 'flex-start',
       },
    body:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
      },
    cabecalho:{
        marginTop: 10,
        width: '95%',
        padding: 15,
        borderRadius:12,
        backgroundColor: '#fff',
        marginBottom: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    itensArea: {
      marginTop: 10,
      width: '95%',
      padding: 15,
      borderRadius:12,
      backgroundColor: cores.branco,
      marginBottom: '2%',
      overflow: 'hidden',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',

},
title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: cores.azulEscuro,
    marginBottom:10,

},
imgButton: {
  alignItems:'center',
  justifyContent:'center',
  marginTop:10,
  marginBottom:10,
  borderWidth:2,
  borderRadius: 5,
  borderColor: cores.azulEscuro,
  width: '100%',
  height: 150,
  borderStyle: 'dashed',
  padding: 10,
},
imagem:{
width: '100%',
height: 140,
borderRadius: 5,
},
button:{
  height: 50,
  marginBottom: 10,
  width: '100%',
  backgroundColor: cores.azulEscuro,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:15,
},
buttonText:{
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},




})