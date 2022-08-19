import axios from 'axios';

export default {
  methods: {
    async $axios(method, url, params) {
      return (
        await axios({
          method,
          url,
          params,
        }).catch(e => {
          console.log(e);
        })
      ).data;
    },
  },
};
