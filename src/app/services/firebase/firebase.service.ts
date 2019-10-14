import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // tslint:disable: variable-name
  constructor(
    private _db: AngularFirestore,
    private _storage: AngularFireStorage,
    private _authServ: AuthService) { }

  public traertodos(db: string) {
    return this._db.collection(db);
  }

  public actualizar(db: string, id: string, data: any) {
    return this._db.collection(db).doc(id).update(data);
  }

  public agregar(db: string, data: any) {
    return this._db.collection(db).add(data);
  }

  public subirArchivo(picName, pictureAux) {
    const selfieRef = this._storage.storage.ref(picName);

    return selfieRef.putString(pictureAux, 'base64', { contentType: 'image/jpeg' });
  }
}

