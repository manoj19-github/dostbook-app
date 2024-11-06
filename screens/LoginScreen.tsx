import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, Controller} from 'react-hook-form';
import {useAppState} from '../store/useAppState';
import LoaderKit from 'react-native-loader-kit';
import {RegistrationSchema} from '../formSchema/Registration.formSchema';

type LoginScreenProps = {};
const LoginScreen: FC<LoginScreenProps> = () => {
  const appState = useAppState();
  const FormHandler = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegistrationSchema>) => {
    console.log('values: ', values);
    appState.setIsLoading(true);
    if (appState.isLoading) return;
  };

  return (
    <SafeAreaView style={LoginScreenStyles.container}>
      <View style={LoginScreenStyles.imageWrapper}>
        <Image
          source={require('../assets/dostbook.png')}
          style={LoginScreenStyles.image}
        />
        <Text style={LoginScreenStyles.logoText}>Dostbook</Text>
      </View>
      <View style={LoginScreenStyles.emailInputContainer}>
        <Text style={LoginScreenStyles.mobileLabelText}>
          Enter your email id
        </Text>
        <Controller
          name="email"
          control={FormHandler.control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              readOnly={appState.isLoading}
              value={value}
              keyboardType={'email-address'}
              style={LoginScreenStyles.emailInput}
            />
          )}
        />
        {FormHandler.formState.errors.email?.message ? (
          <Text style={LoginScreenStyles.emailInputHintText}>
            {FormHandler.formState.errors.email?.message}
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View style={LoginScreenStyles.continueWrapper}>
        <TouchableOpacity
          style={LoginScreenStyles.continueButton}
          onPress={FormHandler.handleSubmit(onSubmit)}
          disabled={appState.isLoading}>
          <View style={LoginScreenStyles.continueBtnWrapper}>
            <Text style={LoginScreenStyles.continueText}>Continue</Text>
            {appState.isLoading ? (
              <LoaderKit
                style={LoginScreenStyles.loader}
                name={'BallSpinFadeLoader'} // Optional: see list of animations below
                color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
              />
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const LoginScreenStyles = StyleSheet.create({
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
  emailInputHintText: {
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
  },
  emailInputContainer: {
    width: '85%',
    marginTop: 20,
  },
  nameInputContainer: {
    width: '85%',
    marginTop: 8,
  },
  emailInput: {
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
  emailInputText: {
    fontSize: 18,
    fontWeight: '500',
  },
  logoText: {
    fontSize: 35,
    fontWeight: '500',
    color: '#1C9BF8',
  },
});

export default LoginScreen;
