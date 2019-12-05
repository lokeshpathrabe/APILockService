import axios from './../lib/apiService';
import APILockService from '../lib/APILockService';

/**
 * We want to get API token before any request is triggered.
 */
export function getAppToken() {
    const lockToken = new Date().toISOString();
    const options = {
        method: 'get',
        headers: { 'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data),
        url: '/app/token?userId=123',
        lockToken
    };
    
    APILockService.lock(lockToken);
    return axios(options)
    .then(response => {
        APILockService.releaseLock(lockToken);
        return response.token
    });
}

/**
 * This request waits untill lock is release by getAppToken api.
 * APILockRequestInterceptor checks for lock and waits until lock is released.
 * @param {*} token 
 */
export function getAppData(token) { 
    const options = {
        method: 'get',
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorisation': `Bearer ${token}`},
        data: qs.stringify(data),
        url: '/app/data?userId=123'
    };
    return axios(options)
    .then(response => response.perm);
}