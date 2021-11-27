import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useSelector } from 'react-redux';

const RootNavigator = () => {
  const userData = useSelector((state: any) => state?.auth)
  console.log(userData)

  return (
    <NavigationContainer onReady={() => console.log('ready')}>
      {
        !userData?.isLoggedIn
        ? <AuthNavigation />
        : <MainNavigator />
      }
    </NavigationContainer>
  );
}

export default RootNavigator
