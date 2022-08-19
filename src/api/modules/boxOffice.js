import { API_BOX_OFFICE } from '@/constants';

export default instance => ({
  async getWeeklyList(params) {
    const { data } = await instance.get(
      `${API_BOX_OFFICE}/searchWeeklyBoxOfficeList.json`,
      {
        params,
      },
    );

    return data;
  },
});
