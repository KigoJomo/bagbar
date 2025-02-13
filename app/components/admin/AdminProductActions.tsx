// app/admin/products/[id]/AdminProductActions.tsx

'use client';

import { useState } from 'react';
import { Product } from '@/types/declarations';
import ProductForm from '@/app/components/admin/ProductForm';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/context/toast-context';
import { useRouter } from 'next/navigation';
import GalleryCarousel from '@/app/components/GalleryCarousel';
import { ArrowLeft } from 'lucide-react';

export default function AdminProductActions({ product }: { product: Product }) {
  const [isEditing, setIsEditing] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleUpdateProduct = async ({
    productData,
    deletedImages,
  }: {
    productData: {
      name: string;
      description: string;
      price: number;
      stock: number;
      images: string[];
    };
    deletedImages: string[];
  }) => {
    try {
      // Delete removed images from storage
      if (deletedImages.length > 0) {
        const imageKeys = deletedImages.map((url) => {
          const pathAfterPublic = url.split('/storage/v1/object/public/')[1];
          if (!pathAfterPublic?.startsWith('product-images/')) {
            throw new Error('Invalid image URL');
          }
          return pathAfterPublic.slice('product-images/'.length);
        });

        const { error: deleteError } = await supabase.storage
          .from('product-images')
          .remove(imageKeys);

        if (deleteError) throw deleteError;
      }

      // Update product in database
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', product.id);

      if (error) throw error;

      showToast('Product updated successfully', 'success');
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error('Update failed:', error);
      showToast('Failed to update product', 'error');
    }
  };

  const handleDeleteProduct = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      // Delete all product images
      if (product.images.length > 0) {
        const imageKeys = product.images.map((url) => {
          const pathAfterPublic = url.split('/storage/v1/object/public/')[1];
          if (!pathAfterPublic?.startsWith('product-images/')) {
            throw new Error('Invalid image URL');
          }
          return pathAfterPublic.slice('product-images/'.length);
        });

        const { error: deleteError } = await supabase.storage
          .from('product-images')
          .remove(imageKeys);

        if (deleteError) throw deleteError;
      }

      // Delete product from database
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);

      if (error) throw error;

      showToast('Product deleted successfully', 'success');
      router.push('/admin/products');
    } catch (error) {
      console.error('Delete failed:', error);
      showToast('Failed to delete product', 'error');
    }
  };

  if (isEditing) {
    return (
      <section className="md:pt-12 md:px-12 fade-in">
        <button
          onClick={() => setIsEditing(false)}
          className="mb-6 flex items-center gap-2 text-accent hover:text-accent-dark transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Product</span>
        </button>
        <ProductForm
          onSubmit={handleUpdateProduct}
          initialName={product.name}
          initialPrice={product.price}
          initialDescription={product.description}
          initialImages={product.images}
          initialStock={product.stock || 0}
          isEditing
        />
      </section>
    );
  }

  return (
    <section className="p-0 md:pt-12 md:px-12 flex flex-col md:flex-row md:gap-6 fade-in">
      <div className="w-full md:w-1/2 h-fit md:order-2">
        <GalleryCarousel images={product.images} />
      </div>

      <div className="details w-full md:w-1/2 md:aspect-[4/3] px-4 flex flex-col gap-6">
        <div className="w-full flex flex-col gap-1">
          <h2 className="capitalize hidden md:flex">{product.name}</h2>
          <h3 className="capitalize md:hidden">{product.name}</h3>
          <p className="ml-2 pl-2 border-l-4 border-accent">
            Ksh {product.price.toLocaleString()}
          </p>
        </div>

        <div className="w-full flex flex-col gap-1">
          <p className="text-xs opacity-50">Stock:</p>
          <p className="text-sm">{product.stock || 0} units available</p>
        </div>

        <div className="w-full flex flex-col gap-1">
          <p className="text-xs opacity-50">About:</p>
          <p className="text-sm">{product.description}</p>
        </div>

        <hr className="border-foreground-faded" />

        <div className="buttons w-full flex flex-col gap-4 mt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-3 px-6 bg-accent text-white rounded-none hover:bg-accent-dark transition-colors"
          >
            Edit Product
          </button>
          <button
            onClick={handleDeleteProduct}
            className="w-full py-3 px-6 bg-red-600 text-white rounded-none hover:bg-red-700 transition-colors"
          >
            Delete Product
          </button>
        </div>
      </div>
    </section>
  );
}