import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkerTabBar from '../components/TabBar/WorkerTabBar';
import Home from '../screens/Worker/Home';
import Profile from '../screens/Profile';
import Propostas from '../screens/Worker/Propostas';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator screenOptions={{ headerShown: false}} tabBar={props=><WorkerTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Propostas" component={Propostas} options={{unmountOnBlur: true}}/>
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
);