import { useEffect, useRef, useState } from "react";
import styles from './PaginationButtons.module.css'

export const PaginationButtons = ({
    skip,
    setSkip,
    total,
}) => {
    const [isStaticVisible, setIsStaticVisible] = useState(false);
    const staticButtonsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsStaticVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (staticButtonsRef.current) {
            observer.observe(staticButtonsRef.current);
        }

        return () => {
            if (staticButtonsRef.current) {
                observer.unobserve(staticButtonsRef.current);
            }
        };
    }, []);

    return (
        <>
            {!isStaticVisible && (
                <div className={styles.buttons}>
                    {skip > 0 && (
                        <button
                            className={`${styles.button} ${styles.prev}`}
                            onClick={() => setSkip(prev => Math.max(prev - 30, 0))}
                        >
                            Назад
                        </button>
                    )}

                    {skip + 30 <= total && (
                        <button
                            className={`${styles.button} ${styles.next}`}
                            onClick={() => setSkip(prev => prev + 30)}
                        >
                            Далее
                        </button>
                    )}
                </div>
            )}

            <div ref={staticButtonsRef} className={styles.staticButtons}>
                {skip > 0 && (
                    <button
                        className={`${styles.button} ${styles.prev}`}
                        onClick={() => setSkip(prev => Math.max(prev - 30, 0))}
                    >
                        Назад
                    </button>
                )}

                {skip + 30 <= total && (
                    <button
                        className={`${styles.button} ${styles.next}`}
                        onClick={() => setSkip(prev => prev + 30)}
                    >
                        Далее
                    </button>
                )}
            </div>
        </>
    )
}