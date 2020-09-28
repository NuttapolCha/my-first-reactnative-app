import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';

const BottomTab = createBottomTabNavigator();

const ScreenManager = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Add Contact') {
              iconName = focused
                ? 'ios-add-circle'
                : 'ios-add-circle-outline'
            } else if (route.name === 'Contact List') {
              iconName = focused
                ? 'ios-list-box'
                : 'ios-list';
            } else if (route.name === 'Calculator') {
              iconName = focused 
                ? 'md-square'
                : 'md-square-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <BottomTab.Screen name="Add Contact" component={FirstScreen} />
        <BottomTab.Screen name="Contact List" component={SecondScreen} />
        <BottomTab.Screen name="Calculator" component={ThirdScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

export default ScreenManager;