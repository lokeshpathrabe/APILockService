import { getAppToken, getAppData } from './appApi';

// Place concurrent API calls. APILockService makes sure that App Data is requested once AppToken
// is fetched successfully.
getAppToken();
getAppData();