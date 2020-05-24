import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import constants from "../../../utility/constants";
import global from "../../../utility/global";
import prod_repository from "../../../repos/prod_repository";
import user_repository from "../../../repos/user_repository";

class SelectAddressStore {

  @observable loadingAddress = false;
  @observable loadingCharges = false;
  @observable addressList = [];


  @action getAddressList(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {

        this.loadingAddress = true;

        user_repository.getAddresses(
          data,
          this.onAddressList.bind(this)
        );

      }
    });

  }

  onAddressList(isError, responseData) {

    console.log('onAddressList: ' + JSON.stringify(responseData))

    this.loadingAddress = false;

    if (!isError) {
      this.addressList = responseData.data
    }
    else global.showMessage(responseData.message)

  }



}

export default SelectAddressStore 
