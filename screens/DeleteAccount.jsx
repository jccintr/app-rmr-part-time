import { StyleSheet, Text, StatusBar,SafeAreaView ,View} from 'react-native';
import React, { useContext,useState } from 'react'
import { cores } from '../style/globalStyle';
import Header from '../components/Headers/Header';
import { useNavigation } from '@react-navigation/native';
import HeightSpacer from '../components/reusable/HeightSpacer';
import Botao from '../components/reusable/Botao';
import Api from '../Api';
import DataContext from './context/DataContext';
import ModalErro from '../components/Modals/ModalErro';


const DeleteAccount = () => {
    const [errorMessage,setErrorMessage] = useState('');
    const [modalVisible,setModalVisible] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const navigation = useNavigation();
    const {loggedUser,setLoggedUser,setApiToken,apiToken} = useContext(DataContext)

    const deleteAccount = async () => {
       setIsLoading(true);
       let response = await Api.deleteAccount(apiToken);
       if(response.status===200){
          setApiToken('');
          setLoggedUser(null);
          setIsLoading(false);
          navigation.reset({routes:[{name:'Login'}]});
       } else {
          setIsLoading(false);
          setErrorMessage('Ocorreu um erro ao tentar remover a sua conta.')
          setModalVisible(true);
       }
    }


    return (
        <SafeAreaView style={styles.container}>
          <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
          <Header title="Exclusão de Conta" onPress={()=>navigation.goBack()}/>
          <View style={styles.body}>
          <Text style={styles.text}>Deseja realmente excluir a sua conta ?</Text>
          <HeightSpacer h={20}/>
          <Text style={styles.text}>Esta ação é irreversível.</Text>
          <HeightSpacer h={40}/>
          <Botao 
            onPress={()=>deleteAccount()}
            text={'SIM, REMOVA A MINHA CONTA'}
            textSize={16}
            textColor={'#fff'}
            width={'100%'}
            backgroundColor={cores.vermelho}
            borderWidth={0}
            borderColor={cores.vermelho}
            borderRadius={15}
            isLoading={isLoading}
          />
          <HeightSpacer h={10}/>
          <Botao 
            onPress={()=>navigation.goBack()}
            text={'NÃO, MANTENHA A MINHA CONTA'}
            textSize={16}
            textColor={'#fff'}
            width={'100%'}
            backgroundColor={cores.azulEscuro}
            borderWidth={0}
            borderColor={cores.azulEscuro}
            borderRadius={15}
         />
          </View>
          <ModalErro visible={modalVisible} setVisible={setModalVisible} mensagem={errorMessage}/>  
        </SafeAreaView>
      )
}

export default DeleteAccount

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        
    },
    body:{
        width: '95%',
        flex: 1,
        
        alignItems:'center',
        justifyContent:'center',
    },     
    text:{
        fontSize: 18,
        color: cores.azulEscuro,
        textAlign: 'center'
     },
    
})