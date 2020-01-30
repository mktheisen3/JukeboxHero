import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents, SafeAreaView } from 'react-navigation';

import AuthForm from '../components/AuthForm';

const SignupScreen = ({ navigation }) => {

    const { state, signup, clearErrMessage } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.containerStyle} forceInset={{ top: 'always' }}>
            <NavigationEvents 
                onWillBlur={clearErrMessage}/>
            <AuthForm 
                headerText='JukeboxHero' 
                errorMessage={state.errorMessage} 
                onSubmit={signup}
                buttonText='Sign Up' />
        </SafeAreaView>
    );

};

SignupScreen.navigationOptions = () => {
    return {
        header: null
    };
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#181818',
        justifyContent: 'center',
        paddingBottom: 100
    }
});

export default SignupScreen;