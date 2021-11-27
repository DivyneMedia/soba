import React from "react";
import { View }  from 'react-native';
import BoldText from "../components/BoldText";

type ChatScreenProps = {

}

const ChatScreen = (props: ChatScreenProps) => {
    return (
        <View>
            <BoldText>Chat Screen</BoldText>
        </View>
    )
}

export default ChatScreen
