import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
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
        try{
            const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bdc15df4898a5892a4920468f59ae5de`);
        if(!data.ok){
            console.log('Error');
            return (
                Alert.alert('Error', 'Some error has occured, please try again', [{
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
        <ScrollView>
        <View style={styles.screen}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>ClimateX</Text>
                <Text>[ Search for a city's weather at one click! ]</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchField}>
                    <Input 
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
                            <Text style={{marginRight: 10}}>[ Latitude : {convertedData.coord.lat}</Text>
                            <Text style={{marginLeft: 10}}>Longitude : {convertedData.coord.lon} ]</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
        </ScrollView>
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
        margin: 10,
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
    },
    description: {
        textTransform: 'uppercase', 
        color: '#616161', 
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
    },
    latLongContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        color: Colors.primary,
        marginVertical: 10,
    },
});

export default TaskFourScreen;