import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-navigation';

const JoinRoomScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.containerStyle} forceInset={{ top: 'always' }}>
            <Text style={styles.titleStyle} >Join Room</Text>
            <TextInput 
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.inputStyle} 
                placeholderTextColor='#696969'
                placeholder="Enter Room Code" />
            <TouchableOpacity 
                onPress={() => navigation.navigate('NowPlaying')}
                style={styles.buttonStyle} >
                    <Text style={styles.textStyle}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Index')}
                style={styles.buttonStyle} >
                    <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

};

JoinRoomScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#181818',
        justifyContent: 'center',
        paddingBottom: 100
    },
    inputStyle: {
        marginHorizontal: 50,
        marginBottom: 40,
        height: 30,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        fontSize: 20,
        color: 'white'
    },
    titleStyle: {
        fontSize: 38,
        padding: 20,
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

export default JoinRoomScreen;