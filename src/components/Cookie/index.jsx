import React, { useState, useEffect } from 'react';
import './styles.css'; // Opcional: para estilos personalizados
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consentGiven = localStorage.getItem('cookieConsent');
        if (!consentGiven) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShowBanner(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        setShowBanner(false);
    };

    return (
        showBanner && (
            <div className="cookie-banner">
                <p>
                    Este site usa cookies para melhorar sua experiência. Ao continuar navegando, você concorda com o uso de cookies.<br />
                    <Link to="/politica-de-privacidade">Política de privacidade</Link> -
                    <Link to="/termo-de-uso">Termos de uso</Link>
                </p>
                <Button type='primary' onClick={handleAccept}>Aceitar</Button>
                <Button type='default' onClick={handleReject} className="reject-button">Rejeitar</Button>
            </div>
        )
    );
};

export default CookieBanner;
