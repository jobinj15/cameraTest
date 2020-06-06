import { observable, action, computed } from "mobx";
import user_repository from "../../../repos/user_repository";
import global from "../../../utility/global";


export default class MyOrdersStore {

  // @observable orders = [];



  @action getOrders(data, page) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable) {
        global.showMessage(constants.NO_INTERNET);
        if (page == 0)
          this.message = constants.NO_INTERNET
        if (this.refreshing)
          this.refreshing = false;
      }
      else {

        this.loading = !this.refreshing && page == 0;
        this.page = page;
        this.message = ''

        user_repository.getOrders(
          data,
          this.onOrders.bind(this)
        );

      }
    });

  }

  onOrders(isError, responseData) {

    console.log('onOrders ' + JSON.stringify(responseData))

    // return;

    if (this.loading)
      this.loading = false;

    if (!isError) {

      if (this.page == 0)
        this.orders = responseData.data
      else {
        var allOrders = [...this.orders, ...responseData.data];
        this.orders = allOrders
      }

    }
    else global.showMessage(responseData.message)

    if (!this.apiLoaded)
      this.apiLoaded = true

    if (this.refreshing)
      this.refreshing = false
  }



  // @observable orders = [

  //   {
  //     orderId: '00-1235',
  //     total: 1200,
  //     date: 'Wed , 20th April',
  //     items: 5,
  //     status: 'Pending'
  //   },

  //   {
  //     orderId: '00-1241',
  //     total: 2035,
  //     date: 'Sat , 6th April',
  //     items: 5,
  //     status: 'Delivered'
  //   },

  //   {
  //     orderId: '00-1132',
  //     total: 899,
  //     date: 'Sun , 3rd Marcg',
  //     items: 5,
  //     status: 'Delivered'
  //   },


  // ];

  @observable orders = [];
  @observable loading = false;
  @observable message = '';
  @observable refreshing = false;
  @observable apiLoaded = false;
  @observable page = 0


  @action changeColor() {
  }


}