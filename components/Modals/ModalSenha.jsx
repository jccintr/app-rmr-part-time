import React from 'react'
import { StyleSheet, Text,TouchableOpacity, Modal,View,ActivityIndicator,StatusBar} from 'react-native';
import { cores } from '../../style/globalStyle';
import InputField2 from '../InputFields/InputField2';
import { AntDesign } from '@expo/vector-icons';


const ModalSenha = ({isLoading,modalVisible,setModalVisible,novaSenha,setNovaSenha,confirmeNovaSenha,setConfirmeNovaSenha,updateSenha}) => {

   
  return (
    <Modal  visible={modalVisible} animationType="slide" transparent={false} onRequestClose={()=>setModalVisible(false)}>
          <View style={styles.container}>
          <StatusBar
                animated={true}
                backgroundColor={cores.branco}
                barStyle="dark-content"
            />
              <View style={styles.header}>
                 <Text style={styles.titleText}>Alteração de Senha</Text>
                 <TouchableOpacity onPress={()=>setModalVisible(false)}>
                    <AntDesign name="close" size={26} color="black" />
                 </TouchableOpacity>
              </View>
             
              <View style={styles.body}>
                    <View style={styles.inputArea}>
                            <InputField2 
                            label="Nova senha:"
                            placeholder="Informe a sua nova senha"
                            password={true}
                            keyboard="default"
                            value={novaSenha}
                            onChangeText={t=>setNovaSenha(t)}
                            />
                    </View>
                    <View style={styles.inputArea}>
                            <InputField2 
                            label="Confirme a nova senha:"
                            placeholder="Confirme a sua nova senha"
                            password={true}
                            keyboard="default"
                            value={confirmeNovaSenha}
                            onChangeText={t=>setConfirmeNovaSenha(t)}
                            />
                    </View>
                        <TouchableOpacity style={styles.button} onPress={updateSenha}>
                          {!isLoading?<Text style={styles.buttonText}>SALVAR</Text>:<ActivityIndicator style={styles.loading} size="large" color={cores.branco}/>}
                        </TouchableOpacity> 
              </View>
           </View>


          
    </Modal>
  
  )
}

export default ModalSenha

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
      marginTop:5,
      marginBottom: 10,
    },
    titleText:{
       fontSize: 20,
       color: cores.azulEscuro,
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
    inputArea:{

    },
       
    button:{
        width: '100%',
        height: 50,
        backgroundColor: cores.azulEscuro,
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