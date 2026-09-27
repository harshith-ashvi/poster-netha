const MAX_EDGE = 1200;

// File -> downscaled data URL. Runs fully in the browser; the photo never leaves the device.
export async function fileToDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("not an image");
  const bmp = await createImageBitmap(file); // honours EXIF orientation
  const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();
  // PNG keeps transparency (cutouts); everything else goes JPEG to stay small.
  return file.type === "image/png" ? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg", 0.9);
}
