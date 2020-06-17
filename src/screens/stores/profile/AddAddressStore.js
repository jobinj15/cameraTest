import { observable, action, computed } from "mobx";
import constants from '../../../utility/constants'
import user_repository from "../../../repos/user_repository";
import global from "../../../utility/global";

export default class AddAddressStore {

  @observable state = constants.TXT_STATE
  @observable city = constants.TXT_CITY
  @observable loading = false;
  @observable isValidPin = false;
  @observable selectedAddressType = 0;
  @observable addressTypes = [
    {
     id : 1,
     text : 'Home',
     selected :  true
    },
    {
     id : 2,
     text : 'Office',
     selected :  false
    },
    {
     id : 1,
     text : 'Others',
     selected :  false
    },
  ];

  constructor() {
    this.afterAddressAdded = undefined
  }

  @action getPin(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showMessage(constants.NO_INTERNET)
      else {

        this.loading = true;
        user_repository.getPin(
          data,
          this.onPin.bind(this)
        );

      }
    });

  }

  onPin(isError, responseData) {


    // return;

    this.loading = false;


    if (!isError) {
      if (responseData.data && responseData.data.length) {
        var data = responseData.data[0]
        this.state = data.state
        this.city = data.city
        this.isValidPin = true

        console.log('onPin Loadded' + JSON.stringify(this.state))

      }
    }
    else global.showMessage(responseData.message)
  }


  @action addAddress(data, mode) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showMessage(constants.NO_INTERNET)
      else {

        this.loading = true;

        if (mode == constants.MODE_EDIT) {
          user_repository.updateAddress(
            data,
            this.onAddressAdded.bind(this)
          );
        }
        else {
          user_repository.addAddress(
            data,
            this.onAddressAdded.bind(this)
          );

        }


      }
    });
  }


  onAddressAdded(isError, responseData) {

    this.loading = false;

    if (!isError) {

      console.log('onAddressAdded ' + this.onAddressAdded)

      if (this.afterAddressAdded)
        this.afterAddressAdded()
    }

    global.showMessage(responseData.message)

  }

  @action setAfterAddressAdded(method) {
    this.afterAddressAdded = method;
  }

}

