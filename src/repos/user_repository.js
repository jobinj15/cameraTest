import React from "react";

import URL_FILE from "../utility/urls";
import GLOBAL from "../utility/global";
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

  postInteresttest(data, callback,isMatched,allData) {

    console.log('dATA SENT postInteresttest: ' + JSON.stringify(data))
 
     fetch(URL_FILE.URLS.urlPostTest, {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         // Authorization: user.accessToken
       },
       body: JSON.stringify(data)
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from postInteresttest Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData,isMatched,allData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, GLOBAL.getExceptionMessage());
       })
       .done();
 
   },


   updateUser(data,userId, callback) {

    console.log('dATA SENT updateUser: ' + JSON.stringify(data))
 
    const urlUpdate  = URL_FILE.URLS.urlUpdateUser + userId;
    console.log('UpdateUser url ' + urlUpdate + '\params: ' + JSON.stringify(data))

    if(!callback)
    return;

     fetch(urlUpdate, {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         // Authorization: user.accessToken
       },
       body: JSON.stringify(data)
     })
       .then(response => response.json())
       .then(responseData => {
         console.log("Data from updateUser Api : " + JSON.stringify(responseData));
         var hasError = responseData.error;
         callback(hasError, responseData);
 
       })
       .catch(err => {
         console.log("response error :: " + err);
         callback(true, GLOBAL.getExceptionMessage());
       })
       .done();
 
   },

   getMatchedDataList(user, callback) {


    fetch(
      URL_FILE.URLS.urlMatchedData +"/"+user.user_id+
        "?filter=matched",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          // Authorization: user.accessToken
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        console.log(
          "Data from getMatchedDataList Api: " + JSON.stringify(responseData)
        );

        var hasError = responseData.error;
        callback(hasError, responseData);
      })
      .catch(err => {
        console.log("response error :: " + err);
        callback(true, GLOBAL.getExceptionMessage());
      })
      .done();
  },

  // postInteresttest(data, callback) {

  //   console.log('postInteresttest url: ' + JSON.stringify(URL_FILE.URLS.urlPostTest))
  //   console.log('postInteresttest data: ' + JSON.stringify(data))
 
  //    fetch(URL_FILE.URLS.urlPostTest, {
  //      method: "POST",
  //      // headers: GLOBAL.getEncodedHeader(),
  //      headers: {
  //        Accept: "application/json",
  //        "Content-Type": "application/json",
  //        // Authorization: user.accessToken
  //      },
  //      body: JSON.stringify(data)
  //    })
  //      .then(response => response.json())
  //      .then(responseData => {
  //        console.log("Data from postInteresttest Api : " + JSON.stringify(responseData));
  //        var hasError = responseData.error;
  //        callback(hasError, responseData);
 
  //      })
  //      .catch(err => {
  //        console.log("response error :: " + err);
  //        callback(true, GLOBAL.getExceptionMessage());
  //      })
  //      .done();
 
  //  },


  getUsersData(callback) {

  //  console.log('getUsersData SENT : ' + JSON.stringify(user))

    fetch(URL_FILE.URLS.urlViewUsers, {
      method: "GET",
      // headers: GLOBAL.getEncodedHeader(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: user.accessToken
      },

    })
      .then(response => response.json())
      .then(responseData => {
        console.log("Data from getUsersData Api : " + JSON.stringify(responseData));
        var hasError = responseData.error;
        callback(hasError, responseData);

      })
      .catch(err => {
        console.log("response error :: " + err);
        callback(true, GLOBAL.getExceptionMessage());
      })
      .done();

  },

  getAnswers(subCatId,callback) {

     console.log('getUsersData SENT : ' + URL_FILE.URLS.urlAnswers  + subCatId)
  
      fetch(URL_FILE.URLS.urlAnswers  + subCatId, {
        method: "GET",
        // headers: GLOBAL.getEncodedHeader(),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: user.accessToken
        },
  
      })
        .then(response => response.json())
        .then(responseData => {
          console.log("Data from getAnswers Api : " + JSON.stringify(responseData));
          var hasError = responseData.error;
          callback(hasError, responseData);
  
        })
        .catch(err => {
          console.log("response error :: " + err);
          callback(true, GLOBAL.getExceptionMessage());
        })
        .done();
  
    },

    getYesNoQuestions(userId,callback) {
      
      const UrlYesNo = URL_FILE.URLS.urlYesNoQuestions+'?user_id='+userId;
      console.log('getYesNoQuestions Url : ' + UrlYesNo)
   
       fetch(UrlYesNo, {
         method: "GET",
         // headers: GLOBAL.getEncodedHeader(),
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
           // Authorization: user.accessToken
         },
   
       })
         .then(response => response.json())
         .then(responseData => {
           console.log("Data from getYesNoQuestions Api : " + JSON.stringify(responseData));
           var hasError = responseData.error;
           callback(hasError, responseData);
   
         })
         .catch(err => {
           console.log("response error :: " + err);
           callback(true, GLOBAL.getExceptionMessage());
         })
         .done();
   
     },

     getUserList(user,data,callback) {
      
      const UrlUserList = URL_FILE.URLS.urlGetUserList+'?type='+data.type+"&page="+data.offset+"&user_id="+user.user_id;
      console.log('getUserList Url : ' + UrlUserList)
     
   
       fetch(UrlUserList, {
         method: "GET",
         // headers: GLOBAL.getEncodedHeader(),
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
           // Authorization: user.accessToken
         },
   
       })
         .then(response => response.json())
         .then(responseData => {
           console.log("Data from getUserList Api : " + JSON.stringify(responseData));
           var hasError = responseData.error;
           callback(hasError, responseData);
   
         })
         .catch(err => {
           console.log("response error :: " + err);
           callback(true, GLOBAL.getExceptionMessage());
         })
         .done();
   
     },
     getStudentDetails(user,data,callback) {
      
      const UrlStudentDetails = URL_FILE.URLS.urlGetStudentDetails+data.userId;
      console.log('getStudentDetails Url : ' + UrlStudentDetails)
   
       fetch(UrlStudentDetails, {
         method: "GET",
         // headers: GLOBAL.getEncodedHeader(),
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
           // Authorization: user.accessToken
         },
   
       })
         .then(response => response.json())
         .then(responseData => {
           console.log("Data from getStudentDetails Api : " + JSON.stringify(responseData));
           var hasError = responseData.error;
           callback(hasError, responseData);
   
         })
         .catch(err => {
           console.log("response error :: " + err);
           callback(true, GLOBAL.getExceptionMessage());
         })
         .done();
   
     },

    getCategories(callback) {

      //  console.log('getUsersData SENT : ' + JSON.stringify(user))
    
        fetch(URL_FILE.URLS.urlCategories, {
          method: "GET",
          // headers: GLOBAL.getEncodedHeader(),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: user.accessToken
          },
    
        })
          .then(response => response.json())
          .then(responseData => {
            console.log("Data from urlCategories Api : " + JSON.stringify(responseData));
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