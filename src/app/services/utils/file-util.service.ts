import { Injectable } from '@angular/core';
import { CONF_FILES } from '../../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class FileUtilService {

  constructor() { }
  public imageExtensions = CONF_FILES.imageExtensions;
  public videoExtensions = CONF_FILES.videoExtensions;
  public maxFileSizeImage = CONF_FILES.maxFileSizeImage;
  public maxFileSizeVideo = CONF_FILES.maxFileSizeVideo;


  /**
   * Validate file extension
   * @param file
   * @param type
   * @param acceptExtensionsParam: array of extensions
   */
  validateFileExtension(file: File, type = 'image', acceptExtensionsParam?) {
    const extension = file.name.split('.').pop().toLowerCase();
    let valid = true;
    let acceptExtensions = this.imageExtensions;

    if (type === 'video') {
      acceptExtensions = this.videoExtensions;
    }
    if (acceptExtensionsParam) {
      acceptExtensions = acceptExtensionsParam;
    }



    if (acceptExtensions.indexOf(extension) === -1) {
      valid = false;
    }
    return valid;
  }
  /**
   * Validate file size
   * @param file
   * @param type
   * @param maxSizeParam: size in mb
   */
  validateFileSize(file: File, type = 'image', maxSizeParam?) {
    let maxSize = this.maxFileSizeImage;
    let valid = true;
    if (type === 'video') {
      maxSize = this.maxFileSizeVideo;
    }
    if (maxSizeParam) {
      maxSize = maxSizeParam;
    }
    // Sise to mb
    const sizeMB = file.size / 1024 / 1024;

    if (sizeMB > maxSize) {
      valid = false;
    }

    return valid;
  }
}
