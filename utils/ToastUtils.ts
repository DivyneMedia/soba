import Toast from 'react-native-toast-message'
import { CommonBaseResponse } from '../services/api'

export const ErrorToast = (message: string, duration = 2500) => {
  Toast.show({
    text1: message,
    position: 'bottom',
    type: "error",
    visibilityTime: duration,
  })
}

export const WarningToast = (message: string, duration = 2000) => {
  Toast.show({
    text1: message,
    position: 'bottom',
    type: "info",
    visibilityTime: duration,
  })
}

export const SuccessToast = (message: string, duration = 2000) => {
  Toast.show({
    text1: message,
    position: 'bottom',
    type: "success",
    visibilityTime: duration,
  })
}

export const SomethingWentWrongToast = () => {
  ErrorToast("Something went wrong please try again later.")
}

export const showApiResponseMessage = (payload: CommonBaseResponse<any>) => {
  switch (payload.kind) {
    case "ok":
      SuccessToast(payload.data.message)
      break
    case "rejected":
      ErrorToast(payload.data.message)
      break
    case "cannot-connect":
      ErrorToast("Network error")
      break
    case "timeout":
      ErrorToast("Request Timedout.")
      break
    default:
      ErrorToast("Something went wrong please try again.")
      break
  }
}

export const SimpleToast = WarningToast
