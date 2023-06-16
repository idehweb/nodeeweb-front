import { create } from 'apisauce';
import queryString from 'query-string';

// TODO: read from localStorage
import store from '@/functions/store';

import config from '@/config';

export const BASE_URL = `${config.BASE_URL}/customer`;

// define the api
export const API = create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },

  paramsSerializer: (p) =>
    queryString.stringify(p, {
      arrayFormat: 'comma',
      skipNull: true,
      skipEmptyString: true,
    }),
});

// add Authorization token to header
API.addRequestTransform((req) => {
  // req.headers.Authorization = `Bearer ${localStorage.token || ''}`;
  // TODO:
  req.headers.token = store.getState().store.user.token || '';
});

// if status === 401 redirect to homepage
API.addResponseTransform((res) => {
  if (!res.ok) console.error('API error =>', res);

  if ([401, 403].includes(res.status)) {
    // if (res.status === 401) {
    //   localStorage.removeItem('token');
    //   // redux-persist storage
    //   localStorage.removeItem('persist:root');
    // }
    // if (window.location.pathname !== '/') window.location.replace('/');
  }
});
