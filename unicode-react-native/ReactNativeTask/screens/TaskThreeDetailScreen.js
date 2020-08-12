import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Dimensions } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/Colors';

var contact;
const TaskThreeDetailScreen = props => {
    return (
        <ScrollView>
        <View style={styles.screen}>
            {contact && (
                <View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{contact.displayName}</Text>
                        <Text style={{color: Colors.secondary, opacity: 0.8}}>[Click on number, email-ID or website to open it.]</Text>
                    </View>
                    <Card style={styles.card}>
                    <View style={styles.commonContainer}>
                        <Text style={styles.subHeader}>Number</Text>
                        {contact.phoneNumbers.map(elem => <View key={elem.number}>
                            <Text style={styles.common} onPress={() => {Linking.openURL(`tel:${elem.number}`)}}>
                            {elem.label} : {elem.number}
                            </Text>
                        </View>)}
                    </View>
                    {contact.emailAddresses[0] && (<View style={styles.commonContainer}>
                        <Text style={styles.subHeader}>Email</Text>
                        {contact.emailAddresses.map(elem => <View key={elem.label}>
                            <Text style={styles.common} onPress={() => {Linking.openURL(`mailto:${elem.email}`)}}>
                            {elem.label} : {elem.email}
                            </Text>
                        </View>)}
                    </View>)}
                    {contact.postalAddresses[0] && (<View style={styles.commonContainer}>
                        <Text style={styles.subHeader}>Address</Text>
                        {contact.postalAddresses.map(elem => <View key={elem.label}>
                            <Text style={styles.common}>
                            {elem.label} : {elem.formattedAddress}
                            </Text>
                        </View>)}
                    </View>)}
                    {contact.urlAddresses[0] && (<View style={styles.commonContainer}>
                        <Text style={styles.subHeader}>Websites</Text>
                        {contact.urlAddresses.map(elem => <View key={elem.id}>
                            <Text style={styles.common} onPress={() => {Linking.openURL(elem.url)}}>
                                {elem.url}
                            </Text>
                        </View>)}
                    </View>)}
                    </Card>
                </View>
            )}
        </View>
        </ScrollView>
    );
};

TaskThreeDetailScreen.navigationOptions = navData => {
    const id = navData.navigation.getParam('individualContactId');
    contact = navData.navigation.getParam('contact');
    console.log(contact);
    return {
        headerTitle: contact.displayName,
    };
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.background,
        height: Dimensions.get('window').height,
        padding: 20,
    },
    nameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2,
        paddingBottom: 5,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 4,
        color: Colors.secondary,
    },
    card: {
        padding: 10,
        width: '100%',
        backgroundColor: Colors.primary,
        shadowColor: 'white',
    },
    subHeader: {
        textTransform: 'uppercase',
        fontSize: 22,
        color: Colors.secondary,
    },
    commonContainer: {
        justifyContent: 'space-between',
        //alignItems: 'center',
        textAlign: 'left',
        paddingHorizontal: 10,
        borderBottomColor: Colors.secondary,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    common: {
        fontSize: 18,
        //textTransform: 'capitalize',
        textAlign: 'left',
        paddingVertical: 5,
        color: Colors.secondary,
    },
});

export default TaskThreeDetailScreen;