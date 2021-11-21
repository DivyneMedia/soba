import { Linking } from "react-native"

export const openLink = async url => {
  if (await Linking.canOpenURL(url)) {
    return await Linking.openURL(url)
  }
}

export const mailHandler = async mailId => {
  await openLink(`mailto:${mailId}`)
}

export const contactHandler = async phoneNumber => {
  await openLink(`tel:${phoneNumber}`)
}
