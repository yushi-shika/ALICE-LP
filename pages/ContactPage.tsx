import React from 'react';
import Contact from '../components/Contact';
import { ThemeConfig } from '../types';

interface ContactPageProps {
  theme: ThemeConfig;
}

const ContactPage: React.FC<ContactPageProps> = ({ theme }) => {
  return (
    <main className={`${theme.colors.bg} min-h-screen pt-20`}> {/* offset for fixed nav */}
      <Contact theme={theme} />
    </main>
  );
};

export default ContactPage;
