import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import constants from "../../../utility/constants";
import global from "../../../utility/global";
import prod_repository from "../../../repos/prod_repository";
import user_repository from "../../../repos/user_repository";

class ProductDetailsStore {

  @observable loading = false;
  @observable isApiLoaded = false;
  @observable product = {};


  @action getProductDetails(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {

        this.loading = true;

        prod_repository.getProductDetails(
          data,
          this.onProductDetails.bind(this)
        );

      }
    });

  }

  onProductDetails(isError, responseData) {

    this.loading = false;
    this.isApiLoaded = true;

    if (!isError) {
      const prodData = responseData.data;
      
      if(prodData.length)
      this.product = prodData[0]

      console.log('onOrderDetails: ' + JSON.stringify(this.product))
    }
    else global.showMessage(responseData.message)

  }



}

export default ProductDetailsStore 
