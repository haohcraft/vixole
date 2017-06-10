import { identity } from 'lodash';
import { makeFetchRequest, API_REQUEST } from './util';


const APIMiddleware = ({ getState, dispatch }) => next => (action) => {
    if (action.type !== API_REQUEST) {
        return next(action);
    }
    const {
        method,
        steps = {
            loading: 'LOADING',
            sucess: 'LOADED',
            fail: 'ERROR'
        },
        apiURL,
        apiData = identity,
        postProcessor = identity
    } = action.payload;

    const parameters = apiData(getState());

    const requests = [makeFetchRequest({
        url: apiURL,
        method,
        parameters
    })];

    next({ type: steps.loading });

    const req = Promise.all(requests);

    return (
        req.then(r => r.json())
        .then((response) => {
            const parsedResp = postProcessor(response);
            dispatch({
                type: steps.success,
                payload: {
                    apiResponse: parsedResp
                }
            });
        })
        .catch((error) => {
            dispatch({
                type: steps.fail,
                error: true,
                payload: {
                    apiResponse: error instanceof Error ? error : new Error(error)
                }
            });
        })
    );
};

export default APIMiddleware;
