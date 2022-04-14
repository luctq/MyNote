import React from 'react'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Pressable, View } from 'react-native'
import { connect } from 'react-redux'

import Home from './Home'
import Profile from './Profile'
import { logoutUser } from '../redux/actions'

const Tab = createBottomTabNavigator()

function NoteApp({logoutUser}) {

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#d9ae21'}}>
        <Tab.Screen 
          name='Home'
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <AntIcon 
                name='home' 
                size={25} 
                color={color}
              />
            ),
            headerShown: null
          }}
        />
        <Tab.Screen 
          name='Profile'
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <AntIcon 
                name='profile'
                size={25} 
                color={color}
              />
            ),
            title: 'Profile',
            headerRight: ({ color }) => (
              <Pressable onPress={() => logoutUser()}>
                <View style={{marginRight: 15}} >
                  <AntIcon 
                    name='logout'
                    size={25}
                    color="#d9ae21"
                  />
                </View>
              </Pressable>
            ),
            headerStyle: {
              backgroundColor: '#f5f4f1'
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default connect(null, {logoutUser})(NoteApp)