export function setInterceptors(instance) {
  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      return Promise.reject(err);
    },
  );
  instance.interceptors.response.use(
    config => {
      return config;
    },
    err => {
      return Promise.reject(err);
    },
  );

  return instance;
}
