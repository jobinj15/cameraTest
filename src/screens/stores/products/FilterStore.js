import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import constants from "../../../utility/constants";
import global from "../../../utility/global";
import prod_repository from "../../../repos/prod_repository";
import user_repository from "../../../repos/user_repository";

class FilterStore {

  @observable loading = false;
  @observable isApiLoaded = false;
  @observable message = '';
  @observable onFiltersLoaded = undefined;
  @observable filters = []
  // @observable filters = [{
  //   optionmasterid: 1, name: 'Weight',type:constants.TYPE_SELECT,
  //   items: [{ value_id: 1, name: "500g" }, { value_id: 2, name: "1Kg", selected: true }]
  // },
  // {
  //   optionmasterid: 3, name: "Add brands",type:constants.TYPE_ADD, items: [{ value_id: 3, name: "Amul" },
  //   { value_id: 4, name: "Nescafe", selected: true }]
  // }];

  



  @action getFilters() {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {

        this.loading = true;
        this.message = ''

        prod_repository.getFilter(
          this.onFilter.bind(this)
        );

      }
      else {
        this.isApiLoaded = true;
        this.message = constants.NO_INTERNET
      }
    });

  }

  onFilter(isError, responseData) {
    console.log('onFilter: ' + JSON.stringify(responseData))

    this.loading = false;
    this.isApiLoaded = true;

    if (!isError) {
      this.filters = responseData.data;
      this.onFiltersLoaded();
    }
    else global.showMessage(responseData.message)

  }



}

export default FilterStore 
