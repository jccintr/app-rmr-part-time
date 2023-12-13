import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import Stars from '../../components/Stars';
import { cores } from '../../style/globalStyle';
import Api from '../../Api';


const formataData = (data) => {
   
  const arrData = data.split("-");
  return arrData[2]+'-'+arrData[1] + '-'+arrData[0];

}

const CardProposta = ({proposta}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',marginBottom:10}}>
          {proposta.user.avatar?<Image style={styles.avatar} source={{uri:`${Api.base_storage}/${proposta.user.avatar}`,} }/>:<FontAwesome color={cores.azulEscuro} name="user-circle-o" size={50}  />}
          <View style={{marginLeft:10,justifyContent:'center'}}>
            <Text style={{fontWeight:'bold',marginBottom:10}}>{proposta.user.name}</Text>
            <Stars showNumber={false} stars={proposta.user.stars}/>
          </View>
      </View>
      <Text style={{marginBottom:10}}>{proposta.resposta}</Text>  
      <Text style={{marginBottom:10}}>Valor: <Text style={styles.boldText}>€ {proposta.valor}</Text></Text>  
      <Text>Enviada em <Text style={styles.boldText}>{formataData(proposta.created_at.substring(0,10))}</Text></Text>  
      
    </View>
  )
}

export default CardProposta

const styles = StyleSheet.create({
    container:{
        flex:1,
        // width: '100%',
         padding: '2%',
         borderRadius:5,
         backgroundColor: '#fff',
         marginBottom: '2%',
         overflow: 'hidden',
         shadowColor: '#000',
       shadowOffset: {
         width:0,
         height:3,
       },
       shadowOpacity: 0.17,
       shadowRadius:3.05,
       elevation:2,
       
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