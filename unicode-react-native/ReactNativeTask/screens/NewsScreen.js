import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Image, ScrollView, Alert, Linking, FlatList, TouchableWithoutFeedback } from 'react-native';
import MenuIcon from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';
import Input from '../components/Input';
import Card from '../components/Card';

const NewsScreen = props => {
    const [convertedData, setConvertedData] = useState(null);
    const [userInput, setUserInput] = useState('');
    const fetchNews = async () => {
        setUserInput('');
        const response = await fetch(`https://newsapi.org/v2/everything?q=${userInput}&apiKey=07abc22603be43f3baf754428b450849`);
        const res = await response.json();
        if(!response.ok || res.totalResults===0){
            Alert.alert('Error', 'Could not find search results', [{text: 'Okay', style: 'cancel'}]);
        }
        console.log(res);
        setConvertedData(res);
        console.log(res);
    };
    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback>
            <View style={styles.searchContainer}>
            <View style={styles.searchField}>
                <Input 
                value={userInput}
                style={{backgroundColor: Colors.secondary, color: Colors.primary, opacity: 0.9, marginVertical: 5}}
                onChangeText={(text) => {setUserInput(text)}}
                placeholder='Search...'/>
            </View>
            <View style={styles.searchBtn}>
                    <Button 
                    title='Search'
                    color={Colors.primary}
                    onPress={fetchNews}
                    />
            </View>
            </View>
            </TouchableWithoutFeedback>
            {convertedData && (
            <View>
                <FlatList
                style={{height: Dimensions.get('window').height*0.75}}
                data={convertedData.articles}
                keyExtractor={item => item.url}
                renderItem={itemData => (
                <View style={styles.newsContainer}>
                    <Card style={{width: '95%'}}>
                <Text style={styles.title}>{itemData.item.title}</Text>
                <Image 
                source={{uri: itemData.item.urlToImage, method: 'POST'}}
                style={{ width: '100%', height: 200, alignSelf: 'center' }}
                />
                <Text style={styles.description}>{itemData.item.description}</Text>
                <Text style={styles.author}>~{itemData.item.author}</Text>
                <Text style={styles.url} onPress={() => {Linking.openURL(itemData.item.url)}}>{itemData.item.url}</Text>
                </Card>
                </View>
                )}
                />
            </View>)}
            <View style={styles.endContainer}></View>
        </View>
    );
};

NewsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Current News',
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
        padding: Dimensions.get('window').width > 450 ? 20 : 14,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 0,
    },
    searchField: {
        width: '70%',
    },
    searchBtn: {
        flex: 1,
        marginHorizontal: 10,
    },
    newsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'left',
        color: Colors.secondary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 18,
    },
    description: {
        paddingHorizontal: 10,
        color: Colors.secondary,
        opacity: 0.75,
        marginVertical: 4,
    },
    author: {
        textAlign: 'right',
        color: Colors.secondary,
        opacity: 0.5,
        marginHorizontal: 12,
        paddingBottom: 6,
        borderBottomColor: Colors.background,
        borderBottomWidth: 2,
    },
    url: {
        paddingHorizontal: 15,
        marginVertical: 5,
        color: '#2196f3'
    },
    endContainer: {
        width: '100%',
        marginBottom: 70,
    },
});

export default NewsScreen;