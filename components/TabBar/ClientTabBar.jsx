import React from 'react'
import { StyleSheet, Text,TouchableOpacity,View} from 'react-native';
import { Entypo,FontAwesome,AntDesign} from '@expo/vector-icons'; 
import { cores } from '../../style/globalStyle';

const ClientTabBar = ({state,navigation}) => {

  const goTo = (screenName) => {
    navigation.navigate(screenName);
}

  return (
    <View style={styles.TabArea}>

            <TouchableOpacity style={styles.TabItem} onPress={()=>goTo('Home')}>
              <Entypo style={{color:state.index === 0 ? cores.azulEscuro:cores.menuItem}} name="home" size={24}  />
              <Text style={state.index === 0 ? styles.TabItemTextSelected:styles.TabItemText}>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.TabItem} onPress={()=>goTo('Orcamentos')}>
              <AntDesign style={{color:state.index === 1 ? cores.azulEscuro:cores.menuItem}} name="shoppingcart" size={24}  />
              <Text style={state.index === 1 ? styles.TabItemTextSelected:styles.TabItemText}>Orçamentos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.TabItem} onPress={()=>goTo('Profile')}>
              <FontAwesome style={{color:state.index === 2 ? cores.azulEscuro:cores.menuItem}} name="user-circle-o" size={24}  />
              <Text style={state.index === 2 ? styles.TabItemTextSelected:styles.TabItemText}>Perfil</Text>
            </TouchableOpacity>
    </View>
  )
}

export default ClientTabBar


const styles = StyleSheet.create({
    
    TabArea:{
        height: 60,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: cores.menuItem,

    },
    TabItem:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TabItemText:{
      marginTop: 5,
      color: cores.menuItem
    },
    TabItemTextSelected:{
      marginTop: 5,
      color: cores.azulEscuro
    },
   
    AvatarIcon:{
        width: 24,
        height: 24,
        borderRadius: 12,
    },
   
    
  });