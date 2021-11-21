import React, { useCallback, useEffect, useRef, useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import RootNavigator from './navigation/RootNavigator';
import { store } from './store/store';
import { delay } from './utils/delay';

const App = () => {
  const [isLoading, setLoading] = useState(true)
  
  const setInitialToastRef = useCallback((ref) => {
    Toast.setRef(ref)
  }, [])

  useEffect(() => {
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
      <RootNavigator />
      <Toast ref={setInitialToastRef} />
    </Provider>
  );
};

export default App;
