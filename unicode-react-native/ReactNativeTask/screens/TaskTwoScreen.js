import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Linking, Dimensions } from 'react-native';
import MenuIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import Colors from '../constants/Colors';

const TaskTwoScreen = (props) => {
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');

    const profile = async () => {
        setName(await AsyncStorage.getItem('name_key'));
        setBirthdate(await AsyncStorage.getItem('dob_key'));
        setPhone(await AsyncStorage.getItem('phone_key'));
        setEmail(await AsyncStorage.getItem('email_key'));
        setAbout(await AsyncStorage.getItem('about_key'));
        console.log(email);
    };
    profile();

    if(name === null || birthdate === null || phone === null || email === null){
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noData}>Please fill out all the compulsory fields to access this part of the app.</Text>
            </View>
        );
    }
    return (
        <View>
            <ScrollView>
            <View style={styles.screen}>
                <View style={styles.greetContainer}>
                    <Text style={styles.greet} numberOfLines={2}>{name}</Text>
                </View>
                <View style={styles.dobContainer}>
                    <Text style={styles.dob}>
                        <MenuIcon name='calendar' size={23} style={{marginRight: 15, opacity: 0.75}} color={Colors.secondary}/>
                        DOB: {birthdate}
                    </Text>
                </View>
                <View style={styles.phoneContainer}>
                    <Button
                    color={Colors.primary}
                    onPress={() => {
                        Linking.openURL(`tel:${phone}`)
                    }}
                    title={String(phone)}
                    />
                </View>
                <View style={styles.emailContainer}>
                    <Text
                    style={styles.email}
                    onPress={() => {
                        Linking.openURL(`mailto:${email}`)
                    }}>
                        {email}
                    </Text>
                </View>
                <View style={styles.aboutHeaderContainer}>
                    <Text style={styles.aboutHeader}>About {name} :</Text>
                </View>
                <View style={styles.aboutContainer}>
                    <Text style={{color: Colors.secondary}}>{about}</Text>
                </View>
            </View>
        </ScrollView>
        </View>
    );
};

TaskTwoScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Task 2',
        headerLeft: () => (
            <MenuIcon name='arrow-left' size={23} style={{marginLeft: 15}} color={Colors.secondary} onPress={() => {
                navData.navigation.navigate('TaskOne');
            }}/>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        //flex: 1,
        backgroundColor: Colors.background,
        height: Dimensions.get('window').height,
    },
    greetContainer: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginVertical: 10,
    },
    dobContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: 15,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 3,
    },
    dob: {
        fontSize: Dimensions.get('window').width > 450 ? 20 : 16,
        fontWeight: 'bold',
        color: Colors.secondary,
        opacity: 0.75,
    },
    greet: {
        //fontWeight: 'bold',
        fontSize: Dimensions.get('window').width > 450 ? 37 : 27,
        color: Colors.secondary,
        textTransform: 'uppercase',
        letterSpacing: 4,
    },
    phoneContainer: {
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 8,
    },
    emailContainer: {
        marginHorizontal: 20,
        marginVertical: 8,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    email: {
        color: Colors.secondary,
    },
    aboutHeaderContainer: {
        justifyContent: "center",
        alignItems: 'flex-start',
        textAlign: 'left',
        marginHorizontal: 20,
        marginVertical: 10,
        paddingTop: 10,
        borderTopColor: Colors.primary,
        borderTopWidth: 2,
    },
    aboutHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondary,
        textTransform: 'capitalize',
    },
    aboutContainer: {
        backgroundColor: Colors.primary,
        marginHorizontal: 20,
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    noDataContainer: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    noData: {
        textAlign: 'center',
        color: Colors.secondary,
    },
});

export default TaskTwoScreen;