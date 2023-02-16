import React from 'react'
import { StyleSheet, View,TextInput,Text} from 'react-native';

const InputArea = ( {label,placeholder, value, onChangeText, password,keyboard,linhas} ) => {
  return (
    <>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.inputArea}>
          <TextInput style={styles.input}
             multiline
             numberOfLines={linhas}
             placeholder={placeholder}
             value={value}
             onChangeText={onChangeText}
             secureTextEntry={password}
             keyboardType={keyboard}
           />
      </View>
    </>

  )
}

export default InputArea


const styles = StyleSheet.create({
    inputArea: {
      width: '100%',
      height: 80,
      flexDirection: 'row',
      borderColor: '#c1c1c1',
      borderWidth: 1,
      paddingLeft: 10,
      alignItems: 'center',
      marginBottom: 15,
    },
    input: {
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 4,
      color: '#c1c1c1',
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
