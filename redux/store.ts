import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { bookingFieldReducer } from "./booking/reducer";
import { facilityReducer } from "./facility/reducer";
import { homeReducer } from "./home/reducer";
import { userReducer } from "./user/reducer";

const appReducer = combineReducers({
    userReducer,
    homeReducer,
    facilityReducer,
    bookingFieldReducer
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["userReducer"], // Only persist user data
    blacklist: ["homeReducer", "facilityReducer"], // Don't persist temporary data
};

const rootReducer = (state: any, action: any) => {
    if (action.type === 'user/logout') {
        // Reset all state on logout
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof appReducer>;

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch; 