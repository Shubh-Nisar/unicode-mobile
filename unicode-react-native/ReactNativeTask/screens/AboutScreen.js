import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Dimensions, Linking, Platform} from 'react-native';
import MenuIcon from 'react-native-vector-icons/FontAwesome';

import Card from '../components/Card';
import Colors from '../constants/Colors';

const AboutScreen = props => {
    const langs = ['HTML 5', 'CSS 3', 'JAVASCRIPT', 'REACT', 'REACT NATIVE', 'PYTHON', 'DJANGO', 'JAVA', 'OOP C++', 'BOOTSTRAP', 'MATERIALIZE', 'ALP 8085', 'VISUAL BASIC', 'C PROGRAMMING', 'GIT'];
    const projects = [
        {name: 'Fashioncraft', link: 'https://fashioncraft.herokuapp.com/'},
        {name: 'SellBuy', link: 'https://github.com/Shubh-Nisar/Commodity-Exchange-Market'},
        {name: 'XOGame', link: 'https://github.com/Shubh-Nisar/XO-Game'},
        {name: 'iVex', link: 'https://github.com/Shubh-Nisar/Hotel-Management'}
    ]
    return (
        <View style={styles.screen}>
            <ScrollView>
                <View>
                <View style={styles.imageContainer}>
                    <Card style={{borderRadius: 35,}}>
                    <Image source={require('../media/shubh.jpg')} style={styles.image}/>
                    </Card>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Shubh Nisar</Text>
                </View>
                <View style={styles.socialMedia}>
                    <MenuIcon name='instagram' size={Dimensions.get('window').width > 450 ? 40 : 32} color='#e91e63' onPress={() => {Linking.openURL('https://instagram.com/shubh_nisar.28?igshid=xi416yom4znf')}}/>
                    <MenuIcon name='github' size={Dimensions.get('window').width > 450 ? 40 : 32} color='#fff' onPress={() => {Linking.openURL('https://github.com/Shubh-Nisar')}}/>
                    <MenuIcon name='linkedin' size={Dimensions.get('window').width > 450 ? 40 : 32} color='#0e76a8' onPress={() => {Linking.openURL('https://www.linkedin.com/in/shubh-nisar-89a6a31aa')}}/>
                    <MenuIcon name='envelope' size={Dimensions.get('window').width > 450 ? 40 : 32} color='#f44336' onPress={() => {Linking.openURL('mailto:shubhnisar123@gmail.com')}}/>
                </View>
                <View style={styles.mainContainer}>
                    <Text style={styles.subHeader}><MenuIcon name='code' size={Dimensions.get('window').width > 450 ? 22 : 16}/> Languages / Frameworks</Text>
                    <View style={styles.languageContainer}>
                        {langs.map(elem => (<Text style={styles.language} key={elem}>{elem}</Text>))}
                    </View>

                    <Text style={styles.subHeader}><MenuIcon name='tasks' size={Dimensions.get('window').width > 450 ? 22 : 16}/> Projects</Text>
                    <Text style={styles.click}>[ Click on link to open it ]</Text>
                    <View>
                        {projects.map((elem) => (
                            <View key={elem.name} style={styles.projectContainer}>
                                <Text style={styles.projectName}>{elem.name}</Text>
                                <Text style={styles.projectLink} numberOfLines={2} onPress={() => {Linking.openURL(elem.link)}}>{elem.link}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.endContainer}></View>
                </View>
                </View>
            </ScrollView>
        </View>
    );
};

AboutScreen.navigationOptions = navData => {
    return {
        headerTitle: 'About the Creator',
        headerLeft: () => (
            <MenuIcon name='bars' size={23} style={{marginLeft: 15}} color={Colors.secondary} onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.background,
        height: Dimensions.get('window').height,
        padding: 20,
    },
    imageContainer: {
        width: 0.85 * Dimensions.get('window').width,
        height: 0.5 * Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 'auto',
        padding: 'auto',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
    },
    nameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
    name: {
        fontSize: Dimensions.get('window').width > 450 ? 32 : 24,
        textTransform: 'uppercase',
        letterSpacing: 6,
        textAlign: 'center',
        color: Colors.secondary,
        opacity: 0.9
    },
    socialMedia: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 8,
    },
    mainContainer: {
        paddingHorizontal: 10,
    },
    subHeader: {
        fontSize: Dimensions.get('window').width > 450 ? 22 : 18,
        color: Colors.secondary,
        opacity: 0.75,
        textAlign: 'center',
        marginBottom: 6,
        marginTop: 10,
    },
    click: {
        textAlign: 'center',
        color: Colors.secondary,
        opacity: 0.5,
    },
    languageContainer: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1.5,
        paddingBottom: 8,
    },
    language: {
        color: '#2196f3',
        //marginHorizontal: 15,
        width: Dimensions.get('window').width > 450 ? '30%' : '50%',
        textAlign: 'center',
        fontSize: Dimensions.get('window').width > 450 ? 16 : 12,
        //paddingHorizontal: 15,
    },
    projectContainer: {
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    projectName: {
        color: Colors.secondary,
        opacity: 0.8,
        textTransform: 'uppercase',
        letterSpacing: 4,
        marginBottom: 4,
    },
    projectLink: {
        color: '#2196f3',
    },
    endContainer: {
        width: '100%',
        marginBottom: 100,
    },
});

export default AboutScreen;