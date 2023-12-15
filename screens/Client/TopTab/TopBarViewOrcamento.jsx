import { StyleSheet, Text, View,ScrollView,Dimensions,Image } from 'react-native';
import React, {useContext} from 'react';
import DataContext from '../../context/DataContext';
import { cores } from '../../../style/globalStyle';
import HeightSpacer from '../../../components/reusable/HeightSpacer';
import Api from '../../../Api';

const formataData = (data) => {
   
  const arrData = data.split("-");
  return arrData[2]+'-'+arrData[1] + '-'+arrData[0];

}


const TopBarViewOrcamento = () => {
  const {orcamento} = useContext(DataContext);
  return (
    <View style={styles.container}>
      <ScrollView style={{width: Dimensions.get('window').width}} contentContainerStyle={{alignItems:'center',padding:5,}} showsVerticalScrollIndicator={false}>
         <View style={styles.item}>
                <View style={styles.dataArea}>
                    <Text style={styles.text}>Publicado em <Text style={styles.boldText}>{formataData(orcamento.created_at.substring(0,10))}</Text> na categoria <Text style={styles.boldText}>{orcamento.categoria.nome}</Text></Text>
                </View>
          </View>
          <View style={styles.item}>
                <View style={[styles.dataArea,{flexDirection:'column',alignItems:'flex-start'}]}>
                    <Text style={styles.boldText}>{orcamento.titulo}</Text>
                    <HeightSpacer h={10}/>
                    <Text style={{textAlign:'justify'}}>{orcamento.descricao}</Text>
                </View>
          </View>
          <Text style={{color:cores.azulEscuro,fontSize:18,fontWeight:'bold'}}>Localidade</Text>
          <View style={styles.item}>
                <View style={[styles.dataArea,{flexDirection:'column',alignItems:'flex-start'}]}>
                    <Text style={{textAlign:'justify'}}>{orcamento.logradouro},{orcamento.numero}</Text>
                    <Text style={{textAlign:'justify'}}>{orcamento.distrito.nome}</Text>
                    <Text style={{textAlign:'justify'}}>{orcamento.concelho.nome}</Text>
                </View>
          </View>
          {orcamento.imagem&&<>
          <Text style={{color:cores.azulEscuro,fontSize:18,fontWeight:'bold'}}>Imagem</Text>
          <HeightSpacer h={10} />
          <Image style={styles.imagem} source={{uri:`${Api.base_storage}/${orcamento.imagem}`,} }/></>}
      </ScrollView>
     
    </View>
  )
}

export default TopBarViewOrcamento

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.whiteSmoke,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
   },

  item:{
    marginTop: 10,
    marginBottom: 10,
    width: '95%',
    padding: 10,
    borderRadius:12,
    backgroundColor: cores.branco,
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
},
dataArea:{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderBottomColor: 'lightgray',
},
text: {
  fontSize: 14,
},
boldText: {
   fontWeight: 'bold',
   color: cores.azulEscuro,
   fontSize: 14,
},
imagem: {
  width: 300,
  height: 200,
  borderRadius:15,
  
}

})