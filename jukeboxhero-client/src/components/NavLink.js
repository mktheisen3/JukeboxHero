import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

import Spacer from './Spacer';

const NavLink = ({ navigation, routeName, linkText }) => {

    return (
        <>
            <Spacer>
                <TouchableOpacity onPress={() => navigation.navigate(routeName) }>
                    <Text style={styles.linkStyle}>{linkText}</Text>
                </TouchableOpacity>
            </Spacer>
        </>
    );

};

const styles = StyleSheet.create({
    linkStyle: {
        color: 'white'
    }
});

export default withNavigation(NavLink);