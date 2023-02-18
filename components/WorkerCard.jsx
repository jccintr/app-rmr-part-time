import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, Image,View,TouchableOpacity} from 'react-native';
import { cores } from '../style/globalStyle';
import Stars from './Stars';
import avatar from '../assets/avatar.jpg';
import Api from '../Api';


const WorkerCard = ({contratado,onPress}) => {
  return (
    <TouchableOpacity style={styles.workerCardContainer}  key={contratado.id} onPress={onPress}>
        <View>
          <Image style={styles.workerImage} source={contratado.user.imagem != null ? {uri: `${Api.base_storage}/${contratado.user.imagem}`,} : avatar}/>
        </View>
        <View style={styles.detailArea}>
            <Text style={styles.workerName}>{contratado.user.name}</Text>
            <Text style={styles.localLine}>{contratado.user.bairro} - {contratado.user.cidade}</Text>
            <Stars stars={contratado.user.stars.toString()}/>
        </View>
    </TouchableOpacity>
  )
}

export default WorkerCard

const styles = StyleSheet.create({
  workerCardContainer:{
     flexDirection: 'row',
     width: '100%',
     height: 70,
     marginBottom: 10,
     backgroundColor: cores.cinzaClaro,
     elevation: 3,
     borderRadius: 5,
     borderWidth: 1,
     borderColor: '#c1c1c1',
     justifyContent: 'flex-start',
     alignItems: 'center',
  } ,
 
  workerImage: {
    width: 70,
    height: 69,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
       
  },
  detailArea:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 10,
    height: 70,
   
  },
  workerName:{
      fontWeight: 'bold',
      fontSize: 14,
      width: '100%',
      textAlign: 'left',
      
  },
    localLine:{
      fontSize: 14,
      width: '100%',
      textAlign: 'left',
      
    },
    botaoContratar:{
     
      backgroundColor: cores.amarelo,
      height: 30,
      width: 90,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:5,

    }
 
 
  
});