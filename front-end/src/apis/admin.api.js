import instance from 'utils/axios/instance.axios';
import { ADMIN } from './_constants';
export const uploadFileUserList = (body = {}) =>
  instance.post(ADMIN.POST_UPLOAD_FILE_USER_LIST, body);
