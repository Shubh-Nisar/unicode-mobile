import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import MenuIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import Colors from '../constants/Colors';
import Input from '../components/Input';

const TaskOneScreen = (props) => {
    const name_key = 'name_key';
    const dob_key = 'dob_key';
    const phone_key = 'phone_key';
    const email_key = 'email_key';
    const about_key = 'about_key';

    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [theme, setTheme] = useState('lightTheme');

    const fetchPreviousDataHandler = async () => {
        try{
            setName(await AsyncStorage.getItem('name_key'));
            setBirthdate(await AsyncStorage.getItem('dob_key'));
            setPhone(await AsyncStorage.getItem('phone_key'));
            setEmail(await AsyncStorage.getItem('email_key'));
            setAbout(await AsyncStorage.getItem('about_key'));
        } catch (err){
            Alert.alert('Error',`${err}`, [{
                text: 'Okay',
                style: 'cancel',
            }]);
        }
    };

    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={100}
            >
            <ScrollView>
            <View>
                <View style={styles.titleContainer}><Text style={styles.title}>Profile Details</Text></View>
                <Button title='Edit Existing Data' color={Colors.primary} onPress={fetchPreviousDataHandler}/>
                <TouchableWithoutFeedback>
                <View>
                    <Text style={styles.label}>Name <Text style={styles.compulsory}>*</Text></Text>
                    <Input 
                    onChangeText={(text) => setName(text)}
                    value={name}
                    style={styles.input} 
                    placeholder='Name'
                    />

                    <Text style={styles.label}>DOB <Text style={styles.compulsory}>*</Text></Text>
                    <Input 
                    onChangeText={(birthdate) => setBirthdate(birthdate)}
                    value={birthdate}
                    style={styles.input} 
                    placeholder='Birthdate [ dd/mm/yyyy ]'
                    />

                    <Text style={styles.label}>Contact Number <Text style={styles.compulsory}>*</Text></Text>
                    <Input 
                    onChangeText={(phone) => setPhone(phone)}
                    value={phone}
                    style={styles.input} 
                    placeholder='Contact Number'
                    keyboardType='phone-pad'
                    />  

                    <Text style={styles.label}>Email <Text style={styles.compulsory}>*</Text></Text>
                    <Input 
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    style={styles.input}
                    placeholder='Email'
                    keyboardType='email-address'
                    />    

                    <Text style={styles.label}>About You</Text>
                    <Input 
                    onChangeText={(aboutUser) => setAbout(aboutUser)}
                    value={about}
                    style={styles.input}
                    multiline={true}
                    placeholder='Tell us about you...'
                    />             
                </View>
                </TouchableWithoutFeedback>
                <View style={styles.buttonContainer}>
                    <View style={styles.clearButtonContainer}>
                        <Button 
                        title='Clear'
                        color={Colors.primary}
                        onPress={() => {
                            Alert.alert('Reset', 'Are you sure you want clear all fields?', [{
                                text: 'Cancel',
                                style: 'cancel',
                            },{
                                text: 'Yes',
                                style: 'destructive',
                                onPress: async () => {
                                    setName(null);
                                    setBirthdate(null);
                                    setPhone(null);
                                    setEmail(null);
                                    setAbout(null);
                                    await AsyncStorage.clear();
                                    console.log('Cleared');
                                    props.navigation.navigate('TaskTwo');
                                },
                            }]);
                        }}
                        />
                    </View>
                    <View style={styles.saveButtonContainer}>
                        <Button 
                        title='Save'
                        color={Colors.primary}
                        onPress={async () => {
                            try{
                                await AsyncStorage.setItem(name_key, name);
                                await AsyncStorage.setItem(dob_key, birthdate);
                                await AsyncStorage.setItem(phone_key, phone);
                                await AsyncStorage.setItem(email_key, email);
                                await AsyncStorage.setItem(about_key, about);
                            } catch(err){
                                console.log(err);
                            }
                            console.log(name);
                            console.log(birthdate);
                            console.log(phone);
                            console.log(email);
                            console.log(about);
                            Alert.alert('Saved', 'Your data has been saved successfully', [{text: 'Okay'}]);
                            props.navigation.navigate('TaskTwo');
                        }}
                        />
                    </View>
                </View>
                <View style={styles.endContainer}></View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </View>
    );
};

TaskOneScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Task 1',
        headerLeft: () => (
            <MenuIcon name='bars' size={23} style={{marginLeft: 15}} color={Colors.secondary} onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        ),
    };
};

export default TaskOneScreen;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.background,
        height: Dimensions.get('window').height,
        padding: 20,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.secondary,
    },
    label: {
        paddingHorizontal: 10,
        fontWeight: 'bold',
        marginTop: 10,
        paddingVertical: 0,
        color: Colors.secondary,
    },
    compulsory: {
        color: '#f44336'
    },
    input: {
        backgroundColor: Colors.secondary,
        color: Colors.primary,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
    },
    clearButtonContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    saveButtonContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    endContainer: {
        width: '100%',
        marginBottom: 70,
    },
});