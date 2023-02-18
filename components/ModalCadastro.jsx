import React, { useState,useEffect } from 'react'
import { StyleSheet, Text,TouchableOpacity, Modal,View,ActivityIndicator} from 'react-native';
import { cores } from '../style/globalStyle';
import InputField2 from '../components/InputField2';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';



const ModalCadastro= ({isLoading,modalVisible,setModalVisible,userData,token,documento,setDocumento,endereco,setEndereco,bairro,setBairro,cidade,setCidade,updateCadastro}) => {
   


  return (
    <Modal  visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
          <View style={styles.container}>
              <View style={styles.header}>
                 <Text style={styles.titleText}>Meu Cadastro</Text>
                 <TouchableOpacity onPress={()=>setModalVisible(false)}>
                    <AntDesign name="close" size={26} color="black" />
                 </TouchableOpacity>
              </View>
              <View style={styles.body}>
                    <View style={styles.inputArea}>
                            <InputField2 
                            label="Documento de Identificação:"
                            placeholder="Digite o seu documento"
                            password={false}
                            keyboard="default"
                            value={documento}
                            onChangeText={t=>setDocumento(t)}
                            />
                            <InputField2 
                            label="Endereço:"
                            placeholder="Digite o seu endereço"
                            password={false}
                            keyboard="default"
                            value={endereco}
                            onChangeText={t=>setEndereco(t)}
                            />
                            <InputField2 
                            label="Bairro:"
                            placeholder="Digite o seu bairro"
                            password={false}
                            keyboard="default"
                            value={bairro}
                            onChangeText={t=>setBairro(t)}
                            />
                            <InputField2 
                            label="Cidade:"
                            placeholder="Digite a sua cidade"
                            password={false}
                            keyboard="default"
                            value={cidade}
                            onChangeText={t=>setCidade(t)}
                            />
                    </View>
                        <TouchableOpacity style={styles.button} onPress={updateCadastro}>
                          {!isLoading?<Text style={styles.buttonText}>SALVAR</Text>:<ActivityIndicator style={styles.loading} size="large" color={cores.branco}/>}
                        </TouchableOpacity> 
              </View>
           </View>


          
    </Modal>
  )
}

export default ModalCadastro


const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent:'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingTop: 10,
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
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 5,
    },
    inputArea:{

    },
       
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