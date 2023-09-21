import React, { useEffect,useState,useContext } from 'react';
import { StyleSheet, Text, SafeAreaView,View,ScrollView,StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { cores } from '../../style/globalStyle';
import Api from '../../Api';
import CategoriaCard from '../../components/CategoriaCard';
import DataContext from '../context/DataContext';
import SearchField from '../../components/SearchField';

const Home = () => {
    const [search,setSearch] = useState('');
    const [categorias,setCategorias] = useState([]);
    const navigation = useNavigation();
    const {loggedUser} = useContext(DataContext);
    


    const onCategoriaPress  = (categoria) =>{
        navigation.navigate('DetCategoria',{categoria: categoria})
     }

     const onSearch = (t) => {
        setSearch(t);
     }


    useEffect(()=>{
        const getCategorias = async () => {
        let json = await Api.getCategorias();
        setCategorias(json);
        }
        getCategorias();
    }, []);



    return (
        
        <SafeAreaView style={styles.container}>
             <StatusBar animated={true} backgroundColor={cores.branco} barStyle="dark-content"/>
            <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.userNameArea}>
                        <Text style={styles.userNameText}>Olá {loggedUser===null?'Visitante':loggedUser.name} !</Text>
                        <Text style={styles.fraseHeader}>Qual serviço você precisa para hoje ?</Text>
                    </View>
                    <SearchField value={search} setValue={setSearch} onChangeText={onSearch} placeholder="Encontre serviços"/>
                    
                    <View style={styles.categoriasContainer}>
                        {categorias.map((categoria) => (
                            <CategoriaCard categoria={categoria} key={categoria.id} onPress={onCategoriaPress}/>
                        ))}
                    </View>
             </ScrollView> 
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
        backgroundColor: cores.branco,
        paddingHorizontal: 5,
        paddingTop: 10,
        
   },
    userNameArea:{
       flexDirection: 'column',
       justifyContent: 'space-between',
       marginBottom: 10,
       paddingHorizontal: 5,
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
    title:{
        width: '100%',
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    categoriasContainer:{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: 'flex-start',
      width: '100%',
    }
   
    
  });