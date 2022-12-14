import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClientTabBar from '../components/ClientTabBar';

import Home from '../screens/Client/Home';
import Profile from '../screens/Client/Profile';
import Pedidos from '../screens/Client/Pedidos';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator screenOptions={{ headerShown: false}} tabBar={props=><ClientTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Pedidos" component={Pedidos} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
);