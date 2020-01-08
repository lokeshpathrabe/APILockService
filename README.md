
# APILockService

This service can be used to lock API calls from browser using axios request interceptors. 

If there are concurrent API calls in your application where you want implement mutex solution to control order of requests. You can use this lock service to implement it.  

For instance lets say our app needs an apiToken to be passed in headers for authorization. We would want to fetch this token before any APIs are triggered from browser. If these APIs are concurrent then we need some locking mechanism which could wait for the apiToken and then call other APIs. Lets implement this solution using APILockService.

First we create axios instance 
```
import axios from  'axios';
import { apiRequestLockInterceptor } from  '../interceptor/apiLockRequestInterceptor'; 

const instance = axios.create();
instance.interceptors.request.use(apiRequestLockInterceptor);
```
Use a request interceptor called *apiRequestLockInterceptor* that checks for lock on API service and waits until the lock is released. This interceptor is exported along with APILockService from src/lib/index.js

Next, we create an axios request that will fetch us apiToken
```
function getAppToken() {
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
```
Lets create another request which will fetch app data for us.
```
function getAppData(token) {
	const options = {
		method: 'get',
		headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorisation': `Bearer ${token}`},
		data: qs.stringify(data),
		url: '/app/data?userId=123'
	};
	return axios(options)
	.then(response => response.perm);
}
```
Normally, if we wanted to implement this we would need to do something like this.
```
getAppToken()
.then(() => {
	return getAppDate();
})
```

But with APILockService we call these APIs like this and the service makes sure app data is requested after the lock is released from by getAppToken call.
```
// ........ in main app js .......
getAppToken();
getAppData();
```


