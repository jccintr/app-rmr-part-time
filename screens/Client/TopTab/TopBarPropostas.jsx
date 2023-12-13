import { StyleSheet, Text, View,FlatList } from 'react-native';
import React, {useContext} from 'react';
import DataContext from '../../context/DataContext';
import CardProposta from '../../../components/Cards/CardProposta';
import EmptyList from '../../../components/reusable/EmptyList';

const TopBarPropostas = () => {
  const {orcamento} = useContext(DataContext);
  return (
    <View style={styles.container}>
      <FlatList 
          showsVerticalScrollIndicator={false}
          style={styles.flatlist}
          data={orcamento.propostas}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item})=><CardProposta proposta={item}/>}
          //ItemSeparatorComponent={Separator}
          ListEmptyComponent={<EmptyList mensagem={'Você ainda não tem propostas'}/>}
          contentContainerStyle={orcamento.propostas.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
      />
      
    </View>
  )
}

export default TopBarPropostas

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    paddingTop:5,
    paddingHorizontal: 10,
  },
  flatlist:{
    width: '100%',
  }
})