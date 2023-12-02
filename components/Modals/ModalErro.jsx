import React from 'react'
import { StyleSheet, Text,Modal,View} from 'react-native';
import Botao from '../reusable/Botao';
import { cores } from '../../style/globalStyle';
import HeightSpacer from '../reusable/HeightSpacer';

const ModalErro = ({visible,setVisible,mensagem}) => {
  return (
    <Modal visible={visible} animationType="none" statusBarTranslucent={true} transparent={true} onRequestClose={()=>setVisible(false)}>
        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Atenção</Text>
                <HeightSpacer h={20} />
                <Text style={styles.mensagem}>{mensagem}</Text>
                <HeightSpacer h={20} />
                <Botao backgroundColor={cores.azulEscuro} text={'FECHAR'} borderRadius={10} width={'100%'} textColor={'#fff'} onPress={()=>setVisible(false)}/>
            </View>
        </View>
     </Modal>
  )
}

export default ModalErro

const styles = StyleSheet.create({
    modalBackground:{
       flex:1,
       backgroundColor: 'rgba(0,0,0,0.1)',
       justifyContent: 'center',
       alignItems:'center',
    },
    modalContainer:{
        width: '90%',
        backgroundColor:'#fff',
        paddingHorizontal:20,
        paddingVertical:20,
        borderRadius:15,
        elevation:20,
    },
    title:{
       fontSize: 18,
       color: cores.vermelho,
       fontWeight:'bold',
       width: '100%',
       textAlign: 'center',
    },
    mensagem:{
        width: '100%',
        textAlign: 'center',
        fontSize:14,
        
    }
})