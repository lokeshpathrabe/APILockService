# APILockService
Service to lock API calls from browser using axios request interceptors.

If there are concurrent API calls in your application where you want implement mutex solution then you can use this solution to achieve the same.

Refer the example/appAPI.js to see how this solution can be used to place lock on API service untill request is completed. Feel free to suggest improvements by raising PRs.
