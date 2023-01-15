import User from './pages/User';
import Settings from './pages/Settings'


import { Route } from './interfaces/route'

export const userRoutes: Array<Route> = [
    {
        key: 'info-user',
        title: 'User Info',
        path: 'user/:id',
        enabled: false,
        component: User
    },
    {
        key: 'user',
        title: 'User Settings',
        path: 'user/settings',
        enabled: true,
        component: Settings
    }
] 