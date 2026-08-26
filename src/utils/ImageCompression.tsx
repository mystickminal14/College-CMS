import imageCompression from 'browser-image-compression';

interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
}

const isTiff = (file: File): boolean => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  return file.type.toLowerCase() === 'image/tiff' || ext === 'tif' || ext === 'tiff';
};

export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<File> => {
  // Browsers can't decode TIFF via <canvas>/createImageBitmap, so the
  // compression library can't process it. Upload TIFFs as-is, uncompressed
  // and unconverted, rather than failing or silently changing the format.
  if (isTiff(file)) {
    return file;
  }

  const compressionOptions = {
    maxSizeMB: 1, // Max 1MB
    maxWidthOrHeight: 1024, // Max 1024px width/height
    useWebWorker: true,
    ...options,
  };

  try {
    const compressedFile = await imageCompression(file, compressionOptions);

    // Create new file with original name but compressed data
    return new File([compressedFile], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error('Image compression error:', error);
    throw new Error('Failed to compress image');
  }
};

export const validateImageFile = (file: File): string | null => {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/tiff', 'image/tif'];

  // Some browsers/OS combinations don't register .tif/.tiff in their MIME
  // database and report an empty or generic file.type, so fall back to the
  // extension for TIFF specifically.
  if (isTiff(file)) {
    if (file.size > MAX_SIZE) {
      return 'Image size should be less than 5MB';
    }
    return null;
  }

  if (!file.type.startsWith('image/')) {
    return 'Please select an image file';
  }

  if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
    return 'Only JPG, PNG, WebP, and TIFF images are allowed';
  }

  if (file.size > MAX_SIZE) {
    return 'Image size should be less than 5MB';
  }

  return null;
};