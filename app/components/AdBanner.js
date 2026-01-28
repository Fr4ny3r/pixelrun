// components/AdBanner.js
'use client';

import { useEffect } from 'react';

const AdBanner = ({ dataAdSlot, dataAdFormat = 'auto', dataFullWidthResponsive = 'true' }) => {
  useEffect(() => {
    try {
      // Esto empuja el anuncio al slot disponible
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Error al cargar AdSense:", err);
    }
  }, []);

  return (
    <div className="ad-container" style={{ overflow: 'hidden', textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9158230735641941" // Reemplaza con tu ID
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-adtest="on"
        data-full-width-responsive={dataFullWidthResponsive}
      ></ins>
    </div>
  );
};

export default AdBanner;