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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <RootNavigator />
          <Toast ref={setInitialToastRef} />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
