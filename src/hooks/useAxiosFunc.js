import { useState, useEffect } from 'react';
import { auth } from '@/config/firebase';

const useAxiosFunc = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const [token, setToken] = useState(null);

  const axiosFetch = async (configObj) => {
    setError(null);
    const {
      axios,
      method,
      url,
      requestConfig = {},
    } = configObj;

    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);

      const config = {
        url,
        method: method.toLowerCase(),
        ...requestConfig,
        signal: ctrl.signal,
      };

      const res = await axios.request(config);

      setResponse(res.data);
      // return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
      setError(err);
      // return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return {
    response, error, loading, axiosFetch,
  };
};

export default useAxiosFunc;
