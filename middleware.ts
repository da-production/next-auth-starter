import authConfig from "./auth.config"
import NextAuth from "next-auth"
const { auth } = NextAuth(authConfig)
import { 
    AUTH_ROUTES, 
    PUBLIC_ROUTES, 
    PROTECTED_ROUTES, 
    API_AUTH_PREFIX,
    DEFAULT_LOGIN_REDIRECT_URL
} from "./routes"

export default auth((req)=>{
    const isLoggedIn = !!req.auth

    console.log(req.auth)

    const isApiAuthRoutes = req.nextUrl.pathname.startsWith(API_AUTH_PREFIX)
    
    const isProtectedRoutes = PROTECTED_ROUTES.includes(req.nextUrl.pathname)
    
    const isPublicRoutes = PUBLIC_ROUTES.includes(req.nextUrl.pathname)
    
    const isAuthRoutes = AUTH_ROUTES.includes(req.nextUrl.pathname)

    if(isApiAuthRoutes) return null
    
    if(isAuthRoutes) {
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL,req.nextUrl));
        }
        return null;
    }

    if(isProtectedRoutes){
        if(!isLoggedIn){
            return Response.redirect(new URL("/auth/login",req.nextUrl));
        }
        return null;
    }

    return null;
})

export const conf = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}