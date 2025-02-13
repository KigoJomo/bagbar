// app/components/admin/ProductForm.tsx

'use client';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useToast } from '@/context/toast-context';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import { Input } from '../Input';
import CtaButton from '../CtaButton';
import { X } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (data: {
    productData: {
      name: string;
      description: string;
      price: number;
      stock: number;
      images: string[];
    };
    deletedImages: string[];
  }) => void;
  error?: string;
  initialName?: string;
  initialPrice?: number;
  initialDescription?: string;
  initialImages?: string[];
  initialStock?: number;
  isEditing?: boolean;
}

export default function ProductForm({
  onSubmit,
  error,
  initialName = '',
  initialPrice = 0,
  initialDescription = '',
  initialImages = [],
  initialStock = 0,
  isEditing = false,
}: ProductFormProps) {
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  // Form state
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [description, setDescription] = useState(initialDescription);
  const [stock, setStock] = useState(initialStock);

  // Image state
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(initialImages);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const initialImagesString = useMemo(
    () => JSON.stringify(initialImages),
    [initialImages]
  );

  // Reset form when initial props change
  useEffect(() => {
    setName(initialName);
    setPrice(initialPrice);
    setDescription(initialDescription);
    setStock(initialStock); // Initialize stock
    setExistingImages(initialImages);
    setDeletedImages([]);
    setPreviewUrls([]);
    setSelectedFiles([]);
  }, [
    initialName,
    initialPrice,
    initialDescription,
    initialStock,
    initialImagesString,
  ]);

  const handleImageUpload = async (file: File) => {
    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}-${file.name}`;

    try {
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(uniqueName, file);

      if (error) throw error;
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${data.path}`;
    } catch (err) {
      showToast('Image upload failed. Max 5MB per image', 'error');
      throw err;
    }
  };

  const handleFileChange = useCallback(
    (files: File[]) => {
      const availableSlots = 5 - (existingImages.length - deletedImages.length);
      const currentNewFiles = selectedFiles.length;

      const validFiles = files.filter((file) => {
        if (!file.type.startsWith('image/')) {
          showToast('Only image files are allowed', 'error');
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          showToast('File size must be less than 5MB', 'error');
          return false;
        }
        return true;
      });

      const totalNewFilesAfterAddition = currentNewFiles + validFiles.length;
      if (totalNewFilesAfterAddition > availableSlots) {
        showToast(
          `You can add up to ${availableSlots} more images (${currentNewFiles} already added)`,
          'error'
        );
        return;
      }

      const urls = validFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...urls]);
      setSelectedFiles((prev) => [...prev, ...validFiles]);
    },
    [
      existingImages.length,
      deletedImages.length,
      selectedFiles.length,
      showToast,
    ]
  );

  const handleRemoveImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      const removedImage = existingImages[index];
      setDeletedImages((prev) => [...prev, removedImage]);
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFileChange(Array.from(e.dataTransfer.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    try {
      showToast(
        isEditing ? 'Updating product...' : 'Adding product...',
        'info'
      );

      const uploadedImageUrls = await Promise.all(
        selectedFiles.map(handleImageUpload)
      );

      const allImages = [...existingImages, ...uploadedImageUrls];

      if (allImages.length === 0) {
        showToast('At least one image is required', 'error');
        return;
      }

      onSubmit({
        productData: {
          name,
          description,
          price,
          stock,
          images: allImages,
        },
        deletedImages: isEditing ? deletedImages : [],
      });
    } catch (error) {
      console.error('Submission failed:', error);
      showToast(`Failed to ${isEditing ? 'update' : 'add'} product`, 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full grid md:grid-cols-2 gap-6">
      {error && (
        <div className="md:col-span-2 text-red-500 p-3 bg-red-50">{error}</div>
      )}

      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <label className="block font-medium">Product Images</label>
          <div
            className={`border-2 border-dashed p-8 text-center transition-colors ${
              isDragging
                ? 'border-accent bg-accent/10'
                : 'border-foreground-faded'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <label htmlFor="images" className="cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <span className="text-accent">Drag & drop images here</span>
                <span className="text-foreground-light">
                  or click to browse
                </span>
                <span className="text-sm text-foreground-light">
                  (Max 5 images, 5MB each)
                </span>
              </div>
            </label>
            <Input
              type="file"
              name="images"
              id="images"
              multiple
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleFileChange(Array.from(e.target.files))
              }
              className="hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {existingImages.map((url, index) => (
            <div
              key={`existing-${index}`}
              className="relative aspect-square border overflow-hidden group">
              <Image
                src={url}
                fill
                alt={`Existing image ${index + 1}`}
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index, true)}
                className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={16} />
              </button>
            </div>
          ))}
          {previewUrls.map((url, index) => (
            <div
              key={`new-${index}`}
              className="relative aspect-square border overflow-hidden group">
              <Image
                src={url}
                fill
                alt={`New image ${index + 1}`}
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index, false)}
                className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <label className="block font-medium">Product Name</label>
          <Input
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Price (KES)</label>
          <Input
            name="price"
            type="number"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Stock Quantity</label>
          <Input
            name="stock"
            type="number"
            min="0"
            required
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-none border border-foreground-light outline-none px-4 py-2 bg-transparent transition-all duration-300 focus:outline-none focus:border-accent disabled:cursor-not-allowed disabled:border-foreground-faded"
          />
        </div>
      </div>

      <CtaButton
        label={
          uploading
            ? isEditing
              ? 'Updating...'
              : 'Adding...'
            : isEditing
            ? 'Update Product'
            : 'Add Product'
        }
        type="submit"
        disabled={
          uploading ||
          existingImages.length -
            deletedImages.length +
            selectedFiles.length ===
            0
        }
        className="w-full md:col-span-2"
      />
    </form>
  );
}
