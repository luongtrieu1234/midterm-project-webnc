import instance from 'utils/axios/instance.axios';
import { USER } from './_constants';

export const updateUser = (body = {}) => instance.patch(USER.UPDATE, body);
export const getUserInfo = () => instance.get(USER.ME);
export const loginFacebook = (params) => instance.get(USER.LOGIN_FACEBOOK, params);
