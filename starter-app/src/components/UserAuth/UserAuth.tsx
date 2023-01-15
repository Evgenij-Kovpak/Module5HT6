import { useContext, useState } from 'react';
import {
    Avatar,
    Link,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Button
} from '@mui/material';
import { AppStoreContext } from '../../App';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { routes } from '../../routes';
import { userRoutes } from '../../user-routes';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginStore from '../../stores/LoginStore';
import { observer } from 'mobx-react-lite';

const UserAuth = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const login = routes.find(item => item.key == 'login-user');
    const register = routes.find(item => item.key == 'register-user');

    const app = useContext(AppStoreContext);
    const log = new LoginStore(app.authStore);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        log.logout();
        navigate('/');
    };

    return (
        <>{!!app.authStore.token ?
            (<>
                <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='user-appbar'
                    aria-haspopup='true'
                    onClick={handleOpenUserMenu}
                    color='primary'
                >
                    <Avatar />
                </IconButton>
                <Menu
                    id='user-appbar'
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    sx={{
                        display: 'block'
                    }}>
                    {userRoutes.map((page:any) => (
                        !!page.enabled && <Link
                            key={page.key}
                            component={NavLink}
                            to={page.path}
                            color='black'
                            underline='none'
                            variant='button'
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign='center'>
                                    {page.title}
                                </Typography>
                            </MenuItem>
                        </Link>
                    ))}
                </Menu>
                <Button onClick={logout}>
                    <ExitToApp />
                </Button>
            </>
            ) : (
                <>
                    <Button variant='contained' color='success'>
                        {!!login && <Link
                            key={login.key}
                            component={NavLink}
                            to={login.path}
                            color='black'
                            underline='none'
                        >
                            <Typography>{login?.title}</Typography>
                        </Link>}
                    </Button>
                    <Button variant='contained' color='primary'>
                        {!!register && <Link
                            key={register.key}
                            component={NavLink}
                            to={register.path}
                            color='black'
                            underline='none'
                        >
                            <Typography>{register.title}</Typography>
                        </Link>}
                    </Button>
                </>
            )}
        </>
    );
};

export default observer(UserAuth);