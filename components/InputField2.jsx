import React from 'react'
import { StyleSheet, View,TextInput,Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';




const Icone = ({iconName,iconProvider}) => {
    
    //return <AntDesign name={icon} size={22} color="#c1c1c1" />

    switch (iconProvider) {
        case 'AntDesign':
            return <AntDesign name={iconName} size={22} color="#c1c1c1" />;
            break;
        case 'FontAwesome':
            return <FontAwesome name={iconName} size={22} color="#c1c1c1" />;
             break;
       
        default:
          console.log(`icone não encontrado`);
      }
      



}


const InputField2 = ( {label,placeholder, value, onChangeText, password,keyboard} ) => {
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
        borderRadius: 15,
        
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