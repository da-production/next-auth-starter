export const API_ROUTE = '/api'
export const API_AUTH_PREFIX = API_ROUTE.concat('/auth')
export const DEFAULT_LOGIN_REDIRECT_URL = '/dashboard'
export const AUTH_ROUTES = [
    API_AUTH_PREFIX.concat('/login'),
    API_AUTH_PREFIX.concat('/register'),
    API_AUTH_PREFIX.concat('/logout'), 
    API_AUTH_PREFIX.concat('/refresh'), 
    API_AUTH_PREFIX.concat('/reset-password'), 
    API_AUTH_PREFIX.concat('/email-verification'), 
    API_AUTH_PREFIX.concat('/callback'), 
    API_AUTH_PREFIX.concat('/providers'), 
    API_AUTH_PREFIX.concat('/session'), 
    API_AUTH_PREFIX.concat('/session-callback'), 
    API_AUTH_PREFIX.concat('/signout'),
]

export const PUBLIC_ROUTES = [
    '/'
]

export const PROTECTED_ROUTES = [
    '/dashboard'
]