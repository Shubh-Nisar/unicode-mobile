import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
    return (
        <TextInput
        {...props}
        style={{...styles.commonStyles, ...props.style}} 
        placeholder={props.placeholder}
        />
    );
};

export default Input;

const styles = StyleSheet.create({
    commonStyles: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 15,
    },
});