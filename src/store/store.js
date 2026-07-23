import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/hooks/api/authSliceAPI';
import { userAPI } from '@/hooks/api/userSliceAPI';
import { kategoriAPI } from '@/hooks/api/kategoriSliceAPI';
import { barangAPI } from '@/hooks/api/barangSliceAPI';
import { mutasiAPI } from '@/hooks/api/mutasiSliceAPI';
import { adsAPI } from '@/hooks/api/produkAdsSliceAPI';
import { laporanAPI } from '@/hooks/api/laporanSliceAPI';
import { companyAPI } from '@/hooks/api/companySliceAPI';
import { dashboardAPI } from '@/hooks/api/dashboardSliceAPI';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [kategoriAPI.reducerPath]: kategoriAPI.reducer,
        [barangAPI.reducerPath]: barangAPI.reducer,
        [mutasiAPI.reducerPath]: mutasiAPI.reducer,
        [adsAPI.reducerPath]: adsAPI.reducer,
        [laporanAPI.reducerPath]: laporanAPI.reducer,
        [companyAPI.reducerPath]: companyAPI.reducer,
        [dashboardAPI.reducerPath]: dashboardAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userAPI.middleware)
            .concat(kategoriAPI.middleware)
            .concat(barangAPI.middleware)
            .concat(mutasiAPI.middleware)
            .concat(adsAPI.middleware)
            .concat(laporanAPI.middleware)
            .concat(companyAPI.middleware)
            .concat(dashboardAPI.middleware),
});
