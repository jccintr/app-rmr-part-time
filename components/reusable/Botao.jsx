import { StyleSheet,TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { cores } from '../../style/globalStyle';

const Botao = ({onPress,text,textSize,textColor,width,backgroundColor,borderWidth,borderColor,borderRadius}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button(width,backgroundColor,borderWidth,borderColor,borderRadius)}>
        <Text style={styles.text(textColor,textSize)}>{text}</Text>
    </TouchableOpacity>
      
  )
}

export default Botao

const styles = StyleSheet.create({
    text: (textColor,textSize) => ({
      //  fontFamily: 'medium',
        fontSize: textSize,
        color: textColor,
        fontWeight:'bold',
    }),
    button: (width,backgroundColor,borderWidth,borderColor,borderRadius)=>({
        width: width,
        backgroundColor: backgroundColor,
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
    })
})