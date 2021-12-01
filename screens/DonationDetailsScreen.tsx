import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import BoldText from "../components/BoldText";
import CustomBackdrop from "../components/CustomBackdrop";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import RoundedInputButton from "../components/RoundedInputButton";
import colors from "../constants/colors";

type DonationDetailsScreenProps = {
    navigation: any
    route: any
}

const DonationDetailsScreen = (props: DonationDetailsScreenProps) => {
    const { navigation, route } = props
    const params = route?.params
    const { description, logo, onOpen, origin, title } = params

    const [amount, setAmount] = useState('')
    const [payWithCreditDebit, setPayWithCreditDebit] = useState(false)

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['70%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);

    const makePamentPressHandler = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, [])

    const closeBottomSheetHandler = useCallback(() => {
        payWithCreditDebit && setPayWithCreditDebit(false)
        !payWithCreditDebit && bottomSheetModalRef.current?.close();
    }, [payWithCreditDebit])

    const renderBottomSheetHandler = useMemo(() => {
        return (
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backdropComponent={CustomBackdrop}
                enablePanDownToClose={true}
            >
                <View
                    style={{
                        flex: 1,
                        minHeight: '100%',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: 20,
                            paddingTop: 10
                        }}
                    >
                        {
                            payWithCreditDebit
                            ?
                                <>
                                    <BoldText>{"Input Credit Card Details"}</BoldText>
                                    <RoundedInput
                                        placeholder="Card Number"
                                        value={amount}
                                        onChangeText={enteredText => setAmount(enteredText)}
                                        onSubmitEditing={() => {}}
                                        maxLength={16}
                                        style={{  }}
                                        keyboardType="number-pad"
                                    />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <RoundedInputButton
                                            placeholder="Expiry Date"
                                            onPress={() => {}}
                                            value={''}
                                            style={{ flex: 0.45 }}
                                            hideIcon
                                        />
                                        {/* <RoundedInputButton
                                            placeholder="CVC"
                                            onPress={() => {}}
                                            value={''}
                                            style={{ flex: 0.45 }}
                                            hideIcon
                                        /> */}
                                        <RoundedInput
                                            placeholder="CVC"
                                            value={amount}
                                            onChangeText={enteredText => setAmount(enteredText)}
                                            onSubmitEditing={() => {}}
                                            maxLength={50}
                                            style={{ flex: 0.45 }}
                                            keyboardType="default"
                                        />
                                    </View>
                                    <RoundedInput
                                        placeholder="Full Name"
                                        value={amount}
                                        onChangeText={enteredText => setAmount(enteredText)}
                                        onSubmitEditing={() => {}}
                                        maxLength={50}
                                        style={{  }}
                                        keyboardType="default"
                                    />
                                    <RoundedInput
                                        placeholder="Zip Code"
                                        value={amount}
                                        onChangeText={enteredText => setAmount(enteredText)}
                                        onSubmitEditing={() => {}}
                                        maxLength={6}
                                        style={{  }}
                                        keyboardType="number-pad"
                                        returnKeyType="done"
                                    />
                                </>
                            :
                                <>
                                    <BoldText>{"Select Payment Method"}</BoldText>
                                    <RoundedButton
                                        text="Credit or Debit Card"
                                        onPress={setPayWithCreditDebit.bind(null, true)}
                                        style={{ backgroundColor: colors.grey, marginTop: 20 }}
                                        textStyle={{ color: colors.primary }}
                                    />
                                    <RoundedButton
                                        text="Paypal (sobadallas@yahoo.com)"
                                        onPress={closeBottomSheetHandler}
                                        style={{ backgroundColor: colors.grey, marginTop: 20 }}
                                        textStyle={{ color: colors.primary }}
                                    />
                                    <RoundedButton
                                        text="Zelle (sobadallas@yahoo.com)"
                                        onPress={closeBottomSheetHandler}
                                        style={{ backgroundColor: colors.grey, marginTop: 20 }}
                                        textStyle={{ color: colors.primary }}
                                    />
                                    <RoundedButton
                                        text="CashApp ($Sobadallas1)"
                                        onPress={closeBottomSheetHandler}
                                        style={{ backgroundColor: colors.grey, marginTop: 20 }}
                                        textStyle={{ color: colors.primary }}
                                    />
                                </>
                        }
                    </View>
                    <RoundedButton
                        text={payWithCreditDebit ? "Pay" : "Back"}
                        onPress={closeBottomSheetHandler}
                        style={{ borderRadius: 0 }}
                        // textStyle={{ color: colors.primary }}
                    />
                </View>
            </BottomSheetModal>
        )
    }, [closeBottomSheetHandler, payWithCreditDebit])

    return (
        <BottomSheetModalProvider>
            {renderBottomSheetHandler}
        <ScrollView style={styles.root} contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.topContent}>
                <Image
                    style={{ height: 34, width: 34, borderRadius: 30, overflow: 'hidden' }}
                    source={logo}
                    resizeMode="contain" />
                <View style={{ flex: 1, marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <BoldText style={{ fontSize: 12 }}>{title}</BoldText>
                    <RegularText style={{ fontSize: 10 }}>{origin}</RegularText>

                    <RegularText style={{ marginTop: 15 }}>
                        {
                            "This is a mandatory condolence drive for Soban 4901, William Etta (aka Ben Mabrouk), of SOBA ’85 and SOBA Dallas, who lost his mother on Wednesday, September 22, 2021, in the UK. The window for this drive is Thursday, October 28, 2021 to Saturday, November 27, 2021"
                        }
                    </RegularText>
                    <RegularText style={{  }}>{"Per bylaws, membership contribution is $125"}</RegularText>

                    <RegularText style={{ marginTop: 20 }}>{"Sobanly,"}</RegularText>
                    <RegularText style={{  }}>{"Financial Team"}</RegularText>
                </View>
            </View>
            <View style={styles.bottomContent}>
                <View style={{ flex: 1, paddingHorizontal: 25 }}>
                    <BoldText style={{ alignSelf: 'center', textAlign: 'center' }}>{"Amount of Payment"}</BoldText>
                    <RegularText style={{ marginTop: 5 }}>
                        {"Please input the amount you want to make for this donation."}
                    </RegularText>
                    <RoundedInput
                        placeholder="Amount"
                        value={amount}
                        onChangeText={enteredText => setAmount(enteredText)}
                        onSubmitEditing={() => {}}
                        maxLength={10}
                        style={{  }}
                        keyboardType="number-pad"
                    />
                </View>
                <RoundedButton
                    text="Make Payment"
                    onPress={makePamentPressHandler}
                    style={{ borderRadius: 0 }}
                />
            </View>
        </ScrollView>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    },
    titleContainer: {

    },
    topContent: {
        flex: 0.6,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 15,
        marginVertical: 15,
        backgroundColor: colors.grey,
        borderRadius: 10,
        margin: 10
    },
    bottomContent: {
        flex: 0.4,
    }
})

export default DonationDetailsScreen
