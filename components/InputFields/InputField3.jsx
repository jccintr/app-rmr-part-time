import React from 'react'
import { StyleSheet, View,TextInput,Text} from 'react-native';
import { cores } from '../../style/globalStyle';





const InputField3 = ( {label,placeholder, value, onChangeText, password,keyboard,editable} ) => {
  return (
    <>   
    <Text style={styles.labelText}>{label}</Text> 
    <View style={styles.inputArea}>
      
     <TextInput style={styles.input}
         placeholder={placeholder}
         value={value}
         onChangeText={onChangeText}
         secureTextEntry={password}
         keyboardType={keyboard}
         editable={editable}
         placeholderTextColor={'#d1d1d1'}
       />
    </View>
    </>

  )
}

export default InputField3


const styles = StyleSheet.create({
    inputArea: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      borderColor: cores.azulEscuro,
      borderWidth: 1,
      paddingLeft: 10,
      alignItems: 'center',
      marginBottom: 15,
      borderRadius: 10,
    },
    
    input: {
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 4,
      color: cores.azulEscuro,
      height: 48,
      
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