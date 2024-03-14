import { Text } from 'react-native';
import React from 'react';
import { cores } from '../../style/globalStyle';

const EmptyList = ({mensagem}) => {
    return <Text style={{color: cores.azulEscuro, fontWeight:'600'}}>{mensagem}</Text>
}

export default EmptyList
