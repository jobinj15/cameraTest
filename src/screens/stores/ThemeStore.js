import { observable, computed } from 'mobx'

class ThemeStore {
  @observable theme;
}

const store = new ThemeStore()

export default store