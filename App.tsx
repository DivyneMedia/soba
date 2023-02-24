import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react'
import KeyboardManager from 'react-native-keyboard-manager';
import { LogBox, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { Provider } from 'react-redux';
import { store, persistor } from './store';

import LoaderContextProvider from './context/LoaderContextProvider';
import SplashScreen from './screens/SplashScreen';
import RootNavigator from './navigation/RootNavigator';
import { delay } from './utils/delay';
import { isIos } from './utils/MiscUtils';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.'])

import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-hooks';

const searchClient = algoliasearch(
  'A2GH5T4LDG',
  '832f6fbf9c22c1fc19c81e35c503b3eb'
);

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
            <LoaderContextProvider>
              <InstantSearch
                searchClient={searchClient}
                indexName="users"
              >
                <RootNavigator />
                <Toast ref={setInitialToastRef} />
              </InstantSearch>
            </LoaderContextProvider>
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
