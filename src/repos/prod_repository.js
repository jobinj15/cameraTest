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
        callback(true, GLOBAL.getExceptionMessage());
      })
      .done();

  },



};