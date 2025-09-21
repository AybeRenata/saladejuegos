import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null | undefined>(undefined);
  user$ = this.userSubject.asObservable();
  isAuthenticated$ = this.user$.pipe(map((u) => (u === undefined ? undefined : !!u)));

  constructor(private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => this.userSubject.next(user));
  }

  async login(email: string, password: string) {
    const auth = getAuth();
    const cred = await signInWithEmailAndPassword(auth, email, password);

    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', cred.user.uid);
      await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
      this.router.navigate(['/']);
    } catch (e) {
      console.error('Error actualizando lastLogin en Firestore', e);
    }

    this.userSubject.next(cred.user);
    return cred;
  }

  async register(email: string, password: string, name: string) {
    const auth = getAuth();
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', cred.user.uid);
      await setDoc(userRef, {
        name,
        email: cred.user.email || null,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
      this.router.navigate(['/']);
    } catch (e) {
      console.error('Error creando documento de usuario en Firestore', e);
    }

    this.userSubject.next(cred.user);
    return cred;
  }

  async logout() {
    await signOut(getAuth());
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
