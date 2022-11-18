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
import LoaderContextProvider from './context/LoaderContextProvider';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.'])

import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-hooks';
import colors from './constants/colors';

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
      KeyboardManager.setKeyboardDistanceFromTextField(20)
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
    flex: 1,
    backgroundColor: colors.white
  }
})

export default App;

// import React, { useEffect, useRef, useState } from 'react';
// import { Button, TextInput, View } from 'react-native';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import { ErrorToast, SuccessToast } from './utils/ToastUtils';
// import Toast from 'react-native-toast-message';

// function PhoneSignIn() {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult>();

//   const [code, setCode] = useState('');
//   const [callingCode] = useState<any>(__DEV__ ? '+91' : '+1');
//   const [number, setNumber] = useState<any>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   const userNodeRef = useRef<FirebaseAuthTypes.User | null>(null)

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber: any) {
//     try {
//       setLoading(true)
//       const confirmation = await auth().signInWithPhoneNumber(`${callingCode} ${phoneNumber}`);
//       setLoading(false)
//       setConfirm(confirmation);
//     } catch (err: any) {
//       setLoading(false)
//       ErrorToast(err?.message ?? JSON.stringify(err))
//     }
//   }

//   useEffect(() => {
//     auth().signOut()
//     .then(() => {

//     })
//     .catch(() => {
      
//     })
//   }, [])

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged((user) => {
//       if (user) {
//         userNodeRef.current = user
//       } else {
//         userNodeRef.current = null
//       }
//     })
//     return unsubscribe
//   }, [])

//   async function confirmCode() {
//     try {
//       if (!confirm) {
//         return
//       }
//       if (userNodeRef.current) {
//         SuccessToast('Success')
//       } else {
//         setLoading(true)
//         const res = await confirm.confirm(code);
//         setLoading(false)
//         SuccessToast('Success')
//       }
//     } catch (error: any) {
//       setLoading(false)
//       ErrorToast('confirmCode : ' + (error?.message || JSON.stringify(error)))
//       console.log('Invalid code.');
//     }
//   }

//   const signInHandler = () => {
//     try {
//       signInWithPhoneNumber(number)
//     } catch (err: any) {
//       ErrorToast('signInHandler : ' + (err?.message || JSON.stringify(err)))
//     }
//   }

//   if (!confirm) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center' }}>
//         <TextInput
//           placeholder='Enter Phone number'
//           style={{
//             borderBottomWidth: 1,
//             marginBottom: 10
//           }}
//           value={number}
//           onChangeText={enteredText => setNumber(enteredText)}
//         />
//         <Button
//           title="Phone Number Sign In"
//           onPress={signInHandler}
//           disabled={loading}
//         />
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, justifyContent: 'center' }}>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} disabled={loading} />
//     </View>
//   );
// }

// export default () => {
  
//   const setInitialToastRef = (ref: any) => {
//     Toast.setRef(ref)
//   }

//   return (
//     <>
//       <PhoneSignIn />
//       <Toast ref={setInitialToastRef} />
//     </>
//   )
// }
