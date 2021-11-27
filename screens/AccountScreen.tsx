import React from "react";
import { View }  from 'react-native';
import BoldText from "../components/BoldText";

type AccountScreenProps = {

}

const AccountScreen = (props: AccountScreenProps) => {
    return (
        <View>
            <BoldText>Account Screen</BoldText>
        </View>
    )
}

export default AccountScreen
