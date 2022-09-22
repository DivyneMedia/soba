import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigation from './AuthNavigator';
import MainNavigator from './MainNavigator';
import UserAccountApproveNavigator from './UserAccountApproveNavigator';

import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../types/UserResponse';
import AdminNavigator from './AdminNavigator';

import * as authActions from '../store/actions/AuthActions'
import AppLoader from '../components/AppLoader';
import { useContext } from 'react';
import { LoaderContext } from '../context/LoaderContextProvider';


type UserPayload = {
  userData: USER
}

const RootNavigator = () => {
  const dispatch = useDispatch()
  const { userData }: UserPayload = useSelector((state: any) => state?.auth)

  const accId = useMemo(() => userData?.['Account ID'], [userData?.['Account ID']])

  const isNotApprovedAcc = useMemo(() =>
    userData?.['Account ID'] && userData?.['Mobile App Account Approved'] !== 'true',
    [userData?.['Account ID'] && userData?.['Mobile App Account Approved']]
  )

  const userName = useMemo(() => userData?.["Mobile App Username"], [userData?.["Mobile App Username"]])
  const userPassword = useMemo(() => userData?.['Mobile App Password'], [userData?.['Mobile App Password']])

  const [isLoading, setLoading] = useState(false)

  const loaderContext = useContext(LoaderContext)

  const initHandler = useCallback(async () => {
    try {
      if (!!userName && !!userPassword) {
        console.log('calling login')
        setLoading(true)
        await dispatch(authActions.login({
          username: userName,
          password: userPassword
        }))
        setLoading(false)
      }
    } catch (err: any) {
      console.log('[initHandler] Error : ', err?.message)
      setLoading(false)
    }
  }, [dispatch, userName, userPassword])

  useEffect(() => {
    if (isNotApprovedAcc) {
      initHandler()
    }
  }, [isNotApprovedAcc])

  useEffect(() => {
    loaderContext.toggleLoader(isLoading)
  }, [isLoading, loaderContext])

  if (isLoading) {
    return null
  }

  return (
    <NavigationContainer>
      {
        accId
        ? isNotApprovedAcc
          ? <UserAccountApproveNavigator />
          : <MainNavigator />
        : <AuthNavigation />
      }
    </NavigationContainer>
  );
}

export default RootNavigator
