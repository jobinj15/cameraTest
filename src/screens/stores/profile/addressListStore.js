import { observable, action } from "mobx";
import prod_repository from "../../../repos/prod_repository";
import global from "../../../utility/global";
import user_repository from "../../../repos/user_repository";
import constants from "../../../utility/constants";

export default class AddressListStore {

  constructor() {
    this.afterAddressListLoaded = undefined;
  }

  @action getAddressList(data, page) {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {
        this.loading = !this.refreshing && page == 0;
        this.page = page;
        this.message = ''

        user_repository.getAddresses(
          data,
          this.onAddressList.bind(this)
        );

      }
      else {
        global.showMessage(constants.NO_INTERNET)
        if (page == 0)
          this.message = constants.NO_INTERNET
        if (this.refreshing)
          this.refreshing = false;
      }
    });

  }

  onAddressList(isError, responseData) {

    console.log('onAddressList: ' + JSON.stringify(responseData))

    if (this.loading)
      this.loading = false;

    if (!isError) {

      if (this.page == 0) {
        if (responseData.data.length > 0) {
          responseData.data[0].selected = true;
          this.selectedAddress = responseData.data[0]
        }
        this.addressList = responseData.data;
      }
      else {
        var allAddress = [...this.addressList, ...responseData.data];
        this.addressList = allAddress
      }

      if (this.afterAddressListLoaded)
        this.afterAddressListLoaded()


    }
    else global.showMessage(responseData.message)

    if (!this.apiLoaded)
      this.apiLoaded = true

    if (this.refreshing)
      this.refreshing = false
  }

  @action toggleSelection(index, navigator) {
    var allAddress = [...this.addressList]

    var size = allAddress.length;
    var item;

    for (var i = 0; i < size; i++) {

      item = allAddress[i]
      if (i === index)
        item.selected = true;
      else item.selected = false;

    }

    this.addressList = allAddress;
    this.selectedAddress = this.addressList[index];

    if (navigator)
      navigator.pop()
  }


  @action deleteAddress(data, index) {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {
        this.loading = true;

        user_repository.deleteAddress(
          data,
          this.onAddressDelete.bind(this),
          index
        );

      }
    });

  }

  onAddressDelete(isError, responseData, index) {

    this.loading = false;

    if (!isError) {

      // global.showMessage(constants.MSG_DELETED);

      var allAddress = this.getListCopy()
      allAddress.splice(index, 1);
      // this.updateList(allAddress)

      if (this.addressList.length) {
        this.selectedAddress = allAddress[0];
        this.addressList = allAddress;
        this.toggleSelection(0);
      }
    }
    // else {
    //   global.showMessage(responseData.message) 
    // }
    global.showMessage(responseData.message)

  }

  @action setAfterAddressListLoaded(method) {
    this.afterAddressListLoaded = method;
  }


  getListCopy() {
    return [...this.addressList]
  }

  updateList(list) {
    this.addressList = list;
  }

  @observable addressList = [];
  @observable selectedAddress = {}
  @observable loading = false;
  @observable message = '';
  @observable refreshing = false;
  @observable apiLoaded = false;
  @observable page = 0


}