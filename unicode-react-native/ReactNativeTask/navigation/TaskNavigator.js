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
import NewsScreen from '../screens/NewsScreen';
import AboutScreen from '../screens/AboutScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.bar : ''
    },
    headerTintColor: Platform.OS === 'android' ? Colors.secondary : Colors.primary,
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

const NewsNavigator = createStackNavigator(
    {
        News: NewsScreen,
    }, {
        defaultNavigationOptions: defaultNavOptions
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: AboutScreen,
    }, {
        defaultNavigationOptions: defaultNavOptions
    });

const TaskNavigator = createDrawerNavigator(
    {
    TaskOneDrawer: {screen: TaskOneNavigator, navigationOptions: () => (
        {
            drawerLabel: 'Task 1'
        }
    )},
    TaskTwoDrawer: {screen: TaskTwoNavigator, navigationOptions: () => (
        {
            drawerLabel: 'Task 2'
        }
    )},
    TaskThreeDrawer: {screen: TaskThreeNavigator, navigationOptions: () => (
        {
            drawerLabel: 'Task 3'
        }
    )},
    TaskFourDrawer: {screen: TaskFourNavigator, navigationOptions: () => (
        {
            drawerLabel: 'Task 4'
        }
    )},
    NewsDrawer: {screen: NewsNavigator, navigationOptions: () => (
        {
            drawerLabel: 'News'
        }
    )},
    AboutDrawer: {screen: AboutNavigator, navigationOptions: () => (
        {
            drawerLabel: 'About'
        }
    )}
    }, 
    {
    contentOptions: {
        activeTintColor: '#2196f3',
        activeBackgroundColor: '#333',
        labelStyle: {
            color: Colors.secondary,
        }
        },
        drawerBackgroundColor: Colors.primary,
    },
);

export default createAppContainer(TaskNavigator);