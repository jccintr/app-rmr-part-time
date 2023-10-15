import React from 'react'
import { StyleSheet, View,TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';

import { cores } from '../../style/globalStyle';



const Icone = ({iconName,iconProvider}) => {
    
    //return <AntDesign name={icon} size={22} color="#c1c1c1" />

    switch (iconProvider) {
        case 'AntDesign':
            return <AntDesign name={iconName} size={22} color={cores.azulEscuro} />;
            break;
        case 'FontAwesome':
            return <FontAwesome name={iconName} size={22} color={cores.azulEscuro} />;
             break;
       
        default:
          console.log(`icone não encontrado`);
      }
      



}


const InputField = ( {iconProvider,iconName,placeholder, value, onChangeText, password,keyboard} ) => {
  return (
    <View style={styles.inputArea}>
      <Icone iconName={iconName} iconProvider={iconProvider}/>
     <TextInput style={styles.input}
         placeholder={placeholder}
         value={value}
         onChangeText={onChangeText}
         secureTextEntry={password}
         keyboardType={keyboard}
         placeholderTextColor={cores.azulEscuro}
       />
    </View>
  )
}

export default InputField


const styles = StyleSheet.create({
    inputArea: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderColor: cores.azulEscuro,
        borderWidth: 1,
        paddingLeft: 15,
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10,
    },
     input: {
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 4,
      color: '#000',
      marginLeft: 10,
      color: cores.azulEscuro,
    },
   
  });