import React from 'react'
import { StyleSheet, View,TextInput,Text} from 'react-native';
import { cores } from '../../style/globalStyle';


const InputArea = ( {label,placeholder, value, onChangeText,linhas} ) => {
  const altura = 20 * linhas;
  return (
    <>
      <Text style={styles.labelText}>{label}</Text>
      <View style={[styles.inputArea,{height: 160}]}>
          <TextInput style={styles.input}
             multiline
             numberOfLines={linhas}
             placeholder={placeholder}
             value={value}
             onChangeText={onChangeText}
             keyboardType="default"
             placeholderTextColor={'#b1b1b1'}
           />
      </View>
    </>

  )
}

export default InputArea


const styles = StyleSheet.create({
    inputArea: {
      width: '100%',
      padding:5,
      flexDirection: 'row',
      borderColor: cores.azulEscuro,
      borderRadius: 10,
      borderWidth: 1,
      alignItems: 'flex-start',
      marginBottom: 15,
      
    },
    input: {
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 4,
      color: '#c1c1c1',
      textAlignVertical: 'top',
      justifyContent: 'flex-start',
      color: cores.azulEscuro,
  },
    labelText:{
      paddingHorizontal: 4,
      width: '100%',
      textAlign:'left',
      marginBottom: 5,
      fontSize: 14,
      color: cores.azulEscuro,
    }

  });
