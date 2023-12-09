import { View } from 'react-native';
import React from 'react';
import { cores } from '../../style/globalStyle';

const Separator = () => {
  return (
    <View
    style={{
      backgroundColor: cores.azulEscuro,
      height: 0.5,
    }}
  />
  )
}

export default Separator
