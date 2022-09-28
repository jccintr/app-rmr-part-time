import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, Image,View,TouchableOpacity} from 'react-native';
import { cores } from '../style/globalStyle';

const ServiceCard = ({servico}) => {
  return (
    <TouchableOpacity style={styles.serviceCard}  key={servico.id}>
                 <Image style={styles.serviceImage} source={{uri: servico.Imagem.url,}}/>
                <Text style={styles.serviceName}>{servico.Nome}</Text>
                <View style={styles.priceArea}>
                <Text style={styles.serviceTitle}>A partir de </Text>
                <Text style={styles.servicePrice}>€ {servico.Valor_Cliente}</Text>
                </View>
               
         </TouchableOpacity>
  )
}

export default ServiceCard



const styles = StyleSheet.create({
   
    serviceCard:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderRadius:10,
        width: 160,
        height: 140,
        
        minWidth: 160,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'flex-start',
        margin: 5,
        borderWidth: 1,
        borderColor: '#c1c1c1',
       
      
  
      },
      serviceImage:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
         width: '100%',
         height: 100
      },
      serviceName:{
        fontWeight: 'bold',
        fontSize: 12,
        width: '100%',
        textAlign: 'left',
        paddingHorizontal: 5,
      },
      priceArea:{
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 5,
      },
      serviceTitle:{
        fontSize: 12,
      },
      servicePrice:{
        color: cores.amarelo,
        fontWeight: 'bold',
        fontSize: 12,
       
      },

   
   
    
  });