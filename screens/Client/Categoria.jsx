import { View, Text,StatusBar,StyleSheet,SafeAreaView,FlatList,ActivityIndicator,Dimensions } from 'react-native';
import React, {useState,useEffect} from 'react';
import Header from '../../components/Headers/Header';
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native'; 
import SearchField from '../../components/InputFields/SearchField';
import Api from '../../Api';
import WorkerCard2 from '../../components/Cards/WorkerCard2';

const Categoria = ({route}) => {
    const {categoria} = route.params;  
    const navigation = useNavigation();
    const [search,setSearch] = useState('');
    const [workers,setWorkers] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    //const screenWidth = Dimensions.get('window').width;


    const onSearch = (t) => {
        setSearch(t);
      }

     const workersFiltered = workers.filter(worker=>worker.user.name.toUpperCase().includes(search.toUpperCase()));

     useEffect(()=>{
        const getWorkers = async () => {
        setIsLoading(true);  
        let json = await Api.getCategoria(categoria.id);
        setWorkers(json.worker);
        setIsLoading(false);  
        }
        getWorkers();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
          <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
          <Header title={categoria.nome} onPress={()=>navigation.goBack()}/>
          <View style={styles.body}>
              <SearchField value={search} setValue={setSearch} onChangeText={onSearch} placeholder="Encontre profissionais"/>
              {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.amarelo}/>}
              {!isLoading&&<FlatList 
                  showsVerticalScrollIndicator={false}
                  style={styles.flatlist}
                  data={workersFiltered}
                  keyExtractor={(item)=> item.id.toString()}
                  renderItem={({item})=><WorkerCard2 worker={item} />}
                  numColumns={2}
              />}
          </View>
    </SafeAreaView>
  )
}

export default Categoria

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      
     },
      body:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        
      },
      workersContainer:{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'flex-start',
        width: '100%',
        height: 150,
        paddingHorizontal: 5,
      },
      flatlist:{
        width: '100%',
      },
      loading:{
        position: 'absolute',
        top: '50%',
       }
    
  
  })