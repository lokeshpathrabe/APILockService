import axios from 'axios';
import { apiRequestLockInterceptor } from '../lib/interceptor/apiLockRequestInterceptor';

const instance = axios.create();
instance.interceptors.request.use(apiRequestLockInterceptor);

export default instance;