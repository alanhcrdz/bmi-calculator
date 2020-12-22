import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

const MainButton = (props) => {
        return (
            <TouchableOpacity 
            style={styles.container}
            activeOpacity={0.6} 
            onPress={props.onPress}>

            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>

            </TouchableOpacity>
            
        )
}

const styles =StyleSheet.create({

    container: {
        alignItems: 'center'
    },
    button: {
        backgroundColor: Colors.secondary,
        paddingVertical: 12,
        width:'50%',
        borderRadius: 25,
        marginVertical: 20
    },
    buttonText: {
        fontFamily: 'Oswald-Regular',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center'
    }
});

export default MainButton;

