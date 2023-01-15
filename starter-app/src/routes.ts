import About from './pages/About';
import Home from './pages/Home';
import Products from './pages/Products';
import User from './pages/User';
import Users from './pages/Users';
import Resource from './pages/Resource';
import Resources from './pages/Resources';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { Route } from './interfaces/route';


export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'about-route',
        title: 'About',
        path: '/about',
        enabled: true,
        component: About
    },
    {
        key: 'products-route',
        title: 'Products',
        path: '/products',
        enabled: true,
        component: Products
    },
    {
        key: 'user-route',
        title: 'User',
        path: '/user/:id',
        enabled: false,
        component: User
    },
    {
        key: 'login-route',
        title: 'Login',
        path: '/login',
        enabled: true,
        component: Login
    },
    {
        key: 'users-route',
        title: 'Users',
        path: '/users',
        enabled: true,
        component: Users
    },
    {
        key: 'resources-route',
        title: 'Resources',
        path: '/resources',
        enabled: true,
        component: Resources
    },
    {
        key: 'resource-route',
        title: 'Resource',
        path: '/resource/:id',
        enabled: false,
        component: Resource
    },
    {
        key:'register-user',
        title:'Registration',
        path:'/registration',
        enabled: false,
        component: Registration
    }
]