import s from './Table.module.css';

export const Table = ({ children, className }) => {
    return (
        <div className={`${s.wrapper} ${className}`}>
            <table className={s.table}>
                {children}
            </table>
        </div>
    );
};
