import { dipImage } from './dipImage';

export class dipCanvas {
  private _image: dipImage;

  constructor(width: number, height: number) {
    this._image = new dipImage(width, height);
  }

  get image(): dipImage {
    return this._image;
  }

  // Set pixel at x,y with RGBA values
  setPixel(x: number, y: number, r: number, g: number, b: number, a: number = 255): void {
    this._image.setPixel(x, y, r, g, b, a);
  }

  // Get pixel at x,y as RGBA values
  getPixel(x: number, y: number): [number, number, number, number] {
    return this._image.getPixel(x, y);
  }

  // Clear image to black (all zeros)
  clear(): void {
    this._image.clear();
  }

  // Apply a simple spatial filter (e.g., averaging)
  // applySpatialFilter(filter: number[][]): dipCanvas {
  //   const newCanvas = new dipCanvas(this._image.width, this._image.height);
  //   newCanvas.image.copyFrom(this._image);
  //   return newCanvas;
  // }

  // Get the image data
  getImageData(): Uint8ClampedArray {
    return this._image.data;
  }
}