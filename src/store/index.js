import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      domainAddress:
        import.meta.env.DEV === true
          ? import.meta.env.VITE_DEV_DOMAIN
          : import.meta.env.VITE_PROD_DOMAIN,
    };
  },
  mutations: {},
});

export default store;
