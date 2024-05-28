import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'

const AuthLayout = () => {
  return (
   <>
     <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <ExpoStatusBar backgroundColor="#161622" style="light" />
   </>
  )
}

export default AuthLayout