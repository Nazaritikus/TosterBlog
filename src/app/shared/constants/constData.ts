import {Country} from '@shared/interfaces';

export const countries: Country[] = [
  {value: 'en', viewValue: 'England'},
  {value: 'ua', viewValue: 'Ukraine'},
  {value: 'es', viewValue: 'Spain'},
  {value: 'po', viewValue: 'Poland'},
  {value: 'other', viewValue: 'Other'},
];

export const STORAGE_ITEMS = {
  user: 'fb-user',
  token: 'fb-token',
  token_lifetime: 'fb-token-exp'
};

export const ERROR_MAP: Map<string, string> = new Map<string, string>([
  ['EMAIL_NOT_FOUND', 'There is no user record corresponding to this identifier.'],
  ['INVALID_PASSWORD', 'The password is invalid or the user does not have a password.'],
  ['USER_DISABLED', 'The user account has been disabled by an administrator.'],
  ['EMAIL_EXISTS', 'The email address is already in use by another account.'],
  ['OPERATION_NOT_ALLOWED', 'Password sign-in is disabled for this project. Please contact administrator.'],
  ['TOO_MANY_ATTEMPTS_TRY_LATER', 'We have blocked all requests from this device due to unusual activity. Try again later.'],
  ['INVALID_ID_TOKEN', 'The user\'s credential is no longer valid. The user must sign in again'],
  ['USER_NOT_FOUND', 'There is no user record corresponding to this identifier. The user may have been deleted.']
]);

export const CUSTOM_MESSAGES = {
  notAuthorized: 'Please login into the system to proceed adventure',
  unsavedEdits: 'It looks like you have been editing something. If you leave before saving, your changes will be lost.'
};
