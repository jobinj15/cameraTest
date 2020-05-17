import { observable, action, computed } from "mobx";

export default class AddAddressStore {

  @observable states = [ 
    {
      id : -1,
      name : 'Select State'
    }
  ];

  @observable cities = [ 
    {
      id : -1,
      name : 'Select City'
    }
  ];

  @observable stateIndex = 0;
  @observable cityIndex = 0;

  @action onStateIndexChanged(index) {
     this.stateIndex = index;
  }

  @action onCityIndexChanged(index) {
    this.cityIndex = index;
 }


}