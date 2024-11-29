import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { PricesComponent } from './prices/prices.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },

    {
        path: 'movies', children: [
            { path: '', component: MoviesComponent },
            { path: ':movieId', component: MovieDetailsComponent }
        ]
    },

    {
        path: 'buy-ticket', children: [
            { path: '', redirectTo:'/movies', pathMatch:'full' },
            { path: ':projectionId', component: BuyTicketComponent }
        ]
    },
    
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    {path: 'prices', component: PricesComponent},

    {path: 'contacts', component: ContactsComponent},

    {path: 'about', component: AboutComponent}
];