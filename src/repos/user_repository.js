import React from "react";

import URL_FILE from "../utility/urls";
import CONS from "../utility/constants";
import global from "../utility/global";


export default userRepo = {

  registerUser(data, callback) {

   console.log('dATA SENT: ' + JSON.stringify(data))

    fetch(URL_FILE.urlRegister, {
      method: "POST",
      headers: global.getEncodedHeader(),
      body: data
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("Data from registerUser Api : " + JSON.stringify(responseData));
        var hasError = responseData.error;
        callback(hasError, responseData);

      })
      .catch(err => {
        console.log("response error :: " + err);
        callback(true, global.getExceptionMessage());
      })
      .done();

  },

  doLogin(data, callback) {

   console.log('dATA SENT: ' + JSON.stringify(data))

    fetch(URL_FILE.urlLogin, {
      method: "POST",
      headers: global.getEncodedHeader(),
      body : data
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("Data from doLogin Api : " + JSON.stringify(responseData));
        var hasError = responseData.error;
        callback(hasError, responseData);

      })
      .catch(err => {
        console.log("response error :: " + err);
        callback(true, global.getExceptionMessage());
      })
      .done();

  },


  addAddress(data, callback) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlAddAddress, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from addAddress Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },


   deleteAddress(data, callback,index) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlDeleteAddress, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from deleteAddress Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData,index);
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },


   updateAddress(data, callback) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlUpdateAddress, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from updateAddress Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },


   
   getImpmessage(callback) {
 
     fetch(URL_FILE.urlImpMessage, {
       method: "POST",
       headers: global.getEncodedHeader(),
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from getImpmessage Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },


   forgotPassword(data,callback) {
 
    console.log("Data sent forgotPassword Api : " + JSON.stringify(data));

    fetch(URL_FILE.urlForgotPass, {
      method: "POST",
      headers: global.getEncodedHeader(),
      body:data
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("Data from forgotPassword Api : " + JSON.stringify(responseData));
        var hasError = responseData.error;
        callback(hasError, responseData);
      })
      .catch(err => {
        console.log("response error :: " + err);
        callback(true, global.getExceptionMessage());
      })
      .done();

  },


  getShipmentCharges(data,callback) {
 
    console.log("Data sent getShipmentCharges Api : " + JSON.stringify(data));

    fetch(URL_FILE.urlShipment, {
      method: "POST",
      headers: global.getEncodedHeader(),
      body:data
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("Data from getShipmentCharges Api : " + JSON.stringify(responseData));
        var hasError = responseData.error;
        callback(hasError, responseData);
      })
      .catch(err => {
        console.log("response error :: " + err);
        callback(true, global.getExceptionMessage());
      })
      .done();

  },



  getCoupons(callback) {
 
    fetch(URL_FILE.urlCoupons, {
      method: "POST",
      headers: global.getEncodedHeader(),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("Data from getCoupons Api : " + JSON.stringify(responseData));
        var hasError = responseData.error;
        callback(hasError, responseData);
      })
      .catch(err => {
        console.log("response error :: " + err);
        callback(true, global.getExceptionMessage());
      })
      .done();

  },




  getPayUHash(data,callback,payData) {
 
    console.log("Data sent getPayUHash Api : " + JSON.stringify(data));

    fetch(URL_FILE.urlPayUHash, {
      method: "POST",
      headers: global.getEncodedHeader(),
      body:data
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("Data from urlPayUHash Api : " + JSON.stringify(responseData));
        var hasError = responseData.error;
        callback(hasError, responseData,payData);
      })
      .catch(err => {
        console.log("response error :: " + err);
        callback(true, global.getExceptionMessage());
      })
      .done();

  },


  getOrders(data, callback) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlGetOrders, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from getOrders Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },


   confirmOrder(data, callback) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlConfirmOrder, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from confirmOrder Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },


   getAddresses(data, callback) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlAddresses, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from getAddresses Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },


   getCartCount(data, callback) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlCartCount, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from getCartCount Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },


   getOrderDetails(data, callback) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlGetOrderDetails, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from getOrderDetails Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },


   getPaymentList(callback) {

    // console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlPaymentOptions, {
       method: "POST",
       headers: global.getEncodedHeader(),
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from getPaymentList Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },
 
 
   getPin(data, callback) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlGetPIN, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from getPin Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },
 
    
    


};