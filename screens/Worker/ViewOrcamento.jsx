import { StyleSheet, SafeAreaView,StatusBar,View,Dimensions,Text,ScrollView } from 'react-native'
import React, {useContext,useState,useEffect} from 'react';
import DataContext from '../context/DataContext';
import Header from '../../components/Headers/Header';
import { useNavigation } from '@react-navigation/native'; 
import { cores } from '../../style/globalStyle';
import HeightSpacer from '../../components/reusable/HeightSpacer';
import Botao from '../../components/reusable/Botao';
import InputField3 from '../../components/InputFields/InputField3';
import InputArea from '../../components/InputFields/InputArea';

const formataData = (data) => {
   
    const arrData = data.split("-");
    return arrData[2]+'-'+arrData[1] + '-'+arrData[0];

  }

const ViewOrcamento = ({route}) => {
    const {loggedUser,apiToken} = useContext(DataContext);
    const navigation = useNavigation();
    const {orcamento} = route.params;  
    const [isLoading,setIsLoading] = useState(false);
    const [resposta,setResposta] = useState('');
    const [valor,setValor] = useState(1);
    const screenWidth = Dimensions.get('window').width;


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
          <View style={styles.item}>
                <View style={[styles.dataArea,{flexDirection:'column',alignItems:'flex-start'}]}>
                    <Text style={{textAlign:'justify'}}>{orcamento.logradouro},{orcamento.numero}</Text>
                    <Text style={{textAlign:'justify'}}>{orcamento.distrito.nome}</Text>
                    <Text style={{textAlign:'justify'}}>{orcamento.concelho.nome}</Text>
                </View>
          </View>
          <Text style={{color:cores.azulEscuro,fontSize:18,fontWeight:'bold'}}>Sua Proposta para este orçamento</Text>
          <View style={{width:'95%'}}>
          <InputArea 
                label=""
                placeholder="Chegou a sua hora de brilhar. Descreva como vai resolver o problema deste cliente e consiga este trabalho."
                value={resposta}
                onChangeText={t=>setResposta(t)}
                linha={8}
           />
           <InputField3 
                      label="Valor:"
                      placeholder="Informe o valor de sua proposta"
                      password={false}
                      editable={true}
                      value={valor}
                      onChangeText={t=>setValor(t)}
                      keyboard="number-pad"
                    />
          </View>
          
          <View style={{width:'95%'}}>
                <Botao
                    onPress={() => {}}
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

})