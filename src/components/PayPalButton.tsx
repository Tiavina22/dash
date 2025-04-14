import React, { useEffect } from 'react';

declare global {
  interface Window {
    paypal?: any;
  }
}

export const PayPalButton: React.FC = () => {
  useEffect(() => {
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    const buttonId = import.meta.env.VITE_PAYPAL_BUTTON_ID;

    // Charger le script PayPal SDK
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=hosted-buttons&disable-funding=venmo&currency=EUR`;
    script.crossOrigin = 'anonymous';
    script.async = true;
    document.head.appendChild(script);

    // Initialiser le bouton PayPal une fois le script chargé
    script.onload = () => {
      if (window.paypal) {
        window.paypal.HostedButtons({
          hostedButtonId: buttonId
        }).render(`#paypal-container-${buttonId}`);
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const buttonId = import.meta.env.VITE_PAYPAL_BUTTON_ID;
  return (
    <div id={`paypal-container-${buttonId}`} className="w-32"></div>
  );
}; 