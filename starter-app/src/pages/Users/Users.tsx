import { ReactElement, FC, useEffect, useState } from 'react';
import {
    Box,
    Container,
    CircularProgress,
    Grid,
    Pagination
} from '@mui/material';
import * as userApi from '../../api/modules/users';
import { IUser } from '../../interfaces/users';
import UserCard from '../components/UserCard';

const Users: FC<any> = (): ReactElement => {
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsLoading(true);
                const res = await userApi.getUserByPage(currentPage);
                setUsers(res.data);
                setTotalPages(res.total_pages);
            }
            catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
            }
            setIsLoading(false);
        };
        getUsers();
    }, [currentPage]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                backgroundColor: 'whitesmoke',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box>
                <Container>
                    <Grid container spacing={4} justifyContent='center' my={4}>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <>
                                {users?.map((item) => (
                                    <Grid key={item.id} item lg={2} md={3} xs={6}>
                                        <UserCard {...{ user: item, isClicable: true }} />
                                    </Grid>
                                ))}
                            </>
                        )}
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(event, page) => setCurrentPage(page)} />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Users;