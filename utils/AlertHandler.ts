import { Alert, Linking } from "react-native"

type buttonType = "destructive" | "cancel" | "default"

type buttonModel = {
  text: string
  style: buttonType
  onPress: () => any
}

const alertHandler = (title: string, message: string, buttons: buttonModel[]) => {
  Alert.alert(title, message, buttons)
}

type promiseReturnType = "resolve" | "reject"

type alertButtonModel = {
  buttonText: string
  //   buttonReturnType: promiseReturnType
  buttonReturnValue: any
  buttonType: buttonType
}

// pass max 3 buttons for alert buttons..
const promiseAlertHandler = async (title: string, message: string, buttons: alertButtonModel[]) => {
  return new Promise((resolve, reject) => {
    const buttonsArr: buttonModel[] = []

    buttons.map((button) => {
      buttonsArr.push({
        text: button.buttonText,
        onPress: () => {
          resolve(button.buttonReturnValue)
          //   if (button.buttonReturnType === "resolve") {
          //     resolve(button.buttonReturnValue)
          //   } else {
          //     resolve(button.buttonReturnValue)
          //   }
        },
        style: button.buttonType,
      })
    })
    alertHandler(title, message, buttonsArr)
  })
}

const openSettingsHandler = async () => {
  try {
    await Linking.openSettings()
  } catch (err) {
    console.log("[openSettingsHandler] Error : ", err.message)
  }
}

export { alertHandler, promiseAlertHandler, openSettingsHandler }
