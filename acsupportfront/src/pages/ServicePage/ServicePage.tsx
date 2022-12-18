import React from 'react';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import Chat from 'components/Chat/Chat';

export function ServicePage() {
  return (
    <>
      <p>Panel usługi i oferty</p>
      <Navbar />
      <Chat />
      <Footer />
    </>
  );
}
