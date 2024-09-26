import React, { useEffect } from 'react';

const BuyMeACoffeeButton = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
        script.async = true;
        script.setAttribute('data-name', 'bmc-button');
        script.setAttribute('data-slug', 'folhatec');
        script.setAttribute('data-color', '#5F7FFF');
        script.setAttribute('data-emoji', '❤️');
        script.setAttribute('data-font', 'Bree');
        script.setAttribute('data-text', 'Me compre um café');
        script.setAttribute('data-outline-color', '#000000');
        script.setAttribute('data-font-color', '#ffffff');
        script.setAttribute('data-coffee-color', '#FFDD00');

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <a
                className="bmc-button"
                href="https://www.buymeacoffee.com/folhatec"
                target="_blank"
                rel="noopener noreferrer"
            >
                Me compre um café
            </a>
        </div>
    );
};

export default BuyMeACoffeeButton;
