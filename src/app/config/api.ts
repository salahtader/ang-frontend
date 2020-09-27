import {environment} from '../../environments/environment'
export const baseUrl = environment.production ? 'http://localhost:3000' : 'http://localhost:3000'
export const productUrl = baseUrl+'/products'
export const cartUrl = baseUrl+'/orders'
export const wishlistUrl = baseUrl+'/wishlist'
export const addTocart = baseUrl+'/orders'   /***************** */
export const deleteall = baseUrl+'/orders'   /***************** */
export const registerUrl =baseUrl+"/auth/register"
export const loginUrl =baseUrl+"/auth/login"


