import React from 'react';

interface FeatureSectionProps {
  index: number;
  title: string;
  description: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  index,
  title,
  description,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <span className="text-foreground-light font-semibold">(0{index + 1})</span>
        <h3 className="font-semibold italic text-foreground-light">{title}</h3>
      </div>
      <p className="text-foreground-light pl-12">{description}</p>
    </div>
  );
};

export default FeatureSection;