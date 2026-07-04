import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/hooks/api/authSliceAPI';
import { userAPI } from '@/hooks/api/userSliceAPI';
import { kategoriAPI } from '@/hooks/api/kategoriSliceAPI';
import { barangAPI } from '@/hooks/api/barangSliceAPI';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [kategoriAPI.reducerPath]: kategoriAPI.reducer,
        [barangAPI.reducerPath]: barangAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAPI.middleware).concat(kategoriAPI.middleware).concat(barangAPI.middleware),
});
