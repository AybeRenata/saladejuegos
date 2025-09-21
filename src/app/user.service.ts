import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private auth: AuthService) {}

  userProfile$(): Observable<any | null | undefined> {
    return this.auth.user$.pipe(
      switchMap((u) => {
        if (u === undefined) return of(undefined);
        if (u === null) return of(null);
        const db = getFirestore();
        const ref = doc(db, 'users', u.uid);
        return from(getDoc(ref)).pipe(
          map((ds) => {
            const data = ds.exists() ? ds.data() : {};
            return { uid: u.uid, email: u.email, ...data };
          })
        );
      })
    );
  }
}
