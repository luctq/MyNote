import React from 'react'
import { Keyboard, Pressable, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icons from 'react-native-vector-icons/Octicons'
import AntIcons from 'react-native-vector-icons/AntDesign'

import FolderList from './FolderList'
import NoteList from './NoteList'
import NoteDetails from './NoteDetails'

const Stack = createNativeStackNavigator()

function Home() {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='FolderList'
        component={FolderList}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='NoteList'
        component={NoteList}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f5f4f1',
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack()
              }}
              >
              <AntIcons
                name='left'
                size={25}
                color='#d9ae21'
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen 
        name='NoteDetails'
        component={NoteDetails}
        options={({navigation, route}) => (
          {
            headerRight: () => (
              <Pressable
                onPress={() => {
                  Keyboard.dismiss()
                }}
                >
                <Icons
                  name='check'
                  size={25}
                  color='#d9ae21'
                />
              </Pressable>
            ),
            title: '',
            headerStyle: {
              backgroundColor: '#f5f4f1',
            },
            headerShadowVisible: false,
            headerLeft: () => (
              <Pressable
                style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}
                onPress={() => {
                  navigation.goBack()
                }}
                >
                <AntIcons
                  name='left'
                  size={25}
                  color='#d9ae21'
                />
                <Text style={{color: "#d9ae21", fontSize: 18}}>
                  {route.params.folderName}
                </Text>
              </Pressable>
            ),
          }
        )}
      />
    </Stack.Navigator>
  )
}

export default Home