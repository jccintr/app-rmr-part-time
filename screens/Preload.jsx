import { StyleSheet, Image, SafeAreaView,ActivityIndicator,TouchableOpacity } from 'react-native';
import logo from '../assets/logo-rmr.png';
import { useNavigation } from '@react-navigation/native';

const Preload = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} >
                <Image source={logo} style={styles.imagelogo}/>
            </TouchableOpacity>
            <ActivityIndicator size="large" color="#000"/>
        </SafeAreaView>
       )
}

export default Preload

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        
    },
    imagelogo:{
        height: 200,
        width: 200,
    },
    
  });