import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import { cores } from '../../style/globalStyle';
import StatusOrcamento from '../StatusOrcamento';


const CardOrcamento = ({item}) => {

    const formataData = (data) => {
   
        const arrData = data.split("-");
        return arrData[2]+'-'+arrData[1] + '-'+arrData[0];
    
      }
  
    return (
        <TouchableOpacity style={styles.container}>

            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               <Text style={{fontWeight:'bold',fontSize:14}}>{formataData(item.created_at.substring(0,10))}</Text> 
               <StatusOrcamento propostas={item.propostas}/>
            </View>
            <Text style={{fontSize:12,color:cores.azulEscuro,fontWeight:'bold'}}>{item.categoria.nome}</Text>
            <Text style={{fontSize:14,color:'#000',fontWeight:'bold'}}>{item.titulo}</Text>
            
            <Text style={{color:'#a1a1a1'}}>{item.descricao.length>100?item.descricao.substring(0,100)+'...':item.descricao}</Text>

        </TouchableOpacity>
    )

}

export default CardOrcamento

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
  }
})