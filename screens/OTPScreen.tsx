/* eslint-disable react-hooks/exhaustive-deps */
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
import LoaderKit from 'react-native-loader-kit';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {z} from 'zod';
import OTPTextInput from 'react-native-otp-textinput';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, Controller} from 'react-hook-form';
import {useAppState} from '../store/useAppState';
import Toast from 'react-native-toast-message';
import {useStoreManagement} from '../store/useStoreManagement';
import {OTPSchemaScreen} from '../formSchema/OTPSchema.formSchema';
import useOTPService from '../services/useOTPService';
import {resetAndNavigate} from '../utils/NavigationUtils';

type OTPScreenProps = {
  navigation?: any;
};
const OTPScreen: FC<OTPScreenProps> = ({navigation}) => {
  const appState = useAppState();

  const storeManagement = useStoreManagement();
  const otpService = useOTPService();
  const FormHandler = useForm<z.infer<typeof OTPSchemaScreen>>({
    resolver: zodResolver(OTPSchemaScreen),
    defaultValues: {
      email: '',
      otp: '',
    },
  });

  const onSubmitHandler = (values: z.infer<typeof OTPSchemaScreen>) => {
    if (appState.isLoading) return;
    if (storeManagement.currEmail === '') {
      resetAndNavigate('RegisterScreen');
      return Toast.show({
        type: 'error',
        text1: 'Please Register Yourself Properly',
        text2: 'Please try again',
      });
    }
    appState.setIsLoading(true);

    otpService.mutate(values, {
      onSuccess: _result => {
        Toast.show({
          type: 'success',
          text1: 'Successfully Verified Your Email',
          text2: 'Welcome to Dostbook',
        });

        resetAndNavigate('DashboardScreen');
      },
      onError: _error => {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: 'Please try again',
        });
      },
      onSettled: () => {
        appState.setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    FormHandler.setValue('email', storeManagement.currEmail);
  }, [FormHandler, storeManagement.currEmail]);

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
          <Controller
            name="otp"
            control={FormHandler.control}
            render={({field: {onChange, value}}) => (
              <OTPTextInput
                handleTextChange={value => onChange(value)}
                defaultValue={value}
                inputCount={5}
                inputCellLength={1}
                tintColor="#4984CA72"
                keyboardType="default"
                autoFocus
              />
            )}
          />
        </View>
        <View style={OTPScreenStyles.continueWrapper}>
          <TouchableOpacity
            style={OTPScreenStyles.continueButton}
            onPress={FormHandler.handleSubmit(onSubmitHandler)}
            disabled={
              appState.isLoading || FormHandler.watch('otp').length !== 5
            }>
            <View style={OTPScreenStyles.continueBtnWrapper}>
              <Text style={OTPScreenStyles.continueText}>Continue</Text>
              {appState.isLoading ? (
                <LoaderKit
                  style={OTPScreenStyles.loader}
                  name={'BallSpinFadeLoader'} // Optional: see list of animations below
                  color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
                />
              ) : (
                <></>
              )}
            </View>
          </TouchableOpacity>
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
    marginTop: 40,
    width: '100%',
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
