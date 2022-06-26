import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

// call = 첫인자에 두번째 인자를 전달하여 호출함
// put = 새 액션을 디스패치 -> 액션생성함수(Payload)

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  // type은 REGISTER, LOGIN 중 하나를 받음 + CHECK
  // request는 함수형태. - axios 요청이 들어감 (API 요청)
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); // 로딩 시작 - START_LOADING 액션 디스패치 ex> startLoading(REGISTER) -> type: REGISTER
    try {
      // call 은 첫번째 인자에 두번째 인자를 전달해 호출하는 것이므로 액션생성함수(payload)
      const response = yield call(request, action.payload); // action.payload={username,password}가 axios.post로 들어감.
      yield put({
        type: SUCCESS, // REGISTER_SUCCESS
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE, // REGISTER_FAILURE
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
