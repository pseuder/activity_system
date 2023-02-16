import { createStore } from "vuex";

export default createStore({
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
