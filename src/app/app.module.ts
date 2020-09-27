import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { NavComponent } from './shared/header/nav/nav.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { appRoutingModule } from './modules/app-routing/app-routing.module';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SliderComponent } from './shared/home/slider/slider.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomeComponent } from './shared/home/home.component';
import { SectionIComponent } from './shared/home/section-i/section-i.component';
import { SectionIiComponent } from './shared/home/section-ii/section-ii.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { CartItemComponent } from './components/shopping-cart/cart/cart-item/cart-item.component';
import { ProductItemComponent } from './components/shopping-cart/product-list/product-item/product-item.component';
import { ProductService } from './services/product.service';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { WishlistService } from './services/wishlist.service';
import { CartService } from './services/cart.service';
import { MessengerService } from './services/messenger.service';
import { ProductViewComponent } from './components/shopping-cart/product-list/product-view/product-view.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './config/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MapComponent } from './shared/map/map.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderInterceptorService } from './services/loader-interceptor-service';
import { LoaderService } from './services/loader.service';
import { LoadingComponent } from './shared/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingCartComponent,
    SliderComponent,
    HomeComponent,
    SectionIComponent,
    SectionIiComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
    ProductViewComponent,
    MapComponent,
    LoaderComponent,
    LoadingComponent,
    
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService,WishlistService,CartService,MessengerService,AuthService,AuthGuard,LoaderService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true // for use milti interceptors
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
