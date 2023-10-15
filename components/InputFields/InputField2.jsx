import React from 'react'
import { StyleSheet, View,TextInput,Text} from 'react-native';





const InputField2 = ( {label,placeholder, value, onChangeText, password,keyboard,editable} ) => {
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
         placeholderTextColor="#c1c1c1" 
       />
    </View>
    </>

  )
}

export default InputField2


const styles = StyleSheet.create({
    inputArea: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      borderColor: '#c1c1c1',
      borderWidth: 1,
      paddingLeft: 10,
      alignItems: 'center',
      marginBottom: 15,
      borderRadius: 5,
    },
    
    input: {
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 4,
      color: '#000',
    },
    labelText:{
        paddingHorizontal: 4,
        width: '100%',
        textAlign:'left',
        marginBottom: 5,
        fontSize: 16,
        color: '#010101',
    }
   
  });