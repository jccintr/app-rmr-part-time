import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkerTabBar from '../components/WorkerTabBar';

import Home from '../screens/Worker/Home';
import Profile from '../screens/Worker/Profile';
import Trabalhos from '../screens/Worker/Trabalhos';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator screenOptions={{ headerShown: false}} tabBar={props=><WorkerTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Trabalhos" component={Trabalhos} options={{unmountOnBlur: true}}/>
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
);