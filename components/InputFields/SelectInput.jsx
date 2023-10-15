import { StyleSheet, Text, TouchableOpacity, View,Modal, SafeAreaView, FlatList } from 'react-native'
import React, {useState} from 'react';
import { Entypo } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';





const SelectInput = ({label,options,onChangeSelect}) => {
   const [title,setTitle] = useState(label);
   const [selected,setSelected] = useState(0);
   const [modalVisible,setModalVisible] = useState(false);


   const onChange = (item) => {
      onChangeSelect(item.id);
      setTitle(item.nome);
      setModalVisible(false);
      onChangeSelect(item);
      setSelected(item.id);
   }

   const SelectItem = ({item}) => {

    return (
        <TouchableOpacity style={[styles.selectItem,{backgroundColor:item.id===selected?'#eee':'#fff'}]} onPress={()=>onChange(item)}>
              <Text style={styles.selectItemText}>{item.nome}</Text>
              {item.id===selected&&<Entypo name="check" size={24} color="green" />}
        </TouchableOpacity>
       
    );
    
   }

  return (

      <>
            <TouchableOpacity style={styles.container} onPress={()=>setModalVisible(true)}>
                <Text style={styles.label} numberOfLines={1}>{title}</Text>
                <Entypo name="chevron-down" size={24} color={cores.azulEscuro} />
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" onRequestClose={()=>setModalVisible(false)}>
                <SafeAreaView style={{marginTop:5}}>
                    <View style={styles.header}>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>setModalVisible(false)}>
                           {/*<Entypo name="chevron-left" size={24} color="black" />*/}
                           <Text style={styles.modaltitle}>{label}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=>setModalVisible(false)}>
                           <Text style={styles.modalCancel}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                    data={options}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=><SelectItem item={item} />}
                    />
                </SafeAreaView>
            </Modal>
      </>
   );
}

export default SelectInput

const styles = StyleSheet.create({

container: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height:50,
    
    paddingHorizontal: 12,
    borderRadius:10,
    borderWidth:1,
    borderColor: cores.azulEscuro,
    marginBottom: 15,
},
label:{
   fontSize: 16, 
   color: cores.azulEscuro,
},
header:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:12,
    paddingBottom:12,
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
},
modaltitle:{
    fontSize: 18,
    color: '#555',
},
modalCancel:{
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
},
selectItem:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth:1,
    padding:10,
},
selectItemText:{
    fontSize: 16,
    color: '#555',
}
})