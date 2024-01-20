import React from 'react'
import { StyleSheet, View,Text,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';


const Icone = ({iconName,iconProvider}) => {

  
    switch (iconProvider) {
        case 'AntDesign':
            return <AntDesign name={iconName} size={22} color={cores.azulEscuro} />;
            break;
        case 'FontAwesome':
            return <FontAwesome name={iconName} size={22} color={cores.azulEscuro} />;
             break;
        case 'MaterialIcons':
            return <MaterialIcons name={iconName} size={22} color={cores.azulEscuro} />;
             break;
        case 'Entypo':
            return <Entypo name={iconName} size={22} color={cores.azulEscuro} />;
            break;
       case 'Octicons':
             return <Octicons name={iconName} size={22} color={cores.azulEscuro} />;
             break;
       case 'FontAwesome5':
             return <FontAwesome5 name={iconName} size={22} color={cores.azulEscuro} />;
             break;
        default:
          console.log(`icone não encontrado`);
      }




}



const MenuPerfil = ({iconProvider,iconName,label,onPress}) => {
  return (
    <TouchableOpacity style={styles.menuArea} onPress={onPress}>
      <Icone iconName={iconName} iconProvider={iconProvider}/>
      <Text style={styles.labelText}>{label}</Text>
      <Entypo name="chevron-small-right" size={24} color={cores.azulEscuro} />
    </TouchableOpacity>
  )
}

export default MenuPerfil


const styles = StyleSheet.create({

    menuArea:{
       width: '90%',
       height: 50,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
    },
   labelText:{
      fontSize: 16,
      color: cores.azulEscuro
   }



  });
