'use client';
import { useState, useCallback, useRef } from 'react';
import { useToast } from '@/context/toast-context';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import { Input } from '../Input';
import CtaButton from '../CtaButton';
import { X } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (productData: {
    name: string;
    description: string;
    price: number;
    images: string[];
  }) => void;
  error?: string;
}

export default function ProductForm({ onSubmit, error }: ProductFormProps) {
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

  const handleFileChange = useCallback((files: File[]) => {
    const validFiles = files.filter(file => {
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

    const totalFiles = selectedFiles.length + validFiles.length;
    if (totalFiles > 5) {
      showToast(`Maximum 5 images allowed (${selectedFiles.length} already added)`, 'error');
      return;
    }

    const urls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...urls]);
    setSelectedFiles(prev => [...prev, ...validFiles]);
  }, [selectedFiles.length, showToast]);

  const handleRemoveImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
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

    if (!formRef.current) {
      showToast('Form reference error', 'error');
      return;
    }

    try {
      // Upload images first
      const uploadedImageUrls = await Promise.all(selectedFiles.map(handleImageUpload));

      // Get form values using FormData API
      const formData = new FormData(formRef.current);
      const productData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        images: uploadedImageUrls
      };

      onSubmit(productData);
    } catch (error) {
      console.error('Submission failed:', error);
      showToast('Failed to upload product. Please try again.', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full grid md:grid-cols-2 gap-6"
    >
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
          {previewUrls.map((url, index) => (
            <div
              key={index}
              className="relative aspect-square border overflow-hidden group">
              <Image
                src={url}
                width={300}
                height={300}
                alt={`Preview ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full 
                         opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <label className="block font-medium">Product Name</label>
          <Input name="name" type="text" required />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Price (KES)</label>
          <Input name="price" type="number" step="0.01" required />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full rounded-none border border-foreground-light outline-none px-4 py-2 
                     bg-transparent transition-all duration-300 focus:outline-none focus:border-accent 
                     disabled:cursor-not-allowed disabled:border-foreground-faded"
          />
        </div>
      </div>

      <CtaButton
        label={uploading ? 'Adding Product...' : 'Add Product'}
        type="submit"
        disabled={uploading || selectedFiles.length === 0}
        className="w-full md:col-span-2"
      />
    </form>
  );
}
