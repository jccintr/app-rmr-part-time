import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, Image,View,TouchableOpacity} from 'react-native';
import { cores } from '../style/globalStyle';
import Stars from './Stars';


const WorkerCard = ({contratado}) => {
  return (
    <TouchableOpacity style={styles.workerCard}  key={contratado.id} >
         <View>
           <Image style={styles.workerImage} source={{uri: contratado._user.foto.url,}}/>
         </View>
         <View style={styles.detailArea}>
            <Text style={styles.workerName}>{contratado._user.name}</Text>
            <Text style={styles.localLine}>{contratado._user.bairro} - {contratado._user.cidade}</Text>
            <Stars stars={contratado._user.stars.toString()}/>
         </View>
    </TouchableOpacity>
  )
}

export default WorkerCard



const styles = StyleSheet.create({
  workerCard:{
     flexDirection: 'row',
     
     width: '100%',
     height: 70,
     marginBottom: 10,
     backgroundColor: cores.cinzaClaro,
    elevation: 3,
    borderRadius: 10,
     borderWidth: 1,
     borderColor: '#c1c1c1',
     justifyContent: 'flex-start',
  } ,
  workerImage: {
    width: 70,
    height: 69,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    
  },
  detailArea:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 10,
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
      
    }
 
 
  
});