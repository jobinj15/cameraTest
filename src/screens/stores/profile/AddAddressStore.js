import { observable, action, computed } from "mobx";
import constants from '../../../utility/constants'
import user_repository from "../../../repos/user_repository";
import global from "../../../utility/global";

export default class AddAddressStore {

  @observable state = constants.TXT_STATE
  @observable city = constants.TXT_CITY
  @observable loading = false;
  @observable isValidPin = false;

  constructor(){
    this.afterAddressAdded = undefined
  }

  @action getPin(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
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

    console.log('onPin ' + JSON.stringify(responseData))

    // return;

    if (this.loading)
      this.loading = false;

    if (!isError) {
      if (responseData.data && responseData.data.length) {
        var data = responseData.data[0]
        this.state = data.state
        this.city = data.city
        this.isValidPin = true
      }
    }
    else global.showMessage(responseData.message)
  }





  @action addAddress(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {

        this.loading = true;
        user_repository.addAddress(
          data,
          this.onAddressAdded.bind(this)
        );

      }
    });
  }


  onAddressAdded(isError,responseData) {

     this.loading = false;

     if(!isError){
        
       this.afterAddressAdded()
        
     }
     else global.showMessage(responseData.message)

  }

  @action afterAddressAdded(method){
    this.afterAddressAdded = method;
  }

}

