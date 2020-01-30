import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { EvilIcons } from '@expo/vector-icons';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as RoomContext } from '../context/RoomContext';

const SettingsScreen = ({ navigation }) => {

    const { state: { isHost }, signout, becomeNotHost } = useContext(AuthContext);
    const { state: { roomName, roomCode } } = useContext(RoomContext);

    return (
        <SafeAreaView style={styles.containerStyle} forceInset={{ top: 'always' }}>
            <Text style={styles.detailStyle} >Room Name: {roomName}</Text>
            <Text style={{ ...styles.detailStyle, paddingBottom: 22}} >Room Code: {roomCode}</Text>
            {isHost ? 
                <View style={{paddingBottom: 30}} >
                    <TouchableOpacity onPress={() => navigation.navigate('ActiveDevice')}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 8 }}>
                            <Text style={styles.textStyle} >Device Options</Text>
                            <EvilIcons name="chevron-right" style={{ color: 'white', fontSize: 35, position: 'absolute', right: 0, alignSelf: 'center' }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Members')}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 20 }}>
                            <Text style={styles.textStyle} >Room Members</Text>
                            <EvilIcons name="chevron-right" style={{ color: 'white', fontSize: 35, position: 'absolute', right: 0, alignSelf: 'center' }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('RoomSettings')}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 8 }}>
                            <Text style={styles.textStyle} >Room Settings</Text>
                            <EvilIcons name="chevron-right" style={{ color: 'white', fontSize: 35, position: 'absolute', right: 0, alignSelf: 'center' }} />
                        </View>
                    </TouchableOpacity> 
                </View>
                : null}
            <TouchableOpacity 
                onPress={becomeNotHost}
                style={styles.buttonStyle} >
                    <Text style={styles.buttonTextStyle}>Leave Room</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={signout}
                style={styles.buttonStyle} >
                    <Text style={styles.buttonTextStyle}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

};

SettingsScreen.navigationOptions = {
    title: "Settings",
    headerTitleStyle: {
        color: 'white'
    },
    headerStyle: {
        backgroundColor: '#181818',
        borderBottomWidth: 0,
        marginTop: 10
    }
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#181818'
    },
    textStyle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left'
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: '#228B22',
        borderRadius: 5,
        fontSize: 20,
        marginBottom: 15,
        marginHorizontal: 80
    },
    buttonTextStyle: {
        textAlign: 'center',
        fontSize: 22,
        color: '#228B22',
        marginVertical: 17
    },
    detailStyle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left',
        marginHorizontal: 20, 
        marginVertical: 8
    }
});

export default SettingsScreen;