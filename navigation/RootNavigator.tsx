import React from 'react';
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

  return (
    <NavigationContainer>
      {
        userData?.['Account ID']
        ? userData?.['Account ID'] && !userData?.['Mobile App Account Approved']
          ? <UserAccountApproveNavigator />
          : <MainNavigator />
        : <AuthNavigation />
      }
      {/* {
        userData?.['Email 1'] === "admin@gmail.com"
        ? <AdminNavigator />
        : userData?.['Account ID'] && userData?.['Mobile App Account Approved']
          ? <MainNavigator />
          : <AuthNavigation />
      } */}
    </NavigationContainer>
  );
}

export default RootNavigator
