import { Title } from '@/shared/ui/Title/Title';
import { UsersTable } from "@/widgets/UsersTable/";

export const UsersPage = () => {
    return (
        <>
            <Title>Информация о пользователях</Title>
            <UsersTable />
        </>
    );
};
