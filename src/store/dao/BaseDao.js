class BaseDao {
  store;
  type;
  constructor(store, type) {
    this.store = store;
    this.type = type;
  }
}

export {BaseDao};
