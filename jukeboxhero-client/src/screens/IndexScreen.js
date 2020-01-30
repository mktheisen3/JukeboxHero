import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';

const IndexScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.containerStyle} forceInset={{ top: 'always' }}>
            <Text style={styles.titleStyle} >Jukebox Hero</Text>
            <TouchableOpacity 
                onPress={() => navigation.navigate('CreateRoom')}
                style={styles.buttonStyle} >
                    <Text style={styles.textStyle}>Host</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('JoinRoom')}
                style={styles.buttonStyle} >
                    <Text style={styles.textStyle}>Join</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

};

IndexScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#181818',
        justifyContent: 'center',
        paddingBottom: 100
    },
    titleStyle: {
        fontSize: 38,
        padding: 14,
        color: '#228B22',
        textAlign: 'center'
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        fontSize: 20,
        marginBottom: 15,
        marginHorizontal: 100
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        marginVertical: 17
    }
});

export default IndexScreen;