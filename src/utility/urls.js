import React from 'react';

const baseUrl = "http://www.test.com/app_api/";
// git remote add origin https://jobinj151@bitbucket.org/rahulbawaskar/reactnativeapp


export default urls = {
  urlLogin: baseUrl + "login/checkUser",
  urlRegister: baseUrl + 'login/register',
  urlCategories: baseUrl + 'categories/categories',
  urlProductsList: baseUrl + 'products/products',
  urlProductsSearch: baseUrl + 'products/search',
  urlProductsDetails: baseUrl + 'products/productdetails',
  urlAddToCart: baseUrl + 'cart/add',
  urlUpdateCart: baseUrl + 'cart/update',
  urlRemoveCart: baseUrl + 'cart/remove',
  urlGetCart: baseUrl + 'cart/get',
  urlCartCount: baseUrl + 'cart/count',
  urlGetBanners: baseUrl + 'dashboard/get_banners',
  urlRemoveCart: baseUrl + 'cart/remove',
  urlGetOrderDetails: baseUrl + 'order/get',
  urlGetOrders: baseUrl + 'order/getall',
  urlAddresses: baseUrl + 'address/get',
  urlAddAddress: baseUrl + 'address/add',
  urlGetPIN: baseUrl + 'pincode/get',
  urlDeleteAddress: baseUrl + 'address/remove',
  urlUpdateAddress: baseUrl + 'address/update',
  urlConfirmOrder: baseUrl + 'order/place',
  urlProductVariant: baseUrl + 'products/getcatloguedetailsbyoption',
  urlPaymentOptions: baseUrl + 'payment_mode/payment_mode',
  urlImpMessage: baseUrl + 'checkImportantMessage/checkImportantMessage',
  urlForgotPass: baseUrl + 'login/forgot_password',
  urlPayUHash: baseUrl + '/payu_hash/gethash',
  urlGetFilters: baseUrl + '/filter/filters',
  urlShipment: baseUrl + '/shipment_charges/get',
  urlCoupons: baseUrl + '/coupons/coupons',
  urlBrands: baseUrl + '/masters/brands',
};

