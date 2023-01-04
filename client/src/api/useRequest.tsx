import { RequestObject } from '../types/Types';
import axios from 'axios';

const useRequest = () => {
  const handleGetRequest = async (RequestObject: RequestObject) => {
    try {
      const data = await axios.get(RequestObject.url, {
        headers: RequestObject.headers
      });
      return data;
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handlePutRequest = async (RequestObject: RequestObject) => {
    try {
      const data = await axios.put(RequestObject.url, RequestObject.data, {
        headers: RequestObject.headers
      });
      return data;
    } catch (err: any) {
      alert(err);
    }
  };

  return { handleRequest: handleGetRequest, handlePutRequest };
};

export default useRequest;
