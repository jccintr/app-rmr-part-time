import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import Stars from '../../components/Stars';
import { cores } from '../../style/globalStyle';

const CardProposta = ({proposta}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',marginBottom:10}}>
          {proposta.user.avatar?<Image style={styles.avatar} source={{uri:`${Api.base_storage}/${proposta.user.avatar}`,} }/>:<FontAwesome color={cores.azulEscuro} name="user-circle-o" size={60}  />}
          <View style={{marginLeft:10,justifyContent:'center'}}>
            <Text style={{fontWeight:'bold',marginBottom:10}}>{proposta.user.name}</Text>
            <Stars showNumber={false} stars={4.5}/>
          </View>
      </View>
      <Text style={{marginBottom:10}}>{proposta.resposta}</Text>  
      <Text style={{marginBottom:10}}>Valor: {proposta.valor}</Text>  
      <Text>{proposta.created_at}</Text>  
      
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
})