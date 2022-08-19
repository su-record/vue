import { instance } from '@/api';
import boxOffice from '@/api/modules/boxOffice';

export const api = {
  boxOffice: boxOffice(instance),
};

export default {
  install: app => {
    app.config.globalProperties.$api = api;
  },
};
