/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Sheharyar Naseer (@sheharyarn)
 * @license MIT
 *
 */

import axios from 'axios';
import {TOKOPEDIA_TEST_API} from './constants';

/**
 * Request Wrapper with default success/error actions
 */
const request = async function (options) {
  /**
   * Create an Axios Client with defaults
   */
  const requestHeaders = options.customHeaders || {
    'Content-type': 'application/json',
    Accept: 'application/json',
  };
  /*
   * Put authorization condition like below
   */
  const client = axios.create({
    baseURL: options.MAIN_URL || TOKOPEDIA_TEST_API,
  });
  const onSuccess = function (response) {
    // console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = function (error) {
    console.log('Request Failed:', error.config);


    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
