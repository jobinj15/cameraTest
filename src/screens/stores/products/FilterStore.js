import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import constants from "../../../utility/constants";
import global from "../../../utility/global";
import prod_repository from "../../../repos/prod_repository";
import user_repository from "../../../repos/user_repository";

class FilterStore {

  @observable loading = false;
  @observable isApiLoaded = false;
  @observable filters = [{
    optionmasterid: 1, name: 'Weight',
    data: [{ value_id: 1, name: "500g" }, { value_id: 2, name: "1Kg", selected: true }]
  },
  {
    optionmasterid: 3, name: "Size", data: [{ value_id: 3, name: "S" },
    { value_id: 4, name: "M", selected: true }]
  }];


  @action getOrderDetails(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {

        this.loading = true;
        this.message = ''

        user_repository.getOrderDetails(
          data,
          this.onOrderDetails.bind(this)
        );

      }
      else {
        this.isApiLoaded = true;
        this.message = constants.NO_INTERNET
        if (this.refreshing)
          this.refreshing = false;
      }
    });

  }

  onOrderDetails(isError, responseData) {


    this.loading = false;
    this.isApiLoaded = true;

    if (!isError) {
      const orderData = responseData.data;
      if (orderData.length)
        this.order = orderData[0]

      console.log('onOrderDetails: ' + JSON.stringify(this.order))
    }
    else global.showMessage(responseData.message)

  }



}

export default OrderDetailsStore 
