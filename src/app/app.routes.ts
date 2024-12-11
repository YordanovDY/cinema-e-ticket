import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { IsAdminResolver, IsManagerResolver, UserIdResolver, UserResolver } from './user/user.resolver';
import { MovieNamesResolver } from './management/schedule/schedule.resolver';
import { PreventDoubleLoginGuard } from './guards/prevent-double-login.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, resolve: { isAdmin: IsAdminResolver } },

    {
        path: 'movies', children: [
            { 
                path: '', 

                loadComponent: () => import('./movie/movies/movies.component')
                    .then(c => c.MoviesComponent),

                resolve: { isManager: IsManagerResolver, isAdmin: IsAdminResolver } 
            },
            
            {
                path: ':movieId',

                loadComponent: () => import('./movie/movie-details/movie-details.component')
                    .then(c => c.MovieDetailsComponent),

                resolve: { isManager: IsManagerResolver, userId: UserIdResolver, isAdmin: IsAdminResolver }
            },

            { 
                path: 'edit/:movieId', 

                loadComponent: () => import('./movie/edit-movie/edit-movie.component')
                    .then(c => c.EditMovieComponent),

                canActivate: [AuthGuard]
            }
        ]
    },

    { 
        path: 'add-movie',
        
        loadComponent: () => import('./movie/add-movie/add-movie.component')
            .then(c => c.AddMovieComponent),

        canActivate: [AuthGuard], resolve: { userId: UserIdResolver } 
    },

    {
        path: 'buy-ticket',
        children: [
            { path: '', redirectTo: '/movies', pathMatch: 'full' },

            { 
                path: ':projectionId',  

                loadComponent: () => import('./buy-ticket/buy-ticket.component')
                    .then(c => c.BuyTicketComponent)
            },
        ],
        canActivate: [AuthGuard]
    },

    { path: 'login', component: LoginComponent, canActivate: [PreventDoubleLoginGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [PreventDoubleLoginGuard] },
    {
        path: 'tickets',
        children: [
            { 
                path: '',

                loadComponent: () => import('./user/tickets/tickets.component')
                    .then(c => c.TicketsComponent)
             },

            { 
                path: ':ticketId',  

                loadComponent: () => import('./user/ticket-details/ticket-details.component')
                    .then(c => c.TicketDetailsComponent)
            }
        ],

        canActivate: [AuthGuard]
    },

    { 
        path: 'prices', 

        loadComponent: () => import('./prices/prices.component')
            .then(c => c.PricesComponent)
     },

    { 
        path: 'contacts', 

        loadComponent: () => import('./contacts/contacts.component')
            .then(c => c.ContactsComponent),
        
        canActivate: [AuthGuard], 
        
        resolve: { user: UserResolver } 
    },

    { 
        path: 'about', 

        loadComponent: () => import('./about/about.component')
            .then(c => c.AboutComponent),

        resolve: { isAdmin: IsAdminResolver } 
    },

    { 
        path: 'dashboard',  

        loadComponent: () => import('./management/dashboard/dashboard.component')
            .then(c => c.DashboardComponent),
        
        canActivate: [AuthGuard], 
        
        resolve: { isAdmin: IsAdminResolver } 
    },

    { 
        path: 'schedule',

        loadComponent: () => import('./management/schedule/schedule.component')
            .then(c => c.ScheduleComponent),
        
        canActivate: [AuthGuard], 
        
        resolve: { movieNames: MovieNamesResolver } 
    },

    {
        path: 'screens', children: [
            { 
                path: '', 
                
                loadComponent:() => import('./management/screen/screens/screens.component')
                    .then(c => c.ScreensComponent),

                canActivate: [AuthGuard] 
            },

            { 
                path: 'edit/:screenId',
                
                loadComponent: () => import('./management/screen/edit-screen/edit-screen.component')
                    .then(c => c.EditScreenComponent),

                canActivate: [AuthGuard] 
            },
        ]
    },

    { 
        path: 'add-screen',
        
        loadComponent: () => import('./management/screen/add-screen/add-screen.component')
            .then(c => c.AddScreenComponent),

        canActivate: [AuthGuard] 
    },

    {
        path: 'messages', children: [
            {
                path: '',
                loadComponent: () => import('./message/messages/messages.component')
                    .then(c => c.MessagesComponent)
            },
            {
                path: ':messageId',
                loadComponent: () => import('./message/message-details/message-details.component')
                    .then(c => c.MessageDetailsComponent)
            }
        ],
        canActivate: [AuthGuard]
    },

    { 
        path: 'naf', 

        loadComponent: () => import('./invalid-pages/non-available-feature/non-available-feature.component')
            .then(c => c.NonAvailableFeatureComponent)
    },

    { 
        path: 'no-access', 

        loadComponent: () => import('./invalid-pages/no-access/no-access.component')
            .then(c => c.NoAccessComponent)
    },

    {
        path: 'http-error',  
    
        loadComponent: () => import('./invalid-pages/http-response-error/http-response-error.component')
            .then(c => c.HttpResponseErrorComponent)
    },

    { 
        path: '**',
        
        loadComponent: () => import('./invalid-pages/page-not-found/page-not-found.component')
            .then(c => c.PageNotFoundComponent) 
    }
];
