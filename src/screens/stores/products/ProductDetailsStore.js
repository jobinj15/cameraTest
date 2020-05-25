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


  @action getProductVariant(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {

        this.product = {}
        this.loading = true;
        this.isApiLoaded = false;


        prod_repository.getProductVariant(
          data,
          this.onProductDetails.bind(this)
        );

      }
    });

  }

  setItemSelection(product) {

    var selected = product.selected_optionids;
    var variants = product.variants;

    console.log('setItemSelection selected: ' + JSON.stringify(selected))
    console.log('setItemSelection variants: ' + JSON.stringify(variants))

    var data;

    for (let sel of selected) {

      for (let vari of variants) {

        data = vari.data

        for (let item of data) {

          if (sel == item.value_id) {
            item.selected = true;
            break;
          }

        }

      }
    }

    console.log('setItemSelection: ' + JSON.stringify(variants))
    
    this.product = product;
    console.log('onOrderDetails: ' + JSON.stringify(this.product))

  }

  onProductDetails(isError, responseData) {

    this.loading = false;
    this.isApiLoaded = true;

    if (!isError) {
      const prodData = responseData.data;

      if (prodData.length)
        // this.setItemSelection(prodData[0].selected_variants,pro)
        this.setItemSelection(prodData[0])

    }
    else global.showMessage(responseData.message)

  }



}

export default ProductDetailsStore 
