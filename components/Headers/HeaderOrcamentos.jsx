import React from 'react';
import { StyleSheet,View,TouchableOpacity,Text,ActivityIndicator} from 'react-native';
import { cores } from '../../style/globalStyle';
import { Feather } from '@expo/vector-icons';


const HeaderOrcamentos = ({title,onRefresh,isLoading}) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity onPress={onRefresh}>
              {isLoading?<ActivityIndicator  size="small" color={cores.azulEscuro}/>:<Feather name="refresh-ccw" size={24} color={cores.azulEscuro} />}
            </TouchableOpacity>
        </View>
      )
}

export default HeaderOrcamentos


const styles = StyleSheet.create({
    container: {
      backgroundColor: cores.azulClaro,
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
      width: '100%',
      flexDirection:'row',
      paddingHorizontal: 20,
      },
    title: {
        marginLeft: 5,
        color: cores.azulEscuro,
        fontSize:18,
        fontWeight: 'bold'
    },
    
    
  });
  