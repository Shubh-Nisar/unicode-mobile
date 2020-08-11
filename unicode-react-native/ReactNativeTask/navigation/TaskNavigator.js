import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import MenuIcon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import TaskOneScreen from '../screens/TaskOneScreen';
import TaskTwoScreen from '../screens/TaskTwoScreen';
import TaskThreeScreen from '../screens/TaskThreeScreen';
import TaskThreeDetailScreen from '../screens/TaskThreeDetailScreen';
import TaskFourScreen from '../screens/TaskFourScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? Colors.secondary : Colors.primary
};

const TaskOneNavigator = createStackNavigator(
    {
        TaskOne: TaskOneScreen,
        TaskTwo: TaskTwoScreen,
    }, {
        defaultNavigationOptions: defaultNavOptions
    }
);

const TaskTwoNavigator = createStackNavigator(
    {
        TaskTwo: TaskTwoScreen,
    }, {
        defaultNavigationOptions: defaultNavOptions
    }
);

const TaskThreeNavigator = createStackNavigator(
    {
        TaskThree: TaskThreeScreen,
        TaskThreeDetail: TaskThreeDetailScreen,
    }, {
        defaultNavigationOptions: defaultNavOptions
    }
);

const TaskFourNavigator = createStackNavigator(
    {
        TaskFour: TaskFourScreen,
    }, {
        defaultNavigationOptions: defaultNavOptions
    }
);
const TaskNavigator = createDrawerNavigator(
    {
    TaskOneDrawer: TaskOneNavigator,
    TaskTwoDrawer: TaskTwoNavigator,
    TaskThreeDrawer: TaskThreeNavigator,
    TaskFourDrawer: TaskFourNavigator,
    }, 
    {
    contentOptions: {
        activeTintColor: Colors.primary
        }
    }
);

export default createAppContainer(TaskNavigator);