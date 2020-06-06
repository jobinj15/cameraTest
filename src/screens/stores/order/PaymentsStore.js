import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import constants from "../../../utility/constants";
import global from "../../../utility/global";
import prod_repository from "../../../repos/prod_repository";
import user_repository from "../../../repos/user_repository";

class PaymentsStore {

  @observable loading = false;
  @observable apiLoaded = false;
  @observable selectedPayMode = undefined;
  @observable paymentList = [];


  constructor(){
    this.afterPaymentDone = undefined
  }

  @action getPaymentList() {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {

        this.loading = true;

        user_repository.getPaymentList(
          this.onPaymentList.bind(this)
        );

      }
    });

  }


  @action toggleSelection(index, navigator) {
    var allPayModes = [...this.paymentList]

    var size = allPayModes.length;
    var item;

    for (var i = 0; i < size; i++) {

      item = allPayModes[i]
      if (i === index){
        item.selected = true;
        this.selectedPayMode = item;
      }
      else item.selected = false;
    }

    this.paymentList = allPayModes;
  }


  onPaymentList(isError, responseData) {


    this.loading = false;
    this.apiLoaded = true

    if (!isError) {
      this.paymentList = responseData.data
    }
    else global.showMessage(responseData.message)

    console.log('onPaymentList: ' + JSON.stringify(this.paymentList))


  }


  @action setAfterPayment(method){
    this.afterPaymentDone = method;
  } 
   

  @action confirmOrder(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {

        this.loading = true;

        user_repository.confirmOrder(
          data,
          this.onConfirmOrder.bind(this)
        );

      }
    });

  }

  onConfirmOrder(isError, responseData) {

    console.log('onConfirmOrder: ' + JSON.stringify(responseData))

    this.loading = false;

    if (!isError) {
      this.afterPaymentDone()
    }
    else global.showMessage(responseData.message)

  }



}

export default PaymentsStore 
