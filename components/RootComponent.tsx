import * as React from "react"
import { View, TouchableWithoutFeedback, ViewStyle, Keyboard } from "react-native"
import SafeAreaView from 'react-native-safe-area-view'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import colors from "../constants/colors"

type RootProps = {
  children: React.ReactNode | React.ReactNode[]
  dismissKeyboardAvoiding?: boolean
  style?: ViewStyle
}

const Root = (props: RootProps) => {
  const { style, dismissKeyboardAvoiding, children } = props

  if (dismissKeyboardAvoiding) {
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {children}
    </SafeAreaView>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{
          flexGrow: 1 // this will fix scrollview scroll issue by passing parent view width and height to it
        }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flexGrow: 1 }}
        >
          <View style={{ flexGrow: 1 }}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Root
