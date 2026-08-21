'use client';

import { useEffect, useRef } from 'react';

const AdBanner = ({ dataAdSlot, dataAdFormat = 'auto', dataFullWidthResponsive = 'true' }) => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      // Verifica si el bloque ins existe y no ha sido cargado previamente por AdSense
      if (adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("Error al cargar AdSense:", err);
    }
  }, []);

  return (
    <div className="ad-container" style={{ textAlign: 'center' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9158230735641941"
        data-ad-slot={dataAdSlot}
        data-adtest="on"
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive}
      ></ins>
    </div>
  );
};

export default AdBanner;