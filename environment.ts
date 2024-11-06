export const urls = {
  gettingStarted: `/api/auth/getting-started`,
  registration: `/api/auth/registration`,
  login: `/api/auth/login`,
  logout: `/api/auth/logout`,
  verifyOTP: `/api/auth/verify-otp`,
};

export enum APISTATUSENUM {
  SUCCESS = 'success',
  ERROR = 'error',
  PENDING = 'pending',
  INIT = 'init',
}
