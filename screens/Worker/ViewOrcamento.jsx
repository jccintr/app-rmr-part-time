import { StyleSheet, SafeAreaView,StatusBar,View,Dimensions,Text,ScrollView,Image } from 'react-native'
import React, {useContext,useState,useEffect} from 'react';
import DataContext from '../context/DataContext';
import Header from '../../components/Headers/Header';
import { useNavigation } from '@react-navigation/native'; 
import { cores } from '../../style/globalStyle';
import HeightSpacer from '../../components/reusable/HeightSpacer';
import Botao from '../../components/reusable/Botao';
import InputField3 from '../../components/InputFields/InputField3';
import InputArea from '../../components/InputFields/InputArea';
import Api from '../../Api';
import ModalErro from '../../components/Modals/ModalErro';

const formataData = (data) => {
   
    const arrData = data.split("-");
    return arrData[2]+'-'+arrData[1] + '-'+arrData[0];

  }

const ViewOrcamento = ({route}) => {
  const [errorMessage,setErrorMessage] = useState('');
  const [modalVisible,setModalVisible] = useState(false);
  const [config,setConfig] = useState({});
  const {apiToken} = useContext(DataContext);
  const navigation = useNavigation();
  const {orcamento} = route.params;  
  const [isLoading,setIsLoading] = useState(false);
  const [resposta,setResposta] = useState('');
  const [valor,setValor] = useState('');
  const [receber,setReceber] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  
  useEffect(()=>{
       setReceber(valor-(valor*config.percentual_profissional/100));
  }, [valor]);

  useEffect(()=>{
       
    const getConfig = async () => {
       
        let json = await Api.getConfig(apiToken);
        setConfig(json);
     
    }
    getConfig();
    
}, []);

    const onAddProposta = async () => {

      if (resposta.trim().length===0 || valor.trim().length===0 ) {
        setErrorMessage('Preencha todos os campos por favor.');
        setModalVisible(true);
        return;
      }

    setIsLoading(true);  
    let response = await Api.addProposta(apiToken,orcamento.id,resposta,valor);
    console.log(orcamento.id);
    if (response.status===201){
         navigation.navigate('SucessoProposta');
    } else {
        navigation.navigate('ErroProposta');
    }
    setIsLoading(false);

    }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
          <Header title="Solicitação de Orçamento" onPress={()=>navigation.goBack()}/>
        <ScrollView style={{width: screenWidth}} contentContainerStyle={{alignItems:'center',padding:5,}} showsVerticalScrollIndicator={false}>
          
          <View style={styles.item}>
                <View style={styles.dataArea}>
                    <Text style={styles.text}>Publicado em <Text style={styles.boldText}>{formataData(orcamento.created_at.substring(0,10))}</Text> na categoria <Text style={styles.boldText}>{orcamento.categoria.nome}</Text></Text>
                </View>
          </View>
          <View style={styles.item}>
                <View style={[styles.dataArea,{flexDirection:'column',alignItems:'flex-start'}]}>
                    <Text style={styles.boldText}>{orcamento.titulo}</Text>
                    <HeightSpacer h={10}/>
                    <Text style={{textAlign:'justify'}}>{orcamento.descricao}</Text>
                </View>
          </View>
          <Text style={{color:cores.azulEscuro,fontSize:18,fontWeight:'bold'}}>Localidade</Text>
          <View style={styles.item}>
                <View style={[styles.dataArea,{flexDirection:'column',alignItems:'flex-start'}]}>
                    <Text style={{textAlign:'justify'}}>{orcamento.logradouro},{orcamento.numero}</Text>
                    <Text style={{textAlign:'justify'}}>{orcamento.distrito.nome}</Text>
                    <Text style={{textAlign:'justify'}}>{orcamento.concelho.nome}</Text>
                </View>
          </View>
          {orcamento.data_execucao&&<>
          <Text style={{color:cores.azulEscuro,fontSize:18,fontWeight:'bold'}}>Melhor data para executar o serviço</Text>
          <View style={styles.item}>
                <View style={styles.dataArea}>
                    <Text style={styles.text}>{formataData(orcamento.data_execucao.substring(0,10))} a partir das {orcamento.data_execucao.substring(11,16)}</Text>
                </View>
          </View></>}
          {orcamento.imagem&&<>
          <Text style={{color:cores.azulEscuro,fontSize:18,fontWeight:'bold'}}>Imagem</Text>
          <HeightSpacer h={10} />
          <Image style={styles.imagem} source={{uri:`${Api.base_storage}/${orcamento.imagem}`,} }/></>}
          <HeightSpacer h={20} />
          <Text style={{color:cores.azulEscuro,fontSize:18,fontWeight:'bold'}}>Sua Proposta para este orçamento</Text>
          <View style={{width:'95%'}}>
          <InputArea 
                label=""
                placeholder=""
                value={resposta}
                onChangeText={t=>setResposta(t)}
                linha={8}
           />
           <InputField3 
                      label="Valor:"
                      placeholder=""
                      password={false}
                      editable={true}
                      value={valor}
                      onChangeText={t=>setValor(t)}
                      keyboard="number-pad"
                    />
          </View>
          {valor>0&&<View style={{width:'95%',paddingHorizontal:10}}>
             <Text style={styles.receberText}>Você receberá € {receber.toFixed(2)} pelo serviço. Taxa de utilização de {config.percentual_profissional}%.</Text>
          </View>}
          
          <HeightSpacer h={20} />
          
          <View style={{width:'95%'}}>
                <Botao
                    onPress={onAddProposta}
                    text={'ENVIAR PROPOSTA'}
                    textSize={16}
                    textColor={'#fff'}
                    width={'100%'}
                    backgroundColor={cores.azulEscuro}
                    borderWidth={0}
                    borderColor={cores.azulEscuro}
                    borderRadius={15}
                    isLoading={isLoading}
                />
          </View>
          
          </ScrollView>
          <ModalErro visible={modalVisible} setVisible={setModalVisible} mensagem={errorMessage}/>
    </SafeAreaView>
  )
}

export default ViewOrcamento

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.whiteSmoke,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
       },
   
      item:{
        marginTop: 10,
        marginBottom: 10,
        width: '95%',
        padding: 10,
        borderRadius:12,
        backgroundColor: cores.branco,
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    dataArea:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: 'lightgray',
    },
    text: {
       fontSize: 14,
    },
    boldText: {
        fontWeight: 'bold',
        color: cores.azulEscuro,
        fontSize: 14,
    },
    imagem: {
      width: 300,
      height: 200,
      borderRadius:15,
      
    },
    receberText:{
      color: cores.vermelho,
    }
    

})