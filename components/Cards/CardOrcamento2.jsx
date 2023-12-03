import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import { cores } from '../../style/globalStyle';
import StatusOrcamento from '../StatusOrcamento';
import HeightSpacer from '../reusable/HeightSpacer';


const CardOrcamento2 = ({item,onPress}) => {

    const formataData = (data) => {
   
        const arrData = data.split("-");
        return arrData[2]+'-'+arrData[1] + '-'+arrData[0];
    
      }
  
    return (
        <TouchableOpacity style={styles.container} onPress={()=>onPress(item)}>
            <Text style={{fontSize:14,color:cores.azulEscuro,fontWeight:'bold'}}>{item.titulo}</Text> 
            <HeightSpacer h={10}/>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               <Text style={styles.text}>Publicado em <Text style={styles.boldText}>{formataData(item.created_at.substring(0,10))}</Text></Text>
               <StatusOrcamento propostas={item.propostas}/>
            </View>
            <HeightSpacer h={10}/>
            <Text >{item.descricao.length>100?item.descricao.substring(0,100)+'...':item.descricao}</Text>

        </TouchableOpacity>
    )

}

export default CardOrcamento2

const styles = StyleSheet.create({
/*
   container:{
    width: '100%',
    padding: '2%',
    borderRadius:5,
    backgroundColor: cores.branco,
    marginBottom: '2%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width:0,height:3,},
    shadowOpacity: 0.17,
    shadowRadius:3.05,
    elevation:2,
   }
   */
  container: {
    width: '100%',
    padding: '2%',
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