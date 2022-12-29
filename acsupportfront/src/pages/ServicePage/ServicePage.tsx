import React from 'react';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import Chat from 'components/Chat/Chat';

export function ServicePage() {
  return (
    <>
      <Navbar />
      <Chat chatIdentifiaction={1} />
      <Footer />
    </>
  );
}
