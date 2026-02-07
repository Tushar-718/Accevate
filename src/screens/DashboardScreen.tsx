import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logoutAuth, setAuthToken } from '../store/slices/authSlice';
import { setDynamicColors, clearDashboardData } from '../store/slices/dashboardSlice';
import { setUserInfo, clearUserInfo } from '../store/slices/userSlice';
import { getDashboardDataApi } from '../services/api';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';
import { COMMON_STYLES } from '../styles/commonStyles';

export const DashboardScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const storedDynamicColor = useSelector((state: RootState) => state.dashboard.dynamicColor);
  const [loading, setLoading] = useState(false);

  // Use stored color or fallback to primary
  const dynamicColor = storedDynamicColor || COLORS.primary;

  const fetchDashboardColor = async () => {
    setLoading(true);
    try {
      // If token is lost (e.g. reload without persistence hydration), try storage or redirect
      let currentToken = token;
      if (!currentToken) {
        currentToken = await AsyncStorage.getItem('authToken');
        if (currentToken) dispatch(setAuthToken(currentToken)); // Hydrate redux
      }

      if (!currentToken) {
        Alert.alert(STRINGS.SESSION_EXPIRED, STRINGS.LOGIN_AGAIN);
        handleLogout();
        return;
      }
      const data = await getDashboardDataApi(currentToken);
      const { dashboard, user } = data || {};
      
      if (dashboard?.color?.dynamic_color) {
        dispatch(setDynamicColors(dashboard.color.dynamic_color));
      } else {
        console.warn(STRINGS.DYNAMIC_COLOR_MISSING);
      }

      if (user) {
        dispatch(setUserInfo(user));
      } else {
        console.warn(STRINGS.USER_INFO_MISSING);
      }
    } catch (error) {
      console.error(STRINGS.FETCH_ERROR, error);
      Alert.alert(STRINGS.ERROR, STRINGS.UPDATE_ERROR);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchDashboardColor();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userInfo'); 
    dispatch(logoutAuth());
    dispatch(clearUserInfo());
    dispatch(clearDashboardData());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={[COMMON_STYLES.container, { backgroundColor: dynamicColor }]}>
      <StatusBar barStyle="light-content" backgroundColor={dynamicColor} />
      
      <View style={COMMON_STYLES.glassCard}>
        <Text style={COMMON_STYLES.title}>{STRINGS.DASHBOARD_TITLE}</Text>
        <Text style={COMMON_STYLES.subtitle}>
          {STRINGS.DASHBOARD_DESCRIPTION}
        </Text>
        <Text style={{ 
          fontSize: 24,
          fontWeight: '800',
          color: COLORS.text,
          marginBottom: 32,
          letterSpacing: 2
        }}>{dynamicColor}</Text>

        <TouchableOpacity
          style={{
            ...COMMON_STYLES.button,
            backgroundColor: COLORS.surface,
            borderWidth: 1,
            borderColor: COLORS.primary,
            marginBottom: 16
          }}
          onPress={fetchDashboardColor}
          disabled={loading}
        >
          {loading ? (
             <ActivityIndicator color={COLORS.primary} />
          ) : (
            <Text style={{ ...COMMON_STYLES.buttonText, color: COLORS.primary }}>{STRINGS.REFRESH_COLOR}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...COMMON_STYLES.button,
            backgroundColor: COLORS.error,
          }}
          onPress={handleLogout}
        >
          <Text style={{ ...COMMON_STYLES.buttonText, color: 'white' }}>{STRINGS.LOGOUT}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
