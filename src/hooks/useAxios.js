import { useState, useEffect } from 'react';

const useAxios = (config) => {
  const { axios, method, requestConfig = {} } = config;
  const [url, setUrl] = useState(config.url);
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const [token, setToken] = useState(null);

  // const refetch = () => setReload(prev => prev + 1);
  const refetch = (newUrl) => {
    if (newUrl) {
      setUrl(newUrl);
    }
    setReload((prev) => prev + 1);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setError(null);

      try {
        if (token) {
          requestConfig.headers.Authorization = `Bearer ${token}`;
        }

        const res = await axios.request({
          url,
          method: method.toLowerCase(),
          ...requestConfig,
          signal: controller.signal,
        });

        setResponse(res.data);
      } catch (err) {
        if (err.code !== 'ERR_CANCELED') {
          setError(err);
        }
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [reload, token]);

  return {
    response, error, loading, refetch,
  };
};

export default useAxios;
/*
How to use it:
joke --> response

const {response, error, loading, refetch} = useAxios({
    axios: axios,
    method: 'GET',
    url: '/',
    requestConfig: {
        headers: {
            'Content-Language': 'en-US', --> can add on
            'Accept': 'text/html' --> can be overridden
            'Authorization': `Bearer ${token}`
        }
    }
});
*/
