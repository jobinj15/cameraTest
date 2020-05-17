import { observable, action, computed } from "mobx";


export default class OrderDetailStore {

  @observable order = {
    orderId : '00-1235',
    total : 1200,
    savings : 100,
    date : 'Wed , 20th April',
    items : 5,
    status : 'Pending'
  };

  @action changeColor() {
  }


}