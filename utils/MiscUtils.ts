import { Dimensions, Platform } from "react-native";

export const { width, height } = Dimensions.get("window")

export const isIos = Platform.OS === "ios"

export const keyExtractHandler = (item: any, index: number) => index.toString()