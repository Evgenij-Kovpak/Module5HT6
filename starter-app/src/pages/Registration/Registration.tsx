import { ReactElement, FC, useContext, useState } from 'react';
import { Box, TextField, Typography, Button, CircularProgress } from '@mui/material'
import { AppStoreContext } from '../../App';
import RegistrationStore from '../../stores/RegistrationStore';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { appendFile } from 'fs/promises';

const defaultValues = {
    email: '',
    password: ''
};

const Registration: FC<any> = (): ReactElement => {
    const app = useContext(AppStoreContext);
    const store = new RegistrationStore(app.authStore);
    const navigate = useNavigate();

    const [user, setUser] = useState(defaultValues);
    const [confirm, setConfirm] = useState('');

    const handleChange = (outData: any) => {
        setUser(outData);
    };

    const handleChangeConfirm = (confirmPasword: string) => {
        setConfirm(confirmPasword);
    };

    const onSubmit = async (event: any) => {
        event.preventDefault();
        store.changeEmail(user.email);
        store.changePassword(user.password);
        await store.registration();
        alert(`a user was created`)
        navigate('/login')
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Typography component='h1' variant='h5'>
                Register
            </Typography>
            <Box component='form'
                onSubmit={onSubmit}
                noValidate
                sx={{ mt: 1 }}>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    value={user.email}
                    error={user.email.length < 1}
                    onChange={(event) => handleChange({ ...user, email: event.target.value })}
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='password'
                    label='Password'
                    name='password'
                    autoComplete='password'
                    value={user.password}
                    error={user.password.length < 6}
                    onChange={(event) => handleChange({ ...user, password: event.target.value })}
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='password'
                    label='Password'
                    name='confirm'
                    value={confirm}
                    error={confirm != user.password}
                    onChange={(event) => handleChangeConfirm(event.target.value)}
                    autoFocus
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    {store.isLoading ?
                        (<CircularProgress />) :
                        ('Submit')}
                </Button>
            </Box>
        </Box>
    );
};

export default Registration;