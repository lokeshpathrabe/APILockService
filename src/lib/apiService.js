import axios from 'axios';
import { apiRequestLockInterceptor } from '../interceptor/apiLockRequestInterceptor';

const instance = axios.create();
instance.interceptors.request.use(apiRequestLockInterceptor);

export default instance;