import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
      domainAddress: "http://localhost:3000",
    };
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
  },
});

export default store;
