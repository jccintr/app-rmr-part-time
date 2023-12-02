import React, { useEffect,useState,useContext } from 'react';
import { StyleSheet, Text, SafeAreaView,View,ActivityIndicator,StatusBar,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { cores } from '../../style/globalStyle';
import Api from '../../Api';
import CategoriaCard from '../../components/Cards/CategoriaCard';
import DataContext from '../context/DataContext';
import SearchField from '../../components/InputFields/SearchField';

const Home = () => {
    const [search,setSearch] = useState('');
    const [categorias,setCategorias] = useState([]);
    const navigation = useNavigation();
    const {loggedUser} = useContext(DataContext);
    const [isLoading,setIsLoading] = useState(false);
    
    const categoriasFiltered = categorias.filter(categoria=>categoria.nome.toUpperCase().includes(search.toUpperCase()));

    const onCategoriaPress  = (categoria) =>{
        navigation.navigate('DetCategoria',{categoria: categoria})
     }

     const onSearch = (t) => {
        setSearch(t);
     }


    useEffect(()=>{
       
        const getCategorias = async () => {
            setIsLoading(true);            
            let json = await Api.getCategorias();
            setCategorias(json);
            setIsLoading(false);
        }
        getCategorias();
        
    }, []);



    return (
        
        <SafeAreaView style={styles.container}>
                   <StatusBar animated={true} backgroundColor={cores.branco} barStyle="dark-content"/>
                    <View style={styles.userNameArea}>
                        <Text style={styles.userNameText}>Olá {loggedUser===null?'Visitante':loggedUser.name} !</Text>
                        <Text style={styles.fraseHeader}>Qual serviço você precisa para hoje ?</Text>
                    </View>
                    <SearchField value={search} setValue={setSearch} onChangeText={onSearch} placeholder="Pesquisar categorias"/>
                    {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.azulEscuro}/>}
                    {!isLoading&&<FlatList 
                        showsVerticalScrollIndicator={false}
                        style={styles.flatlist}
                        data={categoriasFiltered}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item})=><CategoriaCard categoria={item} onPress={onCategoriaPress}/>}
                        numColumns={2}
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