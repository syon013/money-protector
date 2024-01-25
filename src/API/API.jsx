import axios from 'axios';

/** Custom axios를 만들기 위해 함수 생성
 * 현재의 baseURL은 json-server를 사용하기 위해 localhost:4000으로 설정해둠.
 * server의 host가 변경되면 baseURL을 변경해주면 됨.
 * 서버는 npm install -g json-server 로 설치 후, npx json-server ./db.json --port 4000로 실행
 * */
const BASE_URL = 'http://localhost:4000/';

/**
 * Data를 받아오기 위한 Custom Axios
 * 1. export로 다른 페이지에서 불러와 사용할 수 있도록 함.
 * 2. axios.create로 새로운 axios를 만들어 사용함.
 * 3. baseURL을 미리 입력해두고, 사용하는 곳에서 Endpoint만 입력하여 사용함.
 * 4. localStorage에 저장된 token을 header에 넣어서 사용함. (추후 쿠키 사용 시 쿠키로 변경)
 */

export const customAxios = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    // access_token: cookies.get('access_token'),
    // Authorization: localStorage.getItem('accessToken'),
  },
});
