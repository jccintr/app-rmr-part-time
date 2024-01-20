import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClientTabBar from '../components/TabBar/ClientTabBar';

import Home from '../screens/Client/Home';
import Profile from '../screens/Profile';
import Orcamentos from '../screens/Client/Orcamentos';



const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator screenOptions={{ headerShown: false}} tabBar={props=><ClientTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Orcamentos" component={Orcamentos} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
);