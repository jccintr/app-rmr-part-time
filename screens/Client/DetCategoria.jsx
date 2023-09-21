import { StyleSheet, Image, SafeAreaView,StatusBar,View,TouchableOpacity,Text,FlatList } from 'react-native'
import React, {useContext,useState, useEffect} from 'react'
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native'; 
import DataContext from '../context/DataContext';
import Header from '../../components/Header';
import Api from '../../Api';
import { AntDesign } from '@expo/vector-icons';
import WorkerCard2 from '../../components/WorkerCard2';


const DetCategoria = ({route}) => {
    const {loggedUser} = useContext(DataContext);
    const {categoria} = route.params;  
    const navigation = useNavigation();
    const [workers,setWorkers] = useState([]);


    useEffect(()=>{
        const getWorkers = async () => {
        //setIsLoading(true);  
        let json = await Api.getCategoria(categoria.id);
        setWorkers(json.worker);
        //setIsLoading(false);  
        }
        getWorkers();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
        <Header title={categoria.nome} onPress={()=>navigation.goBack()}/>
        <Image style={styles.image} source={{uri: `${Api.base_storage}/${categoria.imagem}`,}}/>
        
        <View style={styles.body}>
            <Text style={styles.descricaoText}>{categoria.descricao}</Text>
            <AntDesign name="checkcircleo" size={28} color={cores.azulEscuro} />
            <Text style={styles.checkText}>Solicite um orçamento personalizado sem compromisso.</Text>
            <AntDesign name="checkcircleo" size={28} color={cores.azulEscuro} />
            <Text style={styles.checkText}>Aguarde as respostas dos profissionais.</Text>
            <AntDesign name="checkcircleo" size={28} color={cores.azulEscuro} />
            <Text style={styles.checkText}>Escolha o orçamento do profissional que melhor lhe atende.</Text>
            <FlatList 
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  style={styles.flatlist}
                  data={workers}
                  keyExtractor={(item)=> item.id.toString()}
                  renderItem={({item})=><WorkerCard2 worker={item} />}
                  
              />
            <TouchableOpacity onPress={()=>{}} style={styles.button}>
            <Text style={styles.buttonText} >SOLICITAR ORÇAMENTO</Text>
            </TouchableOpacity>  
        </View>
        
    </SafeAreaView>
  )
}

export default DetCategoria

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: cores.branco,
        alignItems: 'center',
        justifyContent: 'flex-start',
       },
        body:{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: 5,
          
          
        },
        image:{
            width: '100%',
            height: 150,
            
          },
          descricaoText: {
             marginTop: 10,
             fontSize: 16,
             fontWeight: 'bold',
             color: cores.azulEscuro,
             width: '100%',
             textAlign: 'center',
             marginBottom: 10,

          },
          checkText: {
            textAlign: 'center',
            color: cores.azulEscuro,
            marginBottom: 10,
            
          },
          flatlist:{
            marginTop: 20,
            width: '100%',
          },
          button:{
            position: 'absolute',
            bottom: 0,
            height: 50,
            marginBottom: 10,
            width: '100%',
            backgroundColor: cores.azulEscuro,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:15,
          },
          buttonText:{
            color: '#fff',
            fontSize: 16,
      
            fontWeight: 'bold',
          },

})