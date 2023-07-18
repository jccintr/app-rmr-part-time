import { StyleSheet, Text,TouchableOpacity,Image } from 'react-native';
import React from 'react';
import Api from '../Api';
import Stars from './Stars';
import { cores } from '../style/globalStyle';

const WorkerCard2 = ({worker}) => {
  return (
    <TouchableOpacity style={styles.container}  key={worker.id} onPress={()=>{}}>
        <Image style={styles.avatar} source={{uri: `${Api.base_storage}/${worker.user.avatar}`,}}/>
        <Stars stars={worker.user.stars} showNumber={false}/>
        <Text style={styles.name}>{worker.user.name}</Text>
        <Text style={styles.price}>€ {worker.valor} p/{worker.unidade}</Text>
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
        minWidth: 160,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'space-between',
        margin: 5,
        borderColor: '#c1c1c1',
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        backgroundColor: 'whitesmoke',
        
     },
     avatar:{
        borderRadius: 30,
        width: 70,
        height: 70,
        marginBottom: 5,
      },
      name:{
        marginTop:5,
        fontWeight: 'bold',
        fontSize: 14,
        paddingHorizontal: 5,
      },
      price: {
        color: cores.amarelo,
        fontWeight: 'bold',
      }

})