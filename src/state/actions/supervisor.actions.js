import {supervisorServices} from '../../services';

export const FETCH_SUPERVISOR_REQUEST = 'FETCH_SUPERVISOR_REQUEST';
export const FETCH_SUPERVISOR_SUCCESS = 'FETCH_SUPERVISOR_SUCCESS';
export const FETCH_SUPERVISOR_FAILURE = 'FETCH_SUPERVISOR_FAILURE';

const fetchSeupervisors = (params) => {
  const request = () => ({type: FETCH_SUPERVISOR_REQUEST});
  const success = (supervisors) => ({type: FETCH_SUPERVISOR_SUCCESS, supervisors});
  const failure = (error) => ({type: FETCH_SUPERVISOR_FAILURE, error});

  return (dispatch) => {
    dispatch(request());

    supervisorServices.fetchSupervisors(params)
      .then(
        supervisors => {
          dispatch(success(supervisors));
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

export const supervisorActions = {
  fetchSeupervisors
};
