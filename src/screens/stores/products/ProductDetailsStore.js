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

  constructor() {
    this.onApiActionDone = undefined
  }

  @action setOnApiActionDone(method) {
    this.onApiActionDone = method;
  }

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


  @action addToCart(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {

        this.cartUpdating = true;
        this.setItemLoading();

        prod_repository.addToCart(
          data,
          this.onAddToCart.bind(this),
          0, 0
        );

      }
    });

  }

  onAddToCart(isError, responseData) {

    this.cartUpdating = false;

    if (!isError) {
    }
    else global.showMessage(responseData.message)

    this.afterCartAdd(isError)
  }

  afterCartAdd(isError) {

    var item = { ...this.product };

    console.log('Plus cart productStore: ' + JSON.stringify(item))

    if (isError) {
      item.loading = false;
      this.product = item
      return;
    }

    item.cart_quantity = item.cart_quantity + 1;
    item.loading = false;
    this.product = item;

    console.log('Modified prod: ' + JSON.stringify(this.product))
    if (this.onApiActionDone)
      this.onApiActionDone(item, constants.TYPE_PLUS);


  }


  @action deleteItem(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {

        this.cartUpdating = true;
        this.setItemLoading();

        prod_repository.removeCart(
          data,
          this.afterMinusCart.bind(this),
          0
        );

      }
    });
  }



  //modify call
  @action updateCart(data, type) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {

        this.cartUpdating = true;
        this.setItemLoading();

        prod_repository.updateCart(
          data,
          this.onUpdateCart.bind(this),
          0, 0, type
        );

      }
    });

  }



  @action onUpdateCart(isError, responseData, index, id, type) {

    this.cartUpdating = false;

    if (!isError) {

    }
    else global.showMessage(responseData.message)

    if (type == constants.TYPE_PLUS)
      this.afterPlusCart(isError)
    else this.afterMinusCart(isError)
  }


  afterPlusCart(isError) {

    var item = { ...this.product };

    console.log('Plus cart productStore: ' + JSON.stringify(item))

    if (isError) {
      item.loading = false;
      this.product = item
      return;
    }

    if (item.cart_quantity) {
      item.cart_quantity = item.cart_quantity + 1;
      item.loading = false;
      this.product = item;

      console.log('Modified prod: ' + JSON.stringify(item))

      if (this.onApiActionDone)
        this.onApiActionDone(item, constants.TYPE_PLUS);
    }

  }


  afterMinusCart(isError) {

    var item = { ...this.product };

    console.log('afterMinusCart productStore: ' + JSON.stringify(item))

    if (isError) {
      item.loading = false;
      this.product = item
      return;
    }

    if (item.cart_quantity) {
      item.cart_quantity = item.cart_quantity - 1;
      item.loading = false;
      this.product = item;

      console.log('Modified prod: ' + JSON.stringify(item))

      if (this.onApiActionDone)
        this.onApiActionDone(item, constants.TYPE_MINUS);
    }

  }




  setItemLoading() {

    var item = { ...this.product };
    item.loading = true;
    console.log('setItemLoading: ' + JSON.stringify(item))

    this.product = item

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
