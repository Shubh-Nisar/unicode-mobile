import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert, Dimensions } from 'react-native';
import MenuIcon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';

import Input from '../components/Input';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import { color } from 'react-native-reanimated';

const TaskFourScreen = () => {
    const [city, setCity] = useState('');
    const [convertedData, setConvertedData] = useState(null);
    const weatherData = async () => {
        setCity('');
        try{
            const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bdc15df4898a5892a4920468f59ae5de`);
        if(!data.ok){
            console.log('Error');
            return (
                Alert.alert('Error', `Could not find ${city} city or some server issue. Please retry again`, [{
                    text: 'Okay'
                }])
            );
        }
        setConvertedData(await data.json());
        console.log(convertedData);
        if(convertedData){
            console.log(convertedData.name)
        }
        } catch (err){
            console.log(err.message);
            Alert.alert('Error', err.message, [{
                text: 'Okay'
            }])
        }
    };
    return (
        <View style={styles.screen}>
            <ScrollView>
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>ClimateX</Text>
                <Text style={{color: Colors.secondary, opacity: 0.8}}>[ Search for a city's weather at one click! ]</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchField}>
                    <Input 
                    style={{backgroundColor: Colors.secondary, color: Colors.primary, opacity: 0.9}}
                    value={city}
                    onChangeText={(city) => setCity(city)}
                    placeholder='Search by City name'/>
                </View>
                <View style={styles.searchBtn}>
                    <Button 
                    title='Search'
                    color={Colors.primary}
                    onPress={weatherData}
                    />
                </View>
            </View>
            <View style={styles.outputContainer}>
                {convertedData && (
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>
                            {convertedData.name} [{convertedData.sys.country}]
                        </Text>
                        <Text style={styles.description}>
                            Weather Description : {convertedData.weather[0].description}
                        </Text>
                        <Card>
                            <View style={styles.temperatureContainer}>
                                <Text style={styles.temperature}>
                                    MIN <MenuIcon name='arrow-circle-down' size={18} color='#f44336' /> :
                                    {parseInt(convertedData.main.temp_min-273)}&deg;C
                                </Text>
                                <Text style={styles.temperature}>
                                    MAX <MenuIcon name='arrow-circle-up' size={18} color='#4caf50' /> :
                                    {parseInt(convertedData.main.temp_max-273)}&deg;C
                                </Text>
                            </View>
                        </Card>
                        <Card>
                        <View style={styles.pressureAndWindContainer}>
                            <Text style={styles.pressureAndWindInside}>
                                Pressure <Icons name='compress-alt' size={18} color='#009688'/> : {convertedData.main.pressure} mbar
                            </Text>
                            <Text style={styles.pressureAndWindInside}>
                                Humidity <Icons name='hand-holding-water' size={18} color='#03a9f4'/> : {convertedData.main.humidity} %
                            </Text>
                            <Text style={styles.pressureAndWindInside}>
                                Wind Speed <Icons name='wind' size={18} color='#ff9800'/> : {convertedData.wind.speed} ms/s
                            </Text>
                            <Text style={styles.pressureAndWindInside}>
                                Visibility <Icons name='glasses' size={18} color='#9c27b0'/> : {convertedData.visibility} m
                            </Text>
                        </View>
                        </Card>
                        <View style={styles.latLongContainer}>
                            <Text style={styles.lat}>[ Latitude : {convertedData.coord.lat}</Text>
                            <Text style={styles.long}>Longitude : {convertedData.coord.lon} ]</Text>
                        </View>
                    </View>
                )}
            </View>
            <View style={styles.endContainer}></View>
        </View>
        </ScrollView>
        </View>
    );
};

TaskFourScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Task 4',
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
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginVertical: 10,
        color: Colors.primary,
        paddingBottom: 10,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.secondary,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
    },
    searchField: {
        width: '65%',
    },
    searchBtn: {
        flex: 1,
        marginHorizontal: 10,
    },
    nameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 4,
        color: Colors.secondary
    },
    description: {
        textTransform: 'uppercase', 
        color: Colors.secondary,
        opacity: 0.75, 
        marginBottom: 5,
        borderBottomColor: '#616161',
        borderBottomWidth: 1,
    },
    temperatureContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'center',
        marginVertical: 10,
    },
    temperature: {
        marginHorizontal: 20,
        fontSize: 18,
        color: Colors.secondary,
    },
    pressureAndWindContainer: {
        //flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        marginVertical: 10,
        //flexWrap: 'wrap',
        paddingHorizontal: 5,
    },
    pressureAndWindInside: {
        marginHorizontal: 5,
        fontSize: 20,
        textAlign: 'center',
        padding: 5,
        color: Colors.secondary,
    },
    latLongContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        color: Colors.secondary,
        marginVertical: 10,
    },
    lat: {
        marginRight: 10,
        color: Colors.secondary,
        opacity: 0.75,
    },
    long: {
        marginLeft: 10,
        color: Colors.secondary,
        opacity: 0.75,
    },
    endContainer: {
        width: '100%',
        marginBottom: 70,
    },
});

export default TaskFourScreen;