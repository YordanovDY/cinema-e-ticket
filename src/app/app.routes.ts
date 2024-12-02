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
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './invalid-pages/page-not-found/page-not-found.component';
import { TicketsComponent } from './user/tickets/tickets.component';
import { PreventDoubleLoginGuard } from './guards/prevent-double-login.guard';
import { TicketDetailsComponent } from './user/ticket-details/ticket-details.component';
import { HttpResponseErrorComponent } from './invalid-pages/http-response-error/http-response-error.component';

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
        path: 'buy-ticket',
        children: [
            { path: '', redirectTo: '/movies', pathMatch: 'full' },
            { path: ':projectionId', component: BuyTicketComponent },
        ],
        canActivate: [AuthGuard]
    },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'tickets',
        children: [
            {path: '', component: TicketsComponent},
            {path: ':ticketId', component: TicketDetailsComponent}
        ]
    },

    { path: 'prices', component: PricesComponent },

    { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard]},

    { path: 'about', component: AboutComponent },

    {path:'http-error', component: HttpResponseErrorComponent},

    { path: '**', component: PageNotFoundComponent }
];
