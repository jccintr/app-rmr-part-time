import React, { useEffect,useState,useContext } from 'react';
import { StyleSheet, Text, SafeAreaView,View,StatusBar,FlatList,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cores } from '../../style/globalStyle';
import Api from '../../Api';
import DataContext from '../context/DataContext';
import CardOrcamento from '../../components/Cards/CardOrcamento';
import CategoriaCard2 from '../../components/Cards/CategoriaCard2';
import { useFocusEffect } from '@react-navigation/native';
import EmptyList from '../../components/reusable/EmptyList';


const Home = () => {
    const [categorias,setCategorias] = useState([]);
    const navigation = useNavigation();
    const {loggedUser,apiToken} = useContext(DataContext);
    const [isLoading,setIsLoading] = useState(false);

    const categoriasFiltered = categorias.filter(categoria=>categoria.orcamentos_count>0);

    useFocusEffect(
      React.useCallback(() => {
          
           StatusBar.setBackgroundColor(cores.branco); //add color code
          
      }, []),
    );


     useEffect(()=>{
       
      const getCategoriasWorker = async () => {
          setIsLoading(true);            
          let json = await Api.getCategoriasWorker(apiToken);
          setCategorias(json);
          setIsLoading(false);
      }
      getCategoriasWorker();
      
  }, []);

    
      

    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar animated={true} backgroundColor={cores.branco} barStyle="dark-content"/>
            <View style={styles.userNameArea}>
                  <Text style={styles.userNameText}>Olá {loggedUser===null?'Visitante':loggedUser.name} !</Text>
                  <Text style={styles.fraseHeader}>Vamos encontrar um trabalho ?</Text>
            </View>
            {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.azulEscuro}/>}
            {!isLoading&&<FlatList 
                showsVerticalScrollIndicator={false}
                
                data={categoriasFiltered}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item})=><CategoriaCard2 categoria={item} onPress={()=>navigation.navigate('OrcamentosCategoria', {categoria: item})}/>}
                numColumns={2}
                ListEmptyComponent={<EmptyList mensagem={'Nenhuma oportunidade de trabalho encontrada.'}/>}
                contentContainerStyle={categoriasFiltered.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
            />}       
        </SafeAreaView>
       
       )
}

export default Home


const styles = StyleSheet.create({
   container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
   },
   userNameArea:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
  userNameText:{
   fontWeight: 'bold',
   fontSize: 18,
   color: cores.azulEscuro,
 },
 fraseHeader:{
     fontSize: 18,
     color: '#000',
     fontStyle: 'italic',
 },
 loading:{
    position: 'absolute',
    top: '50%',
   }
 
   
   
    
  });



   /*!isLoading&&<FlatList 
                        showsVerticalScrollIndicator={false}
                        style={styles.flatlist}
                        data={orcamentos}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item})=><CardOrcamento item={item} onPress={onOrcamentoPress}/>}
                        ItemSeparatorComponent={Separator}
                        ListEmptyComponent={<EmptyList/>}
                        contentContainerStyle={orcamentos.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
    />*/