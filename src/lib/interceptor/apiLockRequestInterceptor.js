import APILockService from '../APILockService';

export async function apiRequestLockInterceptor(config) {

	if(APILockService.isLocked(config)) {
		await APILockService.waitTillUnlocked();
	}
	return config;
}
