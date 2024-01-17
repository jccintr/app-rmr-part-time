import { StyleSheet, SafeAreaView,StatusBar,View,Text,FlatList } from 'react-native';
import React, {useContext,useState, useEffect} from 'react';
import { cores } from '../../style/globalStyle';
import EmptyList from '../../components/reusable/EmptyList';
import Separator from '../../components/reusable/Separator';
import DataContext from '../context/DataContext';
import { useNavigation } from '@react-navigation/native'; 
import HeaderOrcamentos from '../../components/Headers/HeaderOrcamentos';
import { useFocusEffect } from '@react-navigation/native';
import CardProposta2 from '../../components/Cards/CardProposta2';
import Api from '../../Api';

const Propostas = () => {
    const {loggedUser,apiToken,setOrcamento} = useContext(DataContext);
    const navigation = useNavigation();
    const [propostas,setPropostas] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        if (loggedUser)
           getPropostas();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
             StatusBar.setBackgroundColor(cores.azulClaro); //add color code
        }, []),
      );

    const getPropostas = async () => {
         setIsLoading(true);
         let json = await Api.getPropostas(apiToken);
         setPropostas(json);
         setIsLoading(false);
        }
    
    const onRefresh = async () => {
        getPropostas();
    }

    const onDelete = async (id) => {
       //alert('deletar a proposta '+ id);
       let response = await Api.deleteProposta(apiToken,id);
       if (response.status===200){
          getPropostas();
       }
    }

  return (
    <SafeAreaView style={styles.container}>
            
    <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
    <HeaderOrcamentos title={'Minhas Propostas'} onRefresh={onRefresh} isLoading={isLoading}/>
    <View style={styles.body}>
    {!isLoading&&<FlatList 
                showsVerticalScrollIndicator={false}
                style={styles.flatlist}
                data={propostas}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item})=><CardProposta2 status={0} proposta={item} onDelete={onDelete}/>}
                ItemSeparatorComponent={Separator}
                ListEmptyComponent={<EmptyList mensagem={'Você ainda não enviou propostas'}/>}
                contentContainerStyle={propostas.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
           />} 
    </View>
    
</SafeAreaView>

  )
}

export default Propostas

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.branco,
        alignItems: 'center',
        justifyContent: 'flex-start',
        
       },
    body:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingTop:5,
    },
    flatlist: {
        width: '100%',
    }

})
