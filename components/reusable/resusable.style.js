import { StyleSheet } from "react-native";

const reusable = StyleSheet.create({
   
  
   rowWithSpace:(justifyContent)=>({
     flexDirection:'row',
     alignItems:'center',
     justifyContent:justifyContent,
   })

})

export default reusable;