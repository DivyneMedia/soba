import React, { useCallback, useEffect, useRef, useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import RootNavigator from './navigation/RootNavigator';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { delay } from './utils/delay';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyboardManager from 'react-native-keyboard-manager';
import { isIos } from './utils/MiscUtils';
import { LogBox, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.'])

const App = () => {
  const [isLoading, setLoading] = useState(true)
  
  const setInitialToastRef = useCallback((ref) => {
    Toast.setRef(ref)
  }, [])

  useEffect(() => {
    if (isIos) {
      KeyboardManager.setEnable(isIos)
      KeyboardManager.setToolbarPreviousNextButtonEnable(isIos)
    }
    
    delay(1500)
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <SplashScreen />
    )
  }
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SafeAreaProvider style={styles.container}>
          <GestureHandlerRootView style={styles.container}>
            <RootNavigator />
            <Toast ref={setInitialToastRef} />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App;
