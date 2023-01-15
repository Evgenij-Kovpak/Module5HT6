import { ReactElement, FC, useEffect, useState } from 'react';
import {
    Box,
    Container,
    CircularProgress,
    Grid,
    Pagination
} from '@mui/material';
import { IResources } from '../../interfaces/resources';
import * as resourceApi from '../../api/modules/resources';
import ResourceCard from '../components/ResourceCard/ResourceCard';

const Resources: FC<any> = (): ReactElement => {
    const [resources, setResources] = useState<IResources[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const getResources = async () => {
            try {
                setIsLoading(true);
                const res = await resourceApi.getResourceByPage(currentPage);
                setResources(res.data);
                setTotalPages(res.total_pages)
            }
            catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
            }
            setIsLoading(false);
        };
        getResources();
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
            <Container>
                <Grid container spacing={4} justifyContent='center' my={4}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {resources?.map((item) => (
                                <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
                                    <ResourceCard {...{ resource: item, isClicable: true }} />
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
    );
};

export default Resources;