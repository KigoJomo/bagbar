// app/components/admin/AdminProductGrid.tsx
'use client';

import { Product } from '@/types/declarations';
import { FC } from 'react';
import AdminProductCard from './AdminProductCard';
import { useViewPreference } from '@/context/ViewPreferenceContext';
import { LayoutGrid, List } from 'lucide-react';
import clsx from 'clsx';

type ViewType = 'grid' | 'list';

interface AdminProductGridProps {
  products: Product[];
  className?: string;
}

const ViewToggle = ({
  viewType,
  setViewType,
}: {
  viewType: ViewType;
  setViewType: (type: ViewType) => void;
}) => {
  const viewOptions = [
    { type: 'grid' as const, Icon: LayoutGrid, label: 'Grid view' },
    { type: 'list' as const, Icon: List, label: 'List view' },
  ];

  return (
    <div className="flex gap-2">
      {/* {viewType === ''} */}
      {viewOptions.map(({ type, Icon, label }) => (
        <button
          key={type}
          onClick={() => setViewType(type)}
          className={clsx(
            'p-2 hover:text-accent transition-colors',
            viewType === type ? 'text-accent' : 'text-foreground'
          )}
          aria-label={label}
          aria-pressed={viewType === type}>
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
};

const ColumnHeaders = () => (
  <div className="hidden md:flex w-[90%] text-sm fade-in">
    <div className="w-[65%] font-medium">Product</div>
    <div className="w-48 font-medium">Price Per Unit</div>
    <div className="w-32 font-medium">Stock</div>
  </div>
);

const AdminProductGrid: FC<AdminProductGridProps> = ({
  products,
  className,
}) => {
  const { viewType, setViewType } = useViewPreference();

  return (
    <div className={clsx('w-full flex flex-col gap-4', className)}>
      <div
        className={`w-full flex items-center justify-between ${
          viewType === 'list'
            ? 'bg-foreground-faded backdrop-blur-3xl'
            : 'bg-background'
        } p-2 sticky -top-4 z-10`}>
        {viewType === 'list' ? (
          <ColumnHeaders />
        ) : (
          <div className="w-full"><h4 className='uppercase text-foreground-light'>Inventory</h4></div>
        )}
        <ViewToggle viewType={viewType} setViewType={setViewType} />
      </div>

      <div
        className={clsx(
          'w-full',
          viewType === 'list' && 'flex flex-col gap-2 md:gap-0',
          viewType === 'grid' &&
            'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
        )}>
        {products.map((product) => (
          <AdminProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AdminProductGrid;
