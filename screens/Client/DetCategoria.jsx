import { StyleSheet, Image, SafeAreaView,StatusBar,View,TouchableOpacity,Text } from 'react-native'
import React, {useContext,useState, useEffect} from 'react'
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native'; 
import DataContext from '../context/DataContext';
import Header from '../../components/Headers/Header';
import Api from '../../Api';
import { AntDesign } from '@expo/vector-icons';
import Botao from '../../components/reusable/Botao';
import WidthSpacer from '../../components/reusable/WidthSpacer';
import HeightSpacer from '../../components/reusable/HeightSpacer';

const DetCategoria = ({route}) => {
    const {loggedUser} = useContext(DataContext);
    const {categoria} = route.params;  
    const navigation = useNavigation();
    //const [workers,setWorkers] = useState([]);


    // useEffect(()=>{
    //     const getWorkers = async () => {
    //     //setIsLoading(true);  
    //     let json = await Api.getCategoria(categoria.id);
    //     setWorkers(json.worker);
    //     //setIsLoading(false);  
    //     }
    //     getWorkers();
    // }, []);

    const onSolicitarOrcamento = () => {
             
      if (loggedUser===null){
        navigation.reset({routes:[{name:'Login'}]});
      } 
      else {
        navigation.navigate('Orcamento',{categoria:categoria})
      }  

    }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
        <Header title={categoria.nome} onPress={()=>navigation.goBack()}/>
        <Image style={styles.image} source={{uri: `${Api.base_storage}/${categoria.imagem}`,}}/>
        
        <View style={styles.body}>
            <Text style={styles.descricaoText}>{categoria.descricao}</Text>
           
            <View style={styles.checkArea}>
                <View style={styles.numberContainer}>
                  <Text style={styles.number}>1</Text>
                </View>
                <WidthSpacer w={10}/>
                <Text style={styles.checkText}>Solicite um orçamento de um serviço sem compromisso.</Text>
            </View>
            <View style={styles.checkArea}>
               <View style={styles.numberContainer}>
                  <Text style={styles.number}>2</Text>
                </View>
               <WidthSpacer w={10}/>
               <Text style={styles.checkText}>Aguarde as propostas dos profissionais.</Text>
            </View>
            <View style={styles.checkArea}>
                <View style={styles.numberContainer}>
                  <Text style={styles.number}>3</Text>
                </View>
               <WidthSpacer w={10}/>
               <Text style={styles.checkText}>Escolha a proposta que melhor lhe atende.</Text>
            </View>
            <HeightSpacer h={20}/>
            <Botao onPress={()=>{navigation.navigate('Categoria',{categoria})}} text={'EXPLORAR CATEGORIA'} textSize={16} textColor={cores.azulEscuro} width={'100%'} backgroundColor={cores.branco} borderWidth={2} borderColor={cores.azulEscuro} borderRadius={15}/>
            <TouchableOpacity onPress={onSolicitarOrcamento} style={styles.button}>
               <Text style={styles.buttonText} >{loggedUser===null?'ENTRE PARA SOLICITAR ORÇAMENTO':'SOLICITAR ORÇAMENTO'}</Text>
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
        checkArea: {
         
          padding:10,
          width:'95%',
          flexDirection:'row',
          alignItems: 'center',
          borderRadius: 10,
          justifyContent: 'flex-start'
          },
          checkText: {
            color: cores.azulEscuro,
          },
          numberContainer:{
            height:30,
            width: 30,
            borderRadius:15,
            backgroundColor: cores.azulEscuro,
            alignItems: 'center',
            justifyContent: 'center',
          },
          number:{
            color: '#fff',
            fontSize:22,
            fontWeight: 'bold',
            
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