/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import colors from '../constants/colors';
import BoldText from './BoldText';
import RegularText from './RegularText';

type ChatMessageItemProps = {
    currUserId: string
    senderId: string
    message: string
    messageTime: any
    senderName: string
}

const ChatMessageItem = (props: ChatMessageItemProps) => {
    const {
        currUserId,
        message,
        messageTime,
        senderId,
        senderName
    } = props

    return (
      <View style={{flex: 1}}>
        {currUserId.localeCompare(senderId) === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              marginBottom: 3,
              marginTop: 5,
            }}>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginRight: 10,
                borderRadius: 10,
                maxWidth: '80%',
                backgroundColor: colors.grey,
              }}>
              <RegularText style={{color: colors.primary}}>
                {message}
              </RegularText>
                <View style={{alignSelf: 'flex-end', marginTop: 5}}>
                    <RegularText style={{fontSize: 10}}>
                        {"08:30"}
                    </RegularText>
                </View>
            </View>
            
          </View>
        ) : (
          <View style={{flex: 1, alignItems: 'flex-start', marginVertical: 5}}>
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginLeft: 10,
                borderRadius: 10,
                maxWidth: '80%',
                backgroundColor: colors.primary,
              }}>
              {/* {senderName && (
                <RegularText style={{fontSize: 12}}>
                  {senderName}
                </RegularText>
              )} */}
              <View style={{paddingRight: 10, paddingBottom: 5}}>
                <RegularText
                  style={{fontSize: 14, color: colors.white}}>
                  {message}
                </RegularText>
                <View style={{alignSelf: 'flex-end', marginTop: 5}}>
                    <RegularText style={{fontSize: 10, color: colors.white}}>
                        {"08:30"}
                    </RegularText>
                </View>
              </View>
            </View>
            {/* <View style={{marginLeft: 10}}>
              <RegularText style={{fontSize: 10}}>
                {messageTime}
              </RegularText>
            </View> */}
          </View>
        )}
      </View>
    );
}

export default ChatMessageItem;
