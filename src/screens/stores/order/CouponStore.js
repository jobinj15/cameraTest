import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import constants from "../../../utility/constants";
import global from "../../../utility/global";
import prod_repository from "../../../repos/prod_repository";
import user_repository from "../../../repos/user_repository";

class CouponStore {

  @action getCoupons() {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showMessage(constants.NO_INTERNET)
      else {

        this.loading = true;

        user_repository.getCoupons(
          this.onCouponsLoaded.bind(this)
        );

      }
    });

  }

  onCouponsLoaded(isError, responseData) {

    console.log('onCouponsLoaded ' + JSON.stringify(responseData))

    this.loading = false;
    this.apiLoaded = true; 

    if (!isError) {
      this.coupons = responseData.data
    }
    else global.showMessage(responseData.message)

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
  @observable coupons = []

  // @observable coupons = [
  //   {
  //     code: 'NEW30',
  //     title: 'Get 30% discount',
  //     description: 'Use code NEW30 to get 30% discount for new users'
  //   },
  //   {
  //     code: 'NEW30',
  //     title: 'Get 30% discount',
  //     description: 'Use code NEW30 to get 30% discount for new users'
  //   },
  //   {
  //     code: 'NEW30',
  //     title: 'Get 30% discount',
  //     description: 'Use code NEW30 to get 30% discount for new users'
  //   },
  //   {
  //     code: 'NEW30',
  //     title: 'Get 30% discount',
  //     description: 'Use code NEW30 to get 30% discount for new users'
  //   },
  //   {
  //     code: 'NEW30',
  //     title: 'Get 30% discount',
  //     description: 'Use code NEW30 to get 30% discount for new users'
  //   },
  // ]


}

export default CouponStore