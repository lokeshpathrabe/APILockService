import APILockService from '../lib/APILockService';

export async function apiRequestLockInterceptor(config) {

	if(APILockService.isLocked(config)) {
		await APILockService.waitTillUnlocked();
	}
	return config;
}
