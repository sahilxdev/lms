import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";

export const appStore = configureStore({
    reducer:rootReducer,
    middleware: (defaultMiddlware) => defaultMiddlware().concat(authApi.middleware)
})

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();