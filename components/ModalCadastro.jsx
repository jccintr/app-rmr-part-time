import React, { useState,useEffect } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity, Modal,View, TextInput} from 'react-native';
import { cores } from '../style/globalStyle';
import InputField2 from '../components/InputField2';
import Api from '../Api';


const ModalCadastro = ({modalVisible,setModalVisible,user,token}) => {
   const [documento,setDocumento] = useState('');
   const [endereco,setEndereco] = useState('');
   const [bairro,setBairro] = useState('');
   const [cidade,setCidade] = useState('');


   useEffect(()=>{
    console.log(user);
    setDocumento(user.documento);
    setBairro(user.bairro);
    setCidade(user.cidade);
    setEndereco(user.endereco);
}, []);

const onSalvar = async () => {

    let json = Api.updateUser(user.id,documento,endereco,bairro,cidade,token)
    setModalVisible(false);
  
}



  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
            <View style={styles.Box}>
                 <View style={styles.BoxBody}>
                       <TouchableOpacity onPress={()=>setModalVisible(false)}>
                           <View style={styles.closeButton}></View>
                      </TouchableOpacity>
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
                        <TouchableOpacity style={styles.button} onPress={onSalvar}>
                          <Text style={styles.buttonText}>SALVAR</Text>
                        </TouchableOpacity> 
                 </View>
            </View>
    </Modal>
  )
}

export default ModalCadastro


const styles = StyleSheet.create({
   
    Box:{
        width: '100%',
        height: '100%',
      
        justifyContent:'flex-end',
        alignItems: 'center',
      
        
    },
    BoxBody:{
        width: '100%',
        height: 500,
        backgroundColor: '#fff',
       
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',   
        borderTopColor: '#c1c1c1',
        borderTopWidth: 1,
      
    },
  
    closeButton:{
        width: 100,
        height: 3,
        backgroundColor: '#c1c1c1',
        borderRadius: 10,
        marginBottom: 10,
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