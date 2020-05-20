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
        callback(true, GLOBAL.getExceptionMessage());
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
        callback(true, GLOBAL.getExceptionMessage());
      })
      .done();

  },



};