import { Injectable } from '@angular/core';
import {
  SupabaseClient,
  createClient,
  AuthChangeEvent,
  Session,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange(this.handleAuthChange.bind(this));
  }

  private handleAuthChange(event: AuthChangeEvent, session: Session | null):void {
    console.log('Autn event:', event);
    console.log('Session:', session);

    if (session) {
      localStorage.setItem('session', JSON.stringify(session));
    } else {
      localStorage.removeItem('session');
    }
  }

  get client() {
    return this.supabase;
  }
}
