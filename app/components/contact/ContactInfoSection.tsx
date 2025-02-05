import React from 'react';

interface ContactInfoSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 text-accent pt-2">{icon}</div>
      <div>
        <h3 className="font-semibold mb-2 text-foreground-light italic">{title}</h3>
        <p className="text-foreground-light whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
};

export default ContactInfoSection;