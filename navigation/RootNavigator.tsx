import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigation from './AuthNavigator';
import MainNavigator from './MainNavigator';
import UserAccountApproveNavigator from './UserAccountApproveNavigator';

import { useSelector } from 'react-redux';
import { USER } from '../types/UserResponse';
import AdminNavigator from './AdminNavigator';

type UserPayload = {
  userData: USER
}

const RootNavigator = () => {
  const { userData }: UserPayload = useSelector((state: any) => state?.auth)

  useEffect(() => {
    
  }, [])

  return (
    <NavigationContainer>
      {
        userData?.['Account ID']
        ? userData?.['Account ID'] && userData?.['Mobile App Account Approved'] !== 'true'
          ? <UserAccountApproveNavigator />
          : <MainNavigator />
        : <AuthNavigation />
      }
    </NavigationContainer>
  );
}

export default RootNavigator
