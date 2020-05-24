import React from 'react';

const baseUrl = "http://www.appoctet.com/ecommerce/app_api/";

// appoctet@gmail.com
// appoctet@2020
//https://www.freecodecamp.org/forum/t/push-a-new-local-branch-to-a-remote-git-repository-and-track-it-too/13222
// cd D:/Android/Projects/srinivas_guni-ecommerce-050e8e904900/srinivas_guni-ecommerce-050e8e904900

// git push -u origin V1Jobin

export default urls = {
  urlLogin: baseUrl + "login/checkUser",
  urlRegister: baseUrl + 'login/register',
  urlCategories: baseUrl + 'categories/categories',
  urlProductsList: baseUrl + 'products/products',
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
  urlPaymentOptions: baseUrl + 'payment_mode/payment_mode',
};












{/* <TouchableWithoutFeedback
onPress={() => {
}}
>
<Card style={{ flex: 1, borderRadius: 0 }} key={index}>

    <View
        style={{ padding: 10 }}
    >



           
    </View>

</Card>

</TouchableWithoutFeedback> */}