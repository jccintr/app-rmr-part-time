import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, SafeAreaView,View,ScrollView,StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cores } from '../../style/globalStyle';
//import { StatusBar } from 'expo-status-bar';
import Api from '../../Api';
import ServiceCard from '../../components/ServiceCard';

const Home = () => {
    const [userName,setUserName] = useState('');
    const [services,setServices] = useState([]);
    const navigation = useNavigation();


    const onServicePress  = (servico) =>{
        navigation.navigate('ServicoWorker',{servico: servico})
     }

     useEffect(()=>{
        const getUserName = async () => {
            const user = await AsyncStorage.getItem('userName');
            setUserName(user) 
        }
        getUserName();
    }, []);

    useEffect(()=>{
        const getServices = async () => {
        let json = await Api.getServices();
        setServices(json);
        }
        getServices();
    }, []);



    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={cores.branco}
                barStyle="dark-content"
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.userNameArea}>
                        <Text style={styles.userNameText}>Olá {userName} !</Text>
                        <Text style={styles.fraseHeader}>Qual é a sua especialidade ?</Text>
                    </View>
                    <Text style={styles.title}>Serviços disponíveis</Text>
                    <View style={styles.servicesContainer}>
                        {services.map((service) => (<ServiceCard servico={service} role="worker" key={service.id} onPress={onServicePress}/>))}
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
        backgroundColor: '#fff',
        paddingHorizontal:5,
   
        
    },
    userNameArea:{
        width: '100%',
        height: 50,
       flexDirection: 'column',
       justifyContent: 'space-between',
       marginBottom: 20,

    },
    userNameText:{
      fontWeight: 'bold',
      fontSize: 18,
      color: cores.amarelo,
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
    servicesContainer:{
        flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: 'flex-start',
      width: '100%',
     
      
    }
   
    
  });