import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  getErrorMessage(error: any): string {
    if (!error) {
      return 'An unexpected error occured.';
    }

    if (error.name === 'AuthApiError') {
      console.warn('Auth API error: ', error);
      if (error.message === 'Invalid login credentials') {
        return 'Invalid email or password. Please try again';
      }
      return error.message || 'Authentication failed. Please try again';
    }

    if (error.name == 'PostgrestError') {
      return error.message || 'A database error occured';
    }

    if (error.message) {
      console.warn('Supabase error: ', error);
      return error.message;
    }

    console.error('Unhandled Supabase error: ', error);
    return 'An unexpected error occured';
  }
}
