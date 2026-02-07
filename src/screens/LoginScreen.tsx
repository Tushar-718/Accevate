import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { setUserId } from '../store/slices/authSlice';
import { loginApi } from '../services/api';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';
import { COMMON_STYLES } from '../styles/commonStyles';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert(STRINGS.ERROR, STRINGS.FILL_ALL_FIELDS);
      return;
    }

    setLoading(true);
    try {
      const { userid } = await loginApi(username, password);
      // Dispatch userId to Redux Auth Slice
      dispatch(setUserId(userid));
      
      setLoading(false);
      navigation.navigate('Otp');
    } catch (error: any) {
      setLoading(false);
      Alert.alert(STRINGS.LOGIN_FAILED, error.message || STRINGS.SOMETHING_WENT_WRONG);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={COMMON_STYLES.container}
    >
      <View style={COMMON_STYLES.card}>
        <Text style={COMMON_STYLES.title}>{STRINGS.WELCOME_BACK}</Text>
        <Text style={COMMON_STYLES.subtitle}>{STRINGS.SIGN_IN_SUBTITLE}</Text>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 8, color: COLORS.text, fontWeight: '600' }}>{STRINGS.USERNAME_LABEL}</Text>
          <TextInput
            style={COMMON_STYLES.input}
            placeholder={STRINGS.USERNAME_PLACEHOLDER}
            placeholderTextColor={COLORS.textSecondary}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 8, color: COLORS.text, fontWeight: '600' }}>{STRINGS.PASSWORD_LABEL}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder={STRINGS.PASSWORD_PLACEHOLDER}
              placeholderTextColor={COLORS.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={COMMON_STYLES.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.surface} />
          ) : (
            <Text style={COMMON_STYLES.buttonText}>{STRINGS.LOGIN_BUTTON}</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  eyeIcon: {
    padding: 16,
  },
});
