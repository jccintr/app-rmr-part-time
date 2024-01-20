import { StyleSheet, Text, StatusBar,SafeAreaView ,View} from 'react-native';
import React from 'react';
import { cores } from '../style/globalStyle';
import Header from '../components/Headers/Header';
import { useNavigation } from '@react-navigation/native';
import HeightSpacer from '../components/reusable/HeightSpacer';

const Termos = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
      <Header title="Termos de Uso" onPress={()=>navigation.goBack()}/>
      <View style={styles.body}>
              <Text style={styles.title}>Ao utilizar este aplicativo, você concorda com os termos de uso abaixo descritos.</Text>
              <HeightSpacer h={20}/>
              <Text style={styles.text}>A RMR Parttime disponibiliza de uma plataforma eficiente onde podemos proporcionar ao nossos usuários, um trabalho e serviço visando um atendimento de qualidade aos clientes e usuários.</Text> 
              <Text style={styles.title}>Profissional</Text>
              <Text style={styles.text}>Ao aceitar o serviço está comprometido a cumprir com os deveres e compromissos, sendo assim após o término do serviço será depositado diretamente em sua conta o ordenado do serviço sendo descontado a taxa de utilização do aplicativo referente ao serviço prestado.</Text>
              <Text style={styles.title}>Cliente</Text>
              <Text style={styles.text}>Tem a nossa garantia de ter o profissional qualificado para atendimento ao serviço com garantia e qualidade conforme seu orçamento, assim que efetuado o pagamento com a taxa de IVA e de utilizacao do aplicativo será disponibilizado o profissional escolhido para a prestação de seu serviço.</Text>
      </View>
    </SafeAreaView>
  )
}

export default Termos

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    body:{
        marginTop: 10,
        marginBottom: 10,
        width: '95%',
        padding: 10,
        borderRadius:12,
        backgroundColor: cores.branco,
        
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title:{
        fontSize:16,
        width: '100%',
        fontWeight: 'bold',
        textAlign:'center',
        color: cores.azulEscuro
    },
    text:{
        fontSize:15,
        marginVertical:5,
        textAlign:'justify',
        width:'100%',


    }
    
})