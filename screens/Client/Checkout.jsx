import { StyleSheet, Text, View,StatusBar,TouchableOpacity,ActivityIndicator } from 'react-native';
import React, {useContext,useState, useEffect} from 'react';
import Header from '../../components/Headers/Header';
import { useNavigation } from '@react-navigation/native'; 
import { cores } from '../../style/globalStyle';
import DataContext from '../context/DataContext';
import HeightSpacer from '../../components/reusable/HeightSpacer';
import Api from '../../Api';

import { useStripe } from '@stripe/stripe-react-native';


const Checkout = ({route}) => {
    const navigation = useNavigation();
    const [config,setConfig] = useState({});
    const [isLoading,setIsLoading] = useState(false);
    const {orcamento,apiToken} = useContext(DataContext);
    const { initPaymentSheet,presentPaymentSheet } = useStripe();
    const {proposta} = route.params;  
    const valor = proposta.valor*1;
    const iva = valor * (config.percentual_iva/100);
    const taxaUso = valor * (config.percentual_cliente/100);
    const total = valor + iva + taxaUso;

    

    useEffect(()=>{
       
      const getConfig = async () => {
    
          let json = await Api.getConfig(apiToken);
          setConfig(json);
    
      }
      getConfig();
      
  }, []);

    
    // 4242 4242 4242 4242
  // 4000 0000 0000 0002
  const onCheckout = async () => {
    setIsLoading(true);
    const response = await Api.createPaymentIntent(apiToken,total);
    let pi = null;
    if(response.status===200){
        setIsLoading(false);
        let json = await response.json();
        pi = json.paymentIntent;
        const paymentSheetResponse = await initPaymentSheet({merchantDisplayName: 'Delivroo App',paymentIntentClientSecret: json.paymentIntent,style: "alwaysLight"});
        
        if (paymentSheetResponse.error) {
             alert('Falha ao iniciar transação. Tente novamente.');
             return;
         }
        const paymentResponse = await presentPaymentSheet();
        
        if (paymentResponse.error) {
           alert(`Error code: ${paymentResponse.error.code}`,paymentResponse.error.message);
           return;
        }
    } else {
       setIsLoading(false);
       alert('Falha ao iniciar transação.');
       return;
    } 
    setIsLoading(true);
    
    const orderResponse = await Api.addOrder(apiToken,orcamento.id,proposta.id,pi);
    setIsLoading(false);
    
    if(orderResponse.status===201){
      navigation.navigate('Sucesso2');
    } else {
      alert('Falha ao registrar order !');
    } 
    
    
    
  }





    const calculaTotal = () => {
         let taxa =  proposta.valor * taxaPercentual;
         let total = (proposta.valor*1) + taxa;
         return total.toFixed(2);
    }

  return (
    
        <View style={styles.container}>
          <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
          <Header title={'Checkout'} onPress={()=>navigation.goBack()} /> 
          <View style={styles.body}>
              <Text style={styles.title}>Detalhes da Transação</Text>
              <HeightSpacer h={30}/>
              <Text style={styles.descricao}>Contratação do profissional <Text style={styles.destaque}>{proposta.user.name}</Text> para a execução do serviço descrito no orçamento:  <Text style={styles.destaque}>{orcamento.titulo}</Text>.</Text>
              <HeightSpacer h={30}/>
              <Text style={styles.text}>Valor do serviço: € {proposta.valor}</Text>
              <HeightSpacer h={5}/>
              <Text style={styles.text}>IVA: € {iva.toFixed(2)}</Text>
              <HeightSpacer h={5}/>
              <Text style={styles.text}>Taxa de utilização: € {taxaUso.toFixed(2)}</Text>
              <HeightSpacer h={5}/>
              <Text style={styles.text}>Total a pagar: € {total.toFixed(2)}</Text>
              
          </View> 
          <TouchableOpacity onPress={onCheckout} style={styles.button}>
                  {!isLoading?<Text style={styles.buttonText}>SEGUIR PARA O PAGAMENTO</Text>:<ActivityIndicator size="large" color="#fff"/>}
          </TouchableOpacity> 
          
        </View>
    
  )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
       },
       body: {
         width: '95%',
         backgroundColor: cores.branco,
         margin: 10,
         borderRadius:5,
         padding: 10,
         shadowColor: '#000',
         shadowOffset: { width:0, height:3,},
         shadowOpacity: 0.17,
         shadowRadius:3.05,
         elevation:2,
       },
       title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
       },
       descricao: {
          fontSize: 15,
          textAlign:'justify',
       },
       text:{
        fontSize: 15,
        textAlign: 'right',
        fontWeight: 'bold',
       },
       destaque:{
        fontWeight: 'bold',
        color: cores.azulEscuro,
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