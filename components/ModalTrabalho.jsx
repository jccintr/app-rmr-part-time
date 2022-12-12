import React, { useState,useEffect } from 'react'
import { StyleSheet, Text,TouchableOpacity, Modal,View} from 'react-native';
import { cores } from '../style/globalStyle';
import { AntDesign } from '@expo/vector-icons';

const ModalItem = ({subTitle,valor}) => {
    return (
    <View style={styles.modalItemArea}>    
        <Text style={styles.subTitleText}>{subTitle}</Text>
        <View style={styles.valueArea}>
            <Text style={styles.descriptionText}>{valor}</Text>
        </View>
    </View>
    )
}

const ModalTrabalho = ({modalVisible,setModalVisible,trabalho}) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
        <View style={styles.container}>
             <View style={styles.header}>
                 <Text style={styles.titleText}>Detalhes do Trabalho</Text>
                 <TouchableOpacity onPress={()=>setModalVisible(false)}>
                    <AntDesign name="close" size={26} color="black" />
                 </TouchableOpacity>
              </View>
              <View style={styles.body}>
                  <ModalItem subTitle='Solicitante:' valor={trabalho.cliente.name}/>
                  <ModalItem subTitle='Data da execução do trabalho:' valor={trabalho.data_servico}/>
                  <ModalItem subTitle='Descrição do trabalho:' valor={trabalho.descricao}/>
                  <ModalItem subTitle='Local do Trabalho:' valor={trabalho.local}/>
                  <ModalItem subTitle='Você receberá:' valor={trabalho.total_profissional/100}/>
                 
                

              </View>
              
        </View>
    </Modal>
  )
}

export default ModalTrabalho

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent:'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop: 20,
        paddingBottom: 20,
        
    },
    header:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 5,
      marginBottom: 10,
    },
    titleText:{
       fontSize: 20,
       color: cores.amarelo,
       fontWeight: 'bold',
      
    },
    body:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 5,
    },
    modalItemArea:{
      flexDirection: 'column',
      alignItems: 'flex-start',  
      marginBottom: 10,
      width: '100%',
    },
    subTitleText:{
        
        fontSize: 16,
        width:'100%',
        textAlign: 'left',
    },
    valueArea: {
        backgroundColor: cores.cinzaClaro,
        width:'100%',
        borderRadius:15,
        padding:10
    }, 
    descriptionText:{
        fontSize: 14,
    } ,  
    button:{
        width: '100%',
        height: 50,
        backgroundColor: cores.amarelo,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        marginTop: 20,
      
      },
      buttonText:{
        color: '#fff',
        fontSize: 16,
     
        fontWeight: 'bold',
      },
   
   
  
    
  }); 