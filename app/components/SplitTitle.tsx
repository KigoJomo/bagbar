import React from 'react';

interface SplitTitleProps {
  text: string;
}

const SplitTitle = ({ text }: SplitTitleProps) => {
  const [firstWord, secondWord] = text.split(' ');

  if (!firstWord || !secondWord) {
    throw new Error(
      'SplitTitle component requires a string with exactly two words'
    );
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex items-center -mt-2 md:-mt-6">
        <h1 className="uppercase italic text-nowrap hover:not-italic transition-all duration-300">
          {firstWord}
        </h1>
        <div className="w-full h-[1px] border-t border-foreground-faded border-dashed"></div>
      </div>
      <div className="w-full flex items-center -mt-6 md:-mt-24 md:-mb-8">
        <div className="w-full h-[1px] border-t border-foreground-faded border-dashed"></div>
        <h1 className="uppercase italic text-nowrap hover:not-italic transition-all duration-300">
          {secondWord}
        </h1>
      </div>
    </div>
  );
};

export default SplitTitle;
