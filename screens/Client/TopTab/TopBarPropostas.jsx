import { StyleSheet, Text, View } from 'react-native';
import React, {useContext} from 'react';
import DataContext from '../../context/DataContext';

const TopBarPropostas = () => {
  const {orcamento} = useContext(DataContext);
  return (
    <View style={styles.container}>
      <Text>TopBarPropostas</Text>
      <Text>Propostas: {orcamento.propostas.length}</Text>
      
    </View>
  )
}

export default TopBarPropostas

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
  }
})