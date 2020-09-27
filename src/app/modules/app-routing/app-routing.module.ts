import {NgModule} from '@angular/core'
import {Route,RouterModule, Routes} from '@angular/router'

import { NotfoundComponent } from '../../shared/notfound/notfound.component'
import { LoginComponent } from '../../components/auth/login/login.component'
import { RegisterComponent } from '../../components/auth/register/register.component'
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component'
import { HomeComponent } from '../../shared/home/home.component'
import { ProductItemComponent } from '../../components/shopping-cart/product-list/product-item/product-item.component'
import { ProductListComponent } from '../../components/shopping-cart/product-list/product-list.component'
import { ProductViewComponent } from '../../components/shopping-cart/product-list/product-view/product-view.component'
import { AuthGuard } from '../../config/auth.guard'
import { MapComponent } from '../../shared/map/map.component'
import { LoadingComponent } from '../../shared/loading/loading.component'

const routes:Routes = [
    {path:'login', component :LoginComponent},
    {path:'products', component :ProductListComponent},
    {path:'register', component :RegisterComponent},
    {path:'home', component :HomeComponent},
    {path:'map', component :MapComponent},
    {path:'shop', component :ShoppingCartComponent},
    {path:'cart', component :ShoppingCartComponent,canActivate:[AuthGuard]},
    {path:'lo', component :LoadingComponent},
    {path:'products/:id', component :ProductViewComponent},
    {path:'', redirectTo:'/cart', pathMatch:'full'},
    {path:'**', component :NotfoundComponent}
     
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ],
})
export class appRoutingModule{

}