import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ContactScreen from '../screens/ContactScreen';
import MainTabs from './MainTabs';
import ContactForm from '../screens/ContactForm';

const MainStack = createStackNavigator();
const Main = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<MainStack.Screen name="MainTabs" component={MainTabs} />
			<MainStack.Screen name="ContactScreen" component={ContactScreen} />
			<MainStack.Screen name="ContactForm" component={ContactForm} />
		</MainStack.Navigator>
	);
};

export default Main;
