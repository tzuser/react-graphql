export default class PageStore{
  map = {};

  get(key){
    return this.map[key];
  }

  has(key){
    return !!this.map[key];
  }

  set(key, value) {
    this.map[key]=value;
  }

  reset() {
    this.map = {};
  }
}