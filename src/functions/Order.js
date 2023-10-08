import { ApiUrl } from './index';
import { getData, postData } from './utils';

export async function getProductRecoms(cart) {
  const { data } = await postData(
    `${ApiUrl}/order/recommendation`,
    { cart },
    true,
  );

  return data;
}
