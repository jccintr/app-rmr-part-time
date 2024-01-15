import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { cores } from '../style/globalStyle';

const StatusOrcamento = ({status,propostas}) => {
    
  return (
    <View style={styles.container}>
      {status===1?<Text style={styles.statusText}>EM EXECUÇÃO</Text>:<Text style={styles.statusText}>{propostas>0?`Propostas Recebidas (${propostas})`:'Aguardando Propostas'}</Text>}
    </View>
  )
}

export default StatusOrcamento

const styles = StyleSheet.create({
    container: {
        borderRadius:5,
        borderWidth:1,
        paddingTop:2,
        paddingBottom:2,
        paddingHorizontal:5,
        borderRadius:5,
        borderColor: cores.azulEscuro,
        },
    statusText:{
        
        fontSize: 10,
        color: cores.azulEscuro
    }    
})