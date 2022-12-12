import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, Image,View,TouchableOpacity} from 'react-native';
import { cores } from '../style/globalStyle';

const ContratoCard = ({contrato}) => {
  const statusText = ['','Aguardando aceite do Profissional'];


  const formataData = (data) => {
   
    const arrData = data.split("-");
    return arrData[2]+'/'+arrData[1] + '/'+arrData[0];

  }
  return (
    <TouchableOpacity style={styles.container}  >
       <View style={styles.line}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.text}>{formataData(contrato.data)}</Text>
       </View>
       <View style={styles.line}>
          <Text style={styles.label}>Serviço:</Text>
          <Text style={styles.text}>{contrato.servico.nome}</Text>
       </View>
       <View style={styles.line}>
          <Text style={styles.label}>Profissional:</Text>
          <Text style={styles.text}>{contrato.profissional.name}</Text>
       </View>
       
     
       <Text style={styles.statusText}>{statusText[contrato.status]}</Text>
    </TouchableOpacity>
  )
}

export default ContratoCard


const styles = StyleSheet.create({
    container:{
       flexDirection: 'column',
       width: '100%',
       height: 90,
       margintop: 5,
       marginBottom: 5,
       backgroundColor: cores.cinzaClaro,
      elevation: 3,
      borderRadius: 5,
       borderWidth: 1,
       borderColor: '#c1c1c1',
       justifyContent: 'space-around',
       alignItems: 'flex-start',
       paddingLeft: 10,
    },
    line: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      
     
    },
    label:{
      fontSize: 14,
      marginRight: 5,
      
    },
    text: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    statusText:{
      fontWeight: 'bold',
      fontSize: 16,
      color: cores.amarelo,
      width: '100%',
      textAlign: 'center',
    }
     
   
    
  });