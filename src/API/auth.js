import _get from 'lodash/get';

import { API } from './API';

import { Reject } from './helpers';

export const googleSso = (payload) =>
  API.post('/customer/auth/google', payload).then(({ ok, data }) => {
    if (ok) return _get(data, 'data', {}) || {};

    return Reject(data);
  });
