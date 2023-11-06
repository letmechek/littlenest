import sendRequest from './send-request';

const BASE_URL = '/api/orders';

export function getCart() {
  return sendRequest(`${BASE_URL}/cart`);
}

export function addItemToCart(babyProductId, selectedSize, selectedColor) {
  return sendRequest(`${BASE_URL}/cart/vehicles/${babyProductId}`, 'POST', { selectedSize, selectedColor });
}

export function setItemQtyInCart(babyProductId, newQty) {
  return sendRequest(`${BASE_URL}/cart/qty`, 'PUT', { babyProductId, newQty });
}

export function checkout(orderId) {
  return sendRequest(`${BASE_URL}/create-checkout-session/${orderId}`, 'POST');
}