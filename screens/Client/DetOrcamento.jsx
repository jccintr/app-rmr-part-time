import { StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { cores } from '../../style/globalStyle';
import Header from '../../components/Headers/Header';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopBarViewOrcamento from './TopTab/TopBarViewOrcamento';
import TopBarPropostas from './TopTab/TopBarPropostas';
import { useNavigation } from '@react-navigation/native'; 

const Tab = createMaterialTopTabNavigator();



const DetOrcamento = () => {
  const navigation = useNavigation();

  return (
            <>
             <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
            <Header title={'Orçamento'} onPress={()=>navigation.goBack()} />
            <Tab.Navigator>
                <Tab.Screen name='Detalhes' component={TopBarViewOrcamento}/>
                <Tab.Screen name='Propostas' component={TopBarPropostas}/>
            </Tab.Navigator>
            </>
            
            
      
  )
}

export default DetOrcamento

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.branco,
        alignItems: 'center',
        justifyContent: 'flex-start',
        
       },
})