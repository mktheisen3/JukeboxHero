import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input } from 'react-native-elements';

import Spacer from './Spacer';
import NavLink from './NavLink';

const AuthForm = ({ headerText, errorMessage, onSubmit, buttonText }) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <>
            <Spacer>
                <Text style={styles.headerStyle} >{headerText}</Text>
            </Spacer>
            <Input 
                inputStyle={{color: 'white'}}
                label='Email'
                autoCapitalize='none'
                autoCorrect={false} 
                value={email} 
                onChangeText={setEmail} />
            <Spacer />
            <Input 
                inputStyle={{color: 'white'}}
                label='Password' 
                autoCapitalize='none'
                autoCorrect={false} 
                secureTextEntry
                value={password} 
                onChangeText={setPassword} />
            
            {buttonText === "Sign Up" ?
                <NavLink 
                    linkText="Already have an account? Sign in instead"
                    routeName='Signin'/> :
                <NavLink 
                    linkText="Don't have an account? Sign up instead"
                    routeName='Signup'/> }
            <Spacer>
                <TouchableOpacity 
                    onPress={() => onSubmit({ email, password })}
                    style={styles.buttonStyle} >
                        <Text style={styles.textStyle}>{buttonText}</Text>
                </TouchableOpacity>
                {errorMessage ? <Text style={styles.errorStyle}>{errorMessage}</Text> : null}
            </Spacer>
        </>
    );

};

const styles = StyleSheet.create({
    errorStyle: {
        marginTop: 14,
        fontSize: 16,
        color: '#eb442a'
    },
    headerStyle: {
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

export default AuthForm;