import React from 'react';
import { View, Text } from 'react-native';
import MenuIcon from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';

const TaskThreeScreen = () => {
    return (
        <View>
            <Text>Task 3</Text>
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

export default TaskThreeScreen;