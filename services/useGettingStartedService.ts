import {useCallback, useMemo, useState} from 'react';
import {APISTATUSENUM, urls} from '../environment';
import {useRestService} from '../hooks/useRestService';

type RequestType = any;
type ResponseType = any;
type Options = {
  onSuccess?: (args?: ResponseType) => void;
  onError?: (errors?: any) => void;
  onSettled?: () => void;
};

const useGettingStartedService = () => {
  //   const { signOut } = useAuthActions();
  const restService = useRestService();
  const [data, setData] = useState<ResponseType>();
  const [apiStatus, setAPIStatus] = useState<APISTATUSENUM>(APISTATUSENUM.INIT);
  const [settled, setSettled] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const isPending = useMemo(
    () => apiStatus === APISTATUSENUM.PENDING,
    [apiStatus],
  );
  const isSuccess = useMemo(
    () => apiStatus === APISTATUSENUM.SUCCESS,
    [apiStatus],
  );
  const isError = useMemo(() => apiStatus === APISTATUSENUM.ERROR, [apiStatus]);
  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setAPIStatus(APISTATUSENUM.PENDING);
        setData(undefined);
        setSettled(false);
        setError(undefined);
        const result = await restService.post(urls.gettingStarted, values);
        options?.onSuccess?.(result);
        setAPIStatus(APISTATUSENUM.SUCCESS);
        setData(result);
      } catch (error: any) {
        setAPIStatus(APISTATUSENUM.ERROR);
        setError(error);
        options?.onError?.(error as Error);
        // if (options?.throwError) throw error;
      } finally {
        options?.onSettled?.();
        setSettled(true);
      }
    },
    [restService],
  );

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    isSettled: settled,
    data,
    error,
  };
};

export default useGettingStartedService;
