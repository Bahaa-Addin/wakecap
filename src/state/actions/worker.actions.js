import { workerServices } from '../../services';

export const FETCH_WORKERS_REQUEST = 'FETCH_WORKERS_REQUEST';
export const FETCH_WORKERS_SUCCESS = 'FETCH_WORKERS_SUCCESS';
export const FETCH_WORKERS_FAILURE = 'FETCH_WORKERS_FAILURE';

const fetchWorkers = (params) => {
  const request = () => ({ type: FETCH_WORKERS_REQUEST});
  const success = (workers) => ({ type: FETCH_WORKERS_SUCCESS, workers });
  const failure = (error) => ({ type: FETCH_WORKERS_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    workerServices.fetchWorkers(params)
      .then(
        workers => {
          dispatch(success(workers));
        },
        error => {
          dispatch(failure(error));
        }
      )
      .catch(error => {
        dispatch(failure(error));
      })
  };
};

export const workerActions = {
  fetchWorkers
};
