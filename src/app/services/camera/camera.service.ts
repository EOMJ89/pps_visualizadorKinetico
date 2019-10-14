import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Injectable({
  providedIn: 'root'
})
export class CameraService {
  // tslint:disable: variable-name
  private _opt: CameraOptions = {
    quality: 50,
    destinationType: this._camera.DestinationType.DATA_URL,
    encodingType: this._camera.EncodingType.JPEG,
    mediaType: this._camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
    correctOrientation: true,
  };

  constructor(private _camera: Camera) { }

  public takePic(source?: number): Promise<string | null> {
    this._opt.sourceType = source !== undefined ? source : 1;

    return this._camera.getPicture(this._opt).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image: string = 'data:image/jpeg;base64,' + imageData;
      return base64Image;
    }, (err) => {
      console.log('Error en camara', err);
      return null;
      // Handle error
    });
  }
}
