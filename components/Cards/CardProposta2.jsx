import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import Stars from '../../components/Stars';
import { cores } from '../../style/globalStyle';
import Api from '../../Api';
import Botao from '../reusable/Botao';
import HeightSpacer from '../reusable/HeightSpacer';
import { FontAwesome5 } from '@expo/vector-icons';


const formataData = (data) => {
   
  const arrData = data.split("-");
  return arrData[2]+'-'+arrData[1] + '-'+arrData[0];

}

const PropostaAceita = () => {
  return(
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <FontAwesome5 style={{marginRight: 10}} name="trophy" size={24} color={cores.amarelo} />
      <Text style={{color:cores.azulEscuro, fontSize:16,fontWeight:'bold'}}>PROPOSTA VENCEDORA</Text>
    </View>
  );
}

const CardProposta2 = ({proposta, onPress,status}) => {
  return (
    <View style={styles.container}>
      <Text style={{marginBottom:10,color:cores.azulEscuro,fontWeight:'bold'}}>{proposta.orcamento.titulo}</Text>  
      <Text style={{marginBottom:10}}>{proposta.resposta}</Text>  
      <Text style={{marginBottom:10}}>Valor: <Text style={styles.boldText}>€ {proposta.valor}</Text></Text>  
      <Text>Enviada em <Text style={styles.boldText}>{formataData(proposta.created_at.substring(0,10))}</Text></Text>  
      <HeightSpacer h={20}/>
       {!proposta.aceita&&status===0&&<Botao 
            onPress={()=>onPress(proposta)}
            text={'DELETAR ESTA PROPOSTA'} 
            textSize={16}
            textColor={cores.vermelho}
            width={'100%'}
            borderColor={cores.vermelho}
            borderWidth={2}
            borderRadius={15}
            isLoading={false}
        />}
        {proposta.aceita&&<PropostaAceita/>}

        
    </View>
  )
}

export default CardProposta2

const styles = StyleSheet.create({
    container:{
        flex:1,
        // width: '100%',
         padding: '2%',
         borderRadius:5,
         backgroundColor: '#fff',
         marginBottom: '2%',
        
       
    },
    avatar:{
        height: 50,
        width: 50,
        borderRadius:50,
        borderColor: '#fff',
        borderWidth: 2,
     },
     boldText: {
      fontWeight: 'bold',
      color: cores.azulEscuro,
      fontSize: 14,
  },
})