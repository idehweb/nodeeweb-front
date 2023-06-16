export const Reject = (data) =>
  Promise.reject(_get(data, 'message', 'مشکلی در دریافت اطلاعات وجود دارد.!'));

export const devMode = process.env.NODE_ENV === 'development';
export const prodMode = process.env.NODE_ENV === 'production';
export const isServer = typeof window === 'undefined';
