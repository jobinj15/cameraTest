import { observable, action } from "mobx";
import prod_repository from "../../../repos/prod_repository";
import global from "../../../utility/global";
import user_repository from "../../../repos/user_repository";

export default class BannerStore {


  @action getAddressList(data,page) {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {
        this.loading = !this.refreshing && page == 0;
        this.page = page;

        user_repository.getAddresses(
          data,
          this.onAddressList.bind(this)
        );

      }
    });

  }

  onAddressList(isError, responseData) {

    console.log('onAddressList: ' + JSON.stringify(responseData))

    if (this.loading)
    this.loading = false;

  if (!isError) {

    if (this.page == 0)
      this.addressList = responseData.data
    else {
      var allAddress = [...this.addressList, ...responseData.data];
      this.addressList = allAddress
    }

  }
  else global.showMessage(responseData.message)

  if (!this.apiLoaded)
    this.apiLoaded = true

  if (this.refreshing)
    this.refreshing = false
  }

  
  @observable addressList = [];
  @observable loading = false;
  @observable refreshing = false;
  @observable apiLoaded = false;
  @observable page = 0


}