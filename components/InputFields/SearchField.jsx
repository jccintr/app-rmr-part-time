import { StyleSheet, View,TextInput,TouchableOpacity} from 'react-native';
import { FontAwesome,AntDesign } from '@expo/vector-icons';
import React from 'react'
import { cores } from '../../style/globalStyle';

const SearchField = ({placeholder, value,setValue,onChangeText} ) => {
  return (
    <View style={styles.inputArea}>
      <FontAwesome name="search" size={22} color={cores.iconeSearchField} />
     <TextInput style={styles.input}
         placeholder={placeholder}
         value={value}
         onChangeText={onChangeText}
         placeholderTextColor="#c1c1c1" 
       />
       {value.length>0&&<TouchableOpacity onPress={()=>setValue('')}><AntDesign name="closecircleo" size={18} color={cores.iconeSearchField} /></TouchableOpacity>}
    </View>
  )
}

export default SearchField

const styles = StyleSheet.create({
    inputArea: {
        
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 15,
        backgroundColor: cores.fundoSearchfield,
        marginHorizontal: 10,
        
    },
    
    input: {
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 4,
      color: '#000',
      marginLeft: 10,
      
    },

})