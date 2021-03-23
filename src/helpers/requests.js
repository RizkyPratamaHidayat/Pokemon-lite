import Wrap from './axiosWrapper';
import {
  TOKOPEDIA_TEST_API
} from './constants';
/**
 * Request example with custom handles code, custom headers and form data body to handle x-www-formurlencoded
 */

// export const login = (body) => {
//   const formData = toFormData(body);
//   return Wrap({
//     url: '/api/login',
//     method: 'POST',
//     data: formData,
//     customHeaders: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     handles: [401],
//   });
// };


export const getData = (params) => {
  return Wrap({
    url: '/pokemon',
    method: 'GET',
    params
  });
};


export const getDataDetail = (params) => {
  return Wrap({
    url: '/pokemon/'+ params,
    method: 'GET',
  });
};