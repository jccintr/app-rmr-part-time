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


const Orcamento = ({route}) => {
  const screenWidth = Dimensions.get('window').width;
    const {loggedUser,apiToken} = useContext(DataContext);
    const navigation = useNavigation();
    const {categoria} = route.params;  
    const [logradouro,setLogradouro] = useState('');
    const [numero,setNumero] = useState('');
    const [descricao,setDescricao] = useState('');
    const [imagem,setImagem] = useState(null);
    const [distrito,setDistrito] = useState(null);
    const [concelho,setConcelho] = useState(null);
    const [concelhos,setConcelhos] = useState([]);
    const [distritos,setDistritos] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    

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

const onAddOrcamento = async () => {

if (descricao.trim().length===0 || logradouro.trim().length===0 || numero.trim().length===0 || distrito === null || concelho === null ) {
    alert('Preencha todos os campos por favor.');
    return;
}
    setIsLoading(true);
    const fd = new FormData();
    fd.append('descricao',descricao);
    fd.append('categoria_id',categoria.id);
    fd.append('logradouro',logradouro);
    fd.append('numero',numero);
    fd.append('distrito_id',distrito.id);
    fd.append('concelho_id',concelho.id);
    
    if (imagem!=null){
       fd.append('imagem',{uri: imagem,type: 'image/jpg',name: 'image.jpg',});
    }
    let response = await Api.addOrcamento(apiToken,fd);
    if (response.status===201){
         navigation.navigate('Sucesso');
    } else {
        alert(response.status);
        let json = await response.json();
        console.log(json.erro);
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