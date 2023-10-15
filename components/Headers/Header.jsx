import React from 'react';
import { StyleSheet,View,TouchableOpacity,Text} from 'react-native';
import { cores } from '../../style/globalStyle';
import { Ionicons } from '@expo/vector-icons';


const Header = ({title,onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>onPress()}>
                    <Ionicons name="arrow-back-outline" size={24} color={cores.azulEscuro} />
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
      )
}

export default Header


const styles = StyleSheet.create({
    container: {
      backgroundColor: cores.azulClaro,
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 50,
      width: '100%',
      flexDirection:'row',
      paddingHorizontal: 10,
      },
    title: {
        marginLeft: 5,
        color: cores.azulEscuro,
        fontSize:18,
        fontWeight: 'bold'
    },
    
    
  });
  