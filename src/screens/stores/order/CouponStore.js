import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import constants from "../../../utility/constants";
import global from "../../../utility/global";
import prod_repository from "../../../repos/prod_repository";
import user_repository from "../../../repos/user_repository";

class ApplyCouponStore {

  setItemLoading(index) {

    var allCart = [...this.cart];
    var item = allCart[index];

    console.log('setItemLoading: ' + JSON.stringify(item))

    item.loading = true;

    this.cart = allCart

  }

  
  @action getCart(data, page) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showMessage(constants.NO_INTERNET)
      else {

        this.loading = !this.refreshing && page == 0;
        this.page = page;

        prod_repository.getCart(
          data,
          this.onCartLoaded.bind(this)
        );

      }
    });

  }

  onCartLoaded(isError, responseData) {

    console.log('onCartLoaded ' + JSON.stringify(responseData))

    if (this.loading)
      this.loading = false;

    if (!isError) {

      // if(responseData.total_amount)
      this.total = responseData.total_amount

      // if(responseData.total_items)
      this.noOfItems = responseData.total_items


      if (this.page == 0)
        this.cart = responseData.data
      else {
        var allCart = [...this.cart, ...responseData.data];
        this.cart = allCart
      }
    }
    else global.showMessage(responseData.message)

    if (!this.apiLoaded)
      this.apiLoaded = true

    if (this.refreshing)
      this.refreshing = false
  }


  @action getCartCount(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {

        // this.loading = true;

        user_repository.getCartCount(
          data,
          this.onCartCount.bind(this)
        );

      }
    });

  }


  onCartCount(isError, responseData) {

    console.log('onCartCount: ' + JSON.stringify(responseData))

    // this.loading = false;

    if (!isError) {
      this.noOfItems = responseData.total_items
    }
    else global.showMessage(responseData.message)

  }


  

  @observable loading = false;
  @observable refreshing = false;
  @observable apiLoaded = false;
  @observable isUpdating = false;
  @observable onApiActionDone = undefined;
  // @observable coupons = []

  @observable coupons = [
    {
      code : 'NEW30',
      title : 'Get 30% discount',
      description : 'Use code NEW30 to get 30% discount for new users'
    },
    {
      code : 'NEW30',
      title : 'Get 30% discount',
      description : 'Use code NEW30 to get 30% discount for new users'
    },
    {
      code : 'NEW30',
      title : 'Get 30% discount',
      description : 'Use code NEW30 to get 30% discount for new users'
    },
    {
      code : 'NEW30',
      title : 'Get 30% discount',
      description : 'Use code NEW30 to get 30% discount for new users'
    },
    {
      code : 'NEW30',
      title : 'Get 30% discount',
      description : 'Use code NEW30 to get 30% discount for new users'
    },
  ]
 

}

export default ApplyCouponStore