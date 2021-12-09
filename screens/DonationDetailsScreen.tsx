import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, Keyboard, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import BoldText from "../components/BoldText";
import CustomBackdrop from "../components/CustomBackdrop";
import RegularText from "../components/RegularText";
import RoundedButton from "../components/RoundedButton";
import RoundedInput from "../components/RoundedInput";
import RoundedInputButton from "../components/RoundedInputButton";
import colors from "../constants/colors";
import { ErrorToast } from "../utils/ToastUtils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import images from "../assets/images";


type DonationDetailsScreenProps = {
    navigation: any
    route: any
}

const DonationDetailsScreen = (props: DonationDetailsScreenProps) => {
    const { navigation, route } = props
    const params = route?.params
    const { description, logo, onOpen, origin, title } = params

    const [amount, setAmount] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvc, setCVC] = useState('')
    const [fullname, setFullname] = useState('')
    const [zipCode, setZipCode] = useState('')

    const [payWithCreditDebit, setPayWithCreditDebit] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showPaymentDone, setShowPaymentDone] = useState(false)
    
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['70%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    
    const closeBottomSheetHandler = useCallback(() => {
        payWithCreditDebit && setPayWithCreditDebit(false)
        !payWithCreditDebit && bottomSheetModalRef.current?.close();
        setShowPaymentDone(false)
    }, [payWithCreditDebit])
    
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        if (index === -1) {
            setPayWithCreditDebit(false)
            setCardNumber('')
            setExpiryDate('')
            setCVC('')
            setFullname('')
            setZipCode('')
        }
    }, []);

    const makePamentPressHandler = useCallback(() => {
        if (!amount || !amount.trim()) {
            ErrorToast("Please enter amount to continue.")
            return
        }
        if (isNaN(+amount)) {
            ErrorToast("Please enter a valid amount.")
            return
        }
        bottomSheetModalRef.current?.present();
        Keyboard.dismiss()
    }, [amount])

    const payWithCardHandler = useCallback(() => {
        setShowPaymentDone(true)
    }, [])

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
                    {
                        showPaymentDone
                        ?
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    source={images.ic_done}
                                    style={{
                                        height: 80,
                                        width: 80
                                    }}
                                    resizeMode="contain"
                                />
                                <BoldText style={{ marginTop: 50 }}>{"Awesome,"}</BoldText>
                                <BoldText style={{ }}>{"Your payment has been done!"}</BoldText>
                            </View>
                        :
                            <ScrollView
                                style={{
                                    flex: 1,
                                }}
                                contentContainerStyle={{
                                    paddingHorizontal: 20,
                                    paddingTop: 10,
                                    // marginBottom: 10
                                }}
                            >
                                {
                                    payWithCreditDebit
                                    ?
                                        <>
                                            <BoldText>{"Input Credit Card Details"}</BoldText>
                                            <RoundedInput
                                                placeholder="Card Number"
                                                value={cardNumber}
                                                onChangeText={enteredText => setCardNumber(enteredText)}
                                                onSubmitEditing={() => {}}
                                                maxLength={16}
                                                style={{  }}
                                                keyboardType="number-pad"
                                            />
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <RoundedInputButton
                                                    placeholder="Expiry Date"
                                                    onPress={() => setShowDatePicker(true)}
                                                    value={expiryDate}
                                                    style={{ flex: 0.45 }}
                                                    // hideIcon
                                                />
                                                <RoundedInput
                                                    placeholder="CVC"
                                                    value={cvc}
                                                    onChangeText={enteredText => setCVC(enteredText)}
                                                    onSubmitEditing={() => {}}
                                                    maxLength={3}
                                                    style={{ flex: 0.45 }}
                                                    keyboardType="number-pad"
                                                />
                                            </View>
                                            <RoundedInput
                                                placeholder="Full Name"
                                                value={fullname}
                                                onChangeText={enteredText => setFullname(enteredText)}
                                                onSubmitEditing={() => {}}
                                                maxLength={30}
                                                style={{  }}
                                                keyboardType="default"
                                            />
                                            <RoundedInput
                                                placeholder="Zip Code"
                                                value={zipCode}
                                                onChangeText={enteredText => setZipCode(enteredText)}
                                                onSubmitEditing={() => {}}
                                                maxLength={6}
                                                style={{ marginBottom: 5 }}
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
                            </ScrollView>
                    }
                    {
                        payWithCreditDebit && !showPaymentDone
                        ?
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <RoundedButton
                                    text={"Back"}
                                    onPress={closeBottomSheetHandler}
                                    style={{ width: "49.9%", borderRadius: 0,  }}
                                />
                                <RoundedButton
                                    text={"Pay"}
                                    onPress={payWithCardHandler}
                                    style={{ width: "49.9%", borderRadius: 0,  }}
                                />
                            </View>
                        : <RoundedButton
                                text={showPaymentDone ? "Done" : "Back"}
                                onPress={closeBottomSheetHandler}
                                style={{ borderRadius: 0 }}
                            />
                    }
                    
                </View>
            </BottomSheetModal>
        )
    }, [closeBottomSheetHandler, showPaymentDone, payWithCreditDebit, cardNumber, expiryDate, cvc, fullname, zipCode, payWithCardHandler])

    return (
        <BottomSheetModalProvider>
            {renderBottomSheetHandler}
            <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                onConfirm={date => {
                    setExpiryDate(new Date(date).toLocaleDateString())
                    setShowDatePicker(false)
                }}
                onCancel={setShowDatePicker.bind(null, false)}
            />
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
            </View>
        </ScrollView>
        <RoundedButton
                text="Make Payment"
                onPress={makePamentPressHandler}
                style={{ borderRadius: 0 }}
            />
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
