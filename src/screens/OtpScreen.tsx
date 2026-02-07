import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken } from '../store/slices/authSlice';
import { otpApi } from '../services/api';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';
import { COMMON_STYLES } from '../styles/commonStyles';

export const OtpScreen = () => {
  const userId = useSelector((state: any) => state.auth.userid);
  const navigation = useNavigation<any>();

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  const dispatch = useDispatch();

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      Alert.alert(STRINGS.ERROR, STRINGS.VALID_OTP_REQUIRED);
      return;
    }

    setLoading(true);
    try {
      const { token } = await otpApi(userId, otpString);
      
      // Store in Redux Auth Slice
      dispatch(setAuthToken(token));
      // Persist token for auto-login
      await AsyncStorage.setItem('authToken', token);
      
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (error: any) {
      setLoading(false);
      setOtp(new Array(6).fill('')); // Reset OTP input
      inputs.current[0]?.focus(); // Move focus to first box
      Alert.alert(STRINGS.VERIFICATION_FAILED, error.message || STRINGS.INVALID_OTP);
    }
  };

  const handleTextChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Filter non-numeric
    if (/[^0-9]/.test(text) && text !== '') {
      return;
    }

    // Move to next input if text is entered
    if (text.length === 1 && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    
    // Move to previous input if text is cleared (Backspace on filled input)
    if (text.length === 0 && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    // Auto submit if last digit entered
    if (text.length === 1 && index === 5) {
      // optional: trigger verify here
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      // Only handle if current is empty (Backspace on empty input)
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={COMMON_STYLES.container}
    >
      <View style={COMMON_STYLES.card}>
        <Text style={COMMON_STYLES.title}>{STRINGS.VERIFICATION_TITLE}</Text>
        <Text style={COMMON_STYLES.subtitle}>
          {STRINGS.ENTER_CODE_SUBTITLE}
        </Text>

        <View style={localStyles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputs.current[index] = ref; }}
              style={[
                localStyles.otpBox,
                { borderColor: digit ? COLORS.primary : COLORS.border }
              ]}
              value={digit}
              onChangeText={(text) => handleTextChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              textAlign="center"
              caretHidden={false}
            />
          ))}
        </View>

        <TouchableOpacity
          style={COMMON_STYLES.button}
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.surface} />
          ) : (
            <Text style={COMMON_STYLES.buttonText}>{STRINGS.VERIFY_BUTTON}</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
});
