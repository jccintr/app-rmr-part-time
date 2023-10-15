import { StyleSheet, SafeAreaView,StatusBar,View,TouchableOpacity,Text,FlatList } from 'react-native'
import React, {useContext,useState, useEffect} from 'react'
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native'; 
import DataContext from '../context/DataContext';
import Api from '../../Api';
import HeaderOrcamentos from '../../components/Headers/HeaderOrcamentos';
import CardOrcamento from '../../components/Cards/CardOrcamento';

/*
const Card = ({item}) => {

    return (
        <View style={{flexDirection:'column',marginVertical:2}}>
            <Text style={{fontWeight:'bold',fontSize:14}}>{formataData(item.created_at.substring(0,10))}</Text>
            <Text style={{fontSize:16,color:cores.azulEscuro,fontWeight:'bold'}}>{item.categoria.nome}</Text>
            <Text>{item.descricao.lengh>50?item.descricao.substring(0,50)+'...':item.descricao}</Text>
            <Text>Propostas: 5</Text>
        </View>
    )
}
*/

const Separator = () => (
    <View
      style={{
        backgroundColor: cores.azulEscuro,
        height: 0.5,
      }}
    />
  );

  const EmptyList = () => {
    return <Text style={{color: cores.azulEscuro}}>Você ainda não tem orçamentos.</Text>
  }  

const Orcamentos = () => {
    const {loggedUser,apiToken} = useContext(DataContext);
    const navigation = useNavigation();
    const [orcamentos,setOrcamentos] = useState([]);
    const [isLoading,setIsLoading] = useState(false);


    
    useEffect(()=>{
       if(!loggedUser){
        navigation.reset({routes:[{name:'Login'}]});
       }
    },[])

    useEffect(()=>{
        if (loggedUser)
           getOrcamentos();
    }, []);

    const getOrcamentos = async () => {
        setIsLoading(true);
        let json = await Api.getOrcamentos(apiToken);
        setOrcamentos(json);
        setIsLoading(false);
        }
    
    const onRefresh = async () => {

          getOrcamentos();
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated={true} backgroundColor={cores.azulClaro} barStyle="dark-content"/>
            <HeaderOrcamentos title={'Meus Orçamentos'} onRefresh={onRefresh} isLoading={isLoading}/>
            <View style={styles.body}>
            {!isLoading&&<FlatList 
                        showsVerticalScrollIndicator={false}
                        style={styles.flatlist}
                        data={orcamentos}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item})=><CardOrcamento item={item}/>}
                        ItemSeparatorComponent={Separator}
                        ListEmptyComponent={<EmptyList/>}
                        contentContainerStyle={orcamentos.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
                   />} 
            </View>
            
        </SafeAreaView>
      )
}

export default Orcamentos

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
