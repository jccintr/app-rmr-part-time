import { StyleSheet,SafeAreaView,StatusBar,FlatList,View } from 'react-native';
import React from 'react';
import { cores } from '../../style/globalStyle';
import DataContext from '../context/DataContext';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native'; 
import Header from '../../components/Headers/Header';
import CardOrcamento2 from '../../components/Cards/CardOrcamento2';

const Separator = () => (
  <View
    style={{
      backgroundColor: cores.azulEscuro,
      height: 0.5,
    }}
  />
);

const EmptyList = () => {
  return <Text style={{color: cores.azulEscuro}}>Tem nada ainda parceiro !</Text>
}  


const OrcamentosCategoria = ({route}) => {
    const {orcamentos,categoria} = route.params;  
    const navigation = useNavigation();

    

  return (
    <SafeAreaView style={styles.container}>
          <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
          <Header title={'Oportunidades para '+ categoria} />
          <FlatList 
                        showsVerticalScrollIndicator={false}
                        style={styles.flatlist}
                        data={orcamentos}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item})=><CardOrcamento2 item={item} onPress={()=>navigation.navigate('ViewOrcamento', {categoria: categoria,orcamento: item})}/>}
                        ItemSeparatorComponent={Separator}
                        ListEmptyComponent={<EmptyList/>}
                        contentContainerStyle={orcamentos.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
         />
    </SafeAreaView>
  )
}

export default OrcamentosCategoria

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.branco,
        alignItems: 'center',
        justifyContent: 'flex-start',
        
       },

})