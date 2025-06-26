import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase = inject(SupabaseService);

  constructor() {}

  signUp(email: string, password: string) {
    return this.supabase.client.auth.signUp({ email, password });
  }

  signIn(email: string, password: string) {
    return this.supabase.client.auth.signInWithPassword({ email, password });
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.client.auth.signOut();

    if (error) throw error;
    localStorage.removeItem('session');
  }

  async signInWithGoogle() {
    const { error } = await this.supabase.client.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) throw error;
  }

  get isLoggedIn(): boolean {
    const session = localStorage.getItem('session');
    try {
      const parsed: Session = JSON.parse(session ?? '{}');
      return !!parsed?.access_token;
    } catch {
      return false;
    }
  }

  get userId() {
    const session = localStorage.getItem('session');
    try {
      const parsed: Session = JSON.parse(session ?? '{}');
      return parsed?.user?.id ?? null;
    } catch {
      return null;
    }
  }
}
