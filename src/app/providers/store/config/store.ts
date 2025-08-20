import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { Middleware, Dispatch, AnyAction } from 'redux';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { getPersistConfig } from 'redux-deep-persist';

import uiReducer from 'entities/ui/Ui/slice/uiSlice';
import modalReducer from 'entities/ui/Modal/slice/modalSlice';
import { initBroadcastListener, broadcastSyncMiddleware } from 'shared/lib/middleware/broadcastChannelSyncMiddleware';

const rootReducer = combineReducers({
    ui: uiReducer,
    modal: modalReducer,
});

const persistConfig = getPersistConfig({
    key: 'root',
    storage,
    whitelist: [
        'ui.additionalMenu.currentStep',
        'ui.isPushNotificationActive.purpose',
    ],
    rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'modal/openModal',
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
                ignoredPaths: [],
            },
            immutableCheck: {
                // говорим middleware не ходить в этот путь
                ignoredPaths: [],
            },
        }).concat(broadcastSyncMiddleware),
});

initBroadcastListener(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
