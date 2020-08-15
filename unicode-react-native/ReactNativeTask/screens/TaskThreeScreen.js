import React, { useState } from 'react';
import { View, Text, PermissionsAndroid, Alert, Button, FlatList, StyleSheet, Dimensions, ScrollView, TouchableOpacity, TouchableNativeFeedback, Platform, Image } from 'react-native';
import MenuIcon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';

import Colors from '../constants/Colors';

const TaskThreeScreen = (props) => {
  var TouchableCmp = TouchableOpacity;
  if(Platform.OS === "android" && Platform.Version >= 21){
    //TouchableCmp = TouchableNativeFeedback;
  }
    const [contacts, setContacts] = useState([]);
    const requestContactsPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: "React Native Task App Contacts Permission",
              message:
                "React Native Task App needs access to your contacts ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "Okay"
            }
          );
          console.log(granted) 
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the contacts");
            Contacts.getAll((err, result) => {
              if (err === "denied") {
                console.log(err)
              } else {
                //console.log(result[0]);
                setContacts(result);
              }
            });
          } else {
            console.log("Contact permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };
      console.log(contacts);
      const detailScreenHandler = (item) => {
        props.navigation.navigate('TaskThreeDetail',
        { 
          //individualContactId: id,
          //name: contacts.givenName,
          //surname: contacts.familyName,
          //company: contacts.company,
          contact: item,
      });
      };
    return (
        <View style={styles.screen}>
              <View style={{flex: 1}}>
              <View style={styles.titleContainer}>
              <Text style={styles.title}>Contacts</Text>
            </View>
            <View style={styles.fetchContainer}>
              <Button color={Colors.primary} title='Fetch Contacts' onPress={requestContactsPermission}/>
            </View>
            <View style={styles.flatlistContainer}>
              <FlatList 
              data={contacts}
              keyExtractor={item => item.phoneNumbers[0].id}
              renderItem={itemData => (
                <TouchableCmp>
                <View style={styles.dataContainer}>
                  <Text 
                  numberOfLines={1} 
                  onPress={detailScreenHandler.bind(this, itemData.item)} 
                  style={styles.data}>
                  <MenuIcon name='user' size={23} color={Colors.secondary}/>  {itemData.item.displayName}
                  </Text>
                </View>
                </TouchableCmp>
              )}
              />
            </View>
            <View style={styles.endContainer}></View>
            </View>
        </View>
    );
};

TaskThreeScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Task 3',
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
    marginBottom: 50,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: Colors.secondary,
  },
  fetchContainer: {
    marginVertical: 10,
  },
  flatlistContainer: {
    borderTopColor: Colors.primary,
    borderTopWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 5,
    height: Dimensions.get('window').height*0.75,
  },
  dataContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  data: {
    fontSize: 20,
    color: Colors.secondary,
    opacity: 0.9,
  },
  endContainer: {
    width: '100%',
    marginBottom: 100,
},
});

export default TaskThreeScreen;