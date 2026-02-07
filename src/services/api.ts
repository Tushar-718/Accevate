import apiInstance from './axiosInstance';
import { ENDPOINTS } from '../constants/endpoints';

export const loginApi = async (username: string, password: string): Promise<{ userid: string }> => {
  try {
    const response = await apiInstance.post(ENDPOINTS.LOGIN, { userid: username, password });
    if(response.data.status){
      return response.data;
    }else{
      throw new Error(response.data.msg);
    }
  } catch (error: any) {
    throw error;
  }
};

export const otpApi = async (userId: string, otp: string): Promise<{ token: string }> => {
  try {
    const response = await apiInstance.post(ENDPOINTS.VERIFY_OTP, { userid: userId, otp });
    
    if (response.data.status) {
      return response.data;
    } else {
      throw new Error(response.data.msg || 'Invalid OTP');
    }
  } catch (error: any) {
    throw error;
  }
};

export const getDashboardDataApi = async (token: string): Promise<any> => {
  try {
    const response = await apiInstance.get(ENDPOINTS.DASHBOARD_COLOR, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
