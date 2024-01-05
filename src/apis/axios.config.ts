import axios from 'axios';

// 개발 환경에서 크로스 도메인에서 쿠키를 전송할 수 있도록 설정

const axiosInstance = axios.create({
  withCredentials: import.meta.env.DEV,
});

export default axiosInstance;
