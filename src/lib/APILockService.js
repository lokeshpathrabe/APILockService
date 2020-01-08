class APILockService {
    constructor() {
        this.locked = false
        this.lockToken = null;
    }

	lock = (lockToken) => {
        if(this.locked){
            throw new Error('APIService has already been locked.');
        }
        this.lockToken = lockToken;
		this.locked = true;
	}
	
	isLocked = (config) => {
        if(config.lockToken === this.lockToken){ //We do not want to block the API request which placed the lock in first place
            return false;
        }
		return this.locked;
    }
    
    releaseLock = (lockToken, resolve) => {
        if(lockToken === this.lockToken){
            this.locked = false;
            if(typeof this.resolveWaitPromise === 'function') {
                this.resolveWaitPromise();
            }
        }
    }
    
    waitTillUnlocked = () => {
        return new Promise((resolve, reject) => {
            this.resolveWaitPromise = () => {
                resolve();
            }
            setTimeout(() =>{
                this.locked = false;
                resolve();
            }, 300000);// timeout after 5 mins
        });
    }
}

const apiServiceInstance = new APILockService();

export default apiServiceInstance;