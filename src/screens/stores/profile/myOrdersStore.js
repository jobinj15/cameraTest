import { observable, action, computed } from "mobx";


export default class MyOrdersStore {

  @observable orders = [

    {
      orderId : '00-1235',
      total : 1200,
      date : 'Wed , 20th April',
      items : 5,
      status : 'Pending'
    },
    
    {
      orderId : '00-1241',
      total : 2035,
      date : 'Sat , 6th April',
      items : 5,
      status : 'Delivered'
    },

    {
      orderId : '00-1132',
      total : 899,
      date : 'Sun , 3rd Marcg',
      items : 5,
      status : 'Delivered'
    },


  ];

  @action changeColor() {
  }


}