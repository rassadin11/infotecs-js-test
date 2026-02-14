import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './UserModal.module.css';

const ANIMATION_DURATION = 300;

export const UserModal = ({ user, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEsc);

        requestAnimationFrame(() => {
            setIsVisible(true);
        });

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    if (!user) return null;

    const handleClose = () => {
        setIsVisible(false);

        setTimeout(() => {
            onClose();
        }, ANIMATION_DURATION);
    };

    return createPortal(
        <div
            className={`${styles.overlay} ${isVisible ? styles.overlayVisible : ''}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-modal-title"
        >
            <div
                className={`${styles.content} ${isVisible ? styles.contentVisible : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={styles.close}
                    onClick={handleClose}
                    aria-label="Закрыть"
                >
                    ×
                </button>

                <div className={styles.flex}>
                    <div>
                        <img src={user.image} alt="avatar" className={styles.avatar} />
                    </div>
                    <div>
                        <h2 id="user-modal-title">
                            {user.lastName} {user.firstName} {user.maidenName}
                        </h2>

                        <p>Возраст: {user.age}</p>
                        <p>Рост: {user.height}</p>
                        <p>Вес: {user.weight}</p>
                        <p>Телефон: {user.phone}</p>
                        <p>Email: {user.email}</p>

                        <h3>Адрес:</h3>
                        <p>Страна: {user.address?.country}</p>
                        <p>Город: {user.address?.city}</p>
                        <p>Улица: {user.address?.address}</p>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
