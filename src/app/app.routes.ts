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
import { TicketDetailsComponent } from './user/ticket-details/ticket-details.component';
import { HttpResponseErrorComponent } from './invalid-pages/http-response-error/http-response-error.component';
import { IsAdminResolver, IsManagerResolver, UserIdResolver, UserResolver } from './user/user.resolver';
import { AddMovieComponent } from './management/add-movie/add-movie.component';
import { DashboardComponent } from './management/dashboard/dashboard.component';
import { EditMovieComponent } from './management/edit-movie/edit-movie.component';
import { ScheduleComponent } from './management/schedule/schedule.component';
import { MovieNamesResolver } from './management/schedule/schedule.resolver';
import { ScreensComponent } from './management/screens/screens.component';
import { AddScreenComponent } from './management/add-screen/add-screen.component';
import { EditScreenComponent } from './management/edit-screen/edit-screen.component';
import { NonAvailableFeatureComponent } from './invalid-pages/non-available-feature/non-available-feature.component';
import { PreventDoubleLoginGuard } from './guards/prevent-double-login.guard';
import { NoAccessComponent } from './invalid-pages/no-access/no-access.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, resolve: { isAdmin: IsAdminResolver } },

    {
        path: 'movies', children: [
            { path: '', component: MoviesComponent, resolve: { isManager: IsManagerResolver, isAdmin: IsAdminResolver } },
            {
                path: ':movieId',
                component: MovieDetailsComponent,
                resolve: { isManager: IsManagerResolver, userId: UserIdResolver, isAdmin: IsAdminResolver }
            },
            { path: 'edit/:movieId', component: EditMovieComponent }
        ]
    },

    { path: 'add-movie', component: AddMovieComponent, canActivate: [AuthGuard], resolve: { userId: UserIdResolver } },

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
            { path: '', component: TicketsComponent },
            { path: ':ticketId', component: TicketDetailsComponent }
        ]
    },

    { path: 'prices', component: PricesComponent },

    { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard], resolve: { user: UserResolver } },

    { path: 'about', component: AboutComponent, resolve: { isAdmin: IsAdminResolver } },

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], resolve: { isAdmin: IsAdminResolver } },

    { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard], resolve: { movieNames: MovieNamesResolver } },

    { path: 'screens', children:[
        {path: '', component: ScreensComponent},
        {path: 'edit/:screenId', component: EditScreenComponent},
    ]},

    { path: 'add-screen', component: AddScreenComponent, canActivate: [AuthGuard] },

    { path: 'naf', component: NonAvailableFeatureComponent },

    { path: 'no-access', component: NoAccessComponent },

    { path: 'http-error', component: HttpResponseErrorComponent },

    { path: '**', component: PageNotFoundComponent }
];
