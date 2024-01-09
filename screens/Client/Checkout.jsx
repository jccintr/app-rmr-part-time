import { StyleSheet, Text, View,StatusBar,TouchableOpacity } from 'react-native';
import React, {useContext} from 'react';
import Header from '../../components/Headers/Header';
import { useNavigation } from '@react-navigation/native'; 
import { cores } from '../../style/globalStyle';
import DataContext from '../context/DataContext';
import HeightSpacer from '../../components/reusable/HeightSpacer';

const Checkout = ({route}) => {
    const navigation = useNavigation();
    const {orcamento} = useContext(DataContext);
    const {proposta} = route.params;  
    const taxaPercentual = 0.05;

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
           <Text style={styles.text}>Taxa de utilização: € {(proposta.valor*taxaPercentual).toFixed(2)}</Text>
           <HeightSpacer h={5}/>
           <Text style={styles.text}>Total a pagar: € {calculaTotal()}</Text>
          
      </View> 
      <TouchableOpacity onPress={()=>{}} style={styles.button}>
               <Text style={styles.buttonText}>SEGUIR PARA O PAGAMENTO</Text>
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