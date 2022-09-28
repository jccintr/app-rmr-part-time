import { StyleSheet, Text, SafeAreaView } from 'react-native';

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
             <Text>Home do Profissional</Text>
        </SafeAreaView>
       )
}

export default Home


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