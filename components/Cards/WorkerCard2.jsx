import { StyleSheet, Text,TouchableOpacity,Image } from 'react-native';
import React from 'react';
import Api from '../../Api';
import Stars from '../Stars';
import { cores } from '../../style/globalStyle';
import { FontAwesome } from '@expo/vector-icons'; 

const WorkerCard2 = ({worker}) => {
  return (
    <TouchableOpacity style={styles.container}  key={worker.id} onPress={()=>{}}>
        {worker.user.avatar?<Image style={styles.avatar} source={{uri: `${Api.base_storage}/${worker.user.avatar}`,}}/>:<FontAwesome color={cores.azulEscuro} name="user-circle-o" size={50}  />}
        <Stars stars={worker.user.stars} showNumber={false}/>
        <Text style={styles.name}>{worker.user.name}</Text>
        <Text style={styles.price}>{worker.user.concelho.nome}</Text>
    </TouchableOpacity>
  )
}

export default WorkerCard2

const styles = StyleSheet.create({

    container:{
        
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderRadius:10,
        width: 160,
        height: 130,
        minWidth: 160,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'space-between',
        margin: 5,
        borderColor: '#c1c1c1',
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        backgroundColor: cores.azulClaro,
        
     },
     avatar:{
        borderRadius: 30,
        width: 50,
        height: 50,
        
      },
      name:{
        marginTop:5,
        fontWeight: 'bold',
        fontSize: 14,
        paddingHorizontal: 5,
        textAlign: 'center'
      },
      price: {
        color: cores.azulEscuro,
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center'
      }

})