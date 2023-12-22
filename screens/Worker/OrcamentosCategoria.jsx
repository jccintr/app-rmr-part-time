import { StyleSheet,SafeAreaView,StatusBar,FlatList,ActivityIndicator,View } from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import { cores } from '../../style/globalStyle';
import DataContext from '../context/DataContext';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native'; 
import Header from '../../components/Headers/Header';
import CardOrcamento2 from '../../components/Cards/CardOrcamento2';
import Separator from '../../components/reusable/Separator';
import EmptyList from '../../components/reusable/EmptyList';


const OrcamentosCategoria = ({route}) => {
    const {categoria} = route.params;  
    const navigation = useNavigation();
    const [orcamentos,setOrcamentos] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const {apiToken} = useContext(DataContext);

    useEffect(()=>{
       
      const getOrcamentos = async () => {
          setIsLoading(true);            
          let json = await Api.getOrcamentosByCategory(apiToken,categoria.id);
          setOrcamentos(json);
          setIsLoading(false);
      }
      getOrcamentos();
      
  }, []);
    

  return (
    <SafeAreaView style={styles.container}>
          <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
          <Header title={categoria.nome} onPress={()=>navigation.goBack()}/>
          <View style={styles.body}>
              {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.azulEscuro}/>}
              {!isLoading&&<FlatList 
                    showsVerticalScrollIndicator={false}
                    style={styles.flatlist}
                    data={orcamentos}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item})=><CardOrcamento2 item={item} onPress={()=>navigation.navigate('ViewOrcamento', {orcamento: item})}/>}
                    ItemSeparatorComponent={Separator}
                    ListEmptyComponent={<EmptyList/>}
                    contentContainerStyle={orcamentos.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
            />}
          </View>
          
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
     body:{
        paddingHorizontal: 5,
     },
     loading:{
        position: 'absolute',
        top: '50%',
     }

})