import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {FC, useState} from 'react';
import {z} from 'zod';
import OTPTextInput from 'react-native-otp-textinput';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, Controller} from 'react-hook-form';
import {useAppState} from '../store/useAppState';

type OTPScreenProps = {};
const OTPScreen: FC<OTPScreenProps> = () => {
  const appState = useAppState();
  const [code, setcode] = useState<string>('');

  const onSubmit = (values: z.infer<typeof OTPSchema>) => {
    console.log('values: ', values);
    appState.setIsLoading(true);
    if (appState.isLoading) return;
  };

  return (
    <SafeAreaView style={OTPScreenStyles.container}>
      <View style={OTPScreenStyles.imageWrapper}>
        <Image
          source={require('../assets/dostbook.png')}
          style={OTPScreenStyles.image}
        />
        <Text style={OTPScreenStyles.logoText}>Dostbook</Text>
      </View>
      <View style={OTPScreenStyles.mobileInputContainer}>
        <Text style={OTPScreenStyles.mobileLabelText}>Enter your OTP</Text>
        <View>
          <OTPTextInput
            handleTextChange={value => {}}
            inputCount={5}
            inputCellLength={1}
            tintColor="#4984CA72"
            keyboardType="default"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const OTPScreenStyles = StyleSheet.create({
  otpContainer: {
    width: '85%',
    marginHorizontal: 'auto',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueWrapper: {
    marginTop: 20,
    width: '84%',
  },
  mobileInputHintText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 5,
  },
  continueBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#1C9BF8',
    paddingVertical: 10,
    borderRadius: 10,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  activityIndicator: {
    marginLeft: 30,
    color: 'white',
  },
  loader: {
    width: 25,
    height: 25,
    marginLeft: 8,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  imageWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  mobileInputContainer: {
    width: '85%',
    marginBottom: '30%',
  },
  mobileInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#1C9BF8',
  },
  mobileLabelText: {
    fontSize: 15,
    color: 'gray',
    marginLeft: 5,
    marginVertical: 1,
  },
  mobileInputText: {
    fontSize: 18,
    fontWeight: '500',
  },
  logoText: {
    fontSize: 35,
    fontWeight: '500',
    color: '#1C9BF8',
  },
});

export default OTPScreen;
