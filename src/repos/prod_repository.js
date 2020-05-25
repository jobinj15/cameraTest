import React from "react";

import URL_FILE from "../utility/urls";
import CONS from "../utility/constants";
import global from "../utility/global";


export default userRepo = {

  getCategories(data={}, callback) {

   console.log('dATA SENT: ' + JSON.stringify(data))

    fetch(URL_FILE.urlCategories, {
      method: "GET",
      headers: global.getEncodedHeader(),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("Data from getCategories Api : " + JSON.stringify(responseData));
        var hasError = responseData.error;
        callback(hasError, responseData);

      })
      .catch(err => {
        console.log("response error :: " + err);
        callback(true, global.getExceptionMessage());
      })
      .done();

  },

  getBanners(userId,callback) {

    console.log('dATA SENT: ' + JSON.stringify(userId))

     var headers = global.getEncodedHeader();
     headers['user-id'] = userId;
 
     fetch(URL_FILE.urlGetBanners, {
       method: "GET",
       headers: headers,
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from getBanners Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },
 

  getProducts(data, callback) {

   console.log('dATA SENT: ' + JSON.stringify(data))

    fetch(URL_FILE.urlProductsList, {
      method: "POST",
      headers: global.getEncodedHeader(),
      body : data
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("Data from getProducts Api : " + JSON.stringify(responseData));
        var hasError = responseData.error;
        callback(hasError, responseData);

      })
      .catch(err => {
        console.log("response error :: " + err);
        callback(true, global.getExceptionMessage());
      })
      .done();

  },


  getCart(data, callback) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlGetCart, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from getCart Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },
 


  addToCart(data, callback,index,id) {

    console.log('dATA SENT addToCart: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlAddToCart, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from addToCart Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData,index,id);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },



   removeCart(data, callback,index) {

    console.log('dATA SENT removeCart: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlRemoveCart, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from removeCart Api : " + index);
         var hasError = responseData.error;
        //  callback(hasError, responseData,index);
         callback(index,null,hasError) 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },


   getProductDetails(data, callback) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlProductsDetails, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from getProductDetails Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },



   getProductVariant(data, callback) {

    console.log('dATA SENT: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlProductVariant, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from getProductVariant Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },



   


   updateCart(data, callback,index,id,type) {

    console.log('dATA SENT updateCart: ' + JSON.stringify(data))
 
     fetch(URL_FILE.urlUpdateCart, {
       method: "POST",
       headers: global.getEncodedHeader(),
       body : data
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from updateCart Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData,index,id,type);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, global.getExceptionMessage());
       })
       .done();
 
   },



  


};