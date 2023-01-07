import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
      domainAddress:
        import.meta.env.DEV === true
          ? "http://localhost:3000"
          : "https://activity-system-backend.onrender.com",
    };
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
  },
});

export default store;
