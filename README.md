# Cinema Electronic Ticket Application
Welcome to the Cinema Electronic Ticket (E-Ticket) Application repository! This project is designed to provide users with a seamless experience for browsing movies, booking tickets, and managing their cinema visits—all from the convenience of their devices.

## Features
### Guests:
- can browse movies and check for upcoming projections;
- can navigate through base pages - home, prices, about; 

### Users:
- can view available seats and buy tickets;
- can write to the administrator via the contact form;

### Managers:
- can add, update, delete movies (update and delete only if he is the author);
- can add, update, delete screen halls;
- can create a screening schedule for existing movies;

### Admins:
- has the powers of a manager, but also can update and delete all movies;
- can read messages sent through the contact form;
- Can modify some text and images on static web pages. (Note: Only the buttons for this feature are currently visible; functionality is not implemented yet.);
- Can create manager accounts. (Note: Only the button for this feature is currently visible; functionality is not implemented yet.);

## Technologies Used
- Frontend: Angular 18
- Backend & Database: Back4App
- Authentication: Session Token

## Getting Started

### Requirements
- Angular 18 installed.
- APP ID, REST API KEY

### Installation
1. Install dependencies (npm i);
2. Navigate to src / environments;
3. Create a file named keys.ts in environments folder with the following structure:

export const APP_ID = '';
export const  REST_API_KEY = '';

where the values should be your APP ID and REST API KEY.

4. Run the application (ng serve);

## Some users for testing:

### User Role
- username: Dido1
- password: qwerty

### Manager Role
- username: bobi11
- password: qwerty

### Admin Role
- username: Administrator
- password: qwerty

## Found Bugs
- Upon login or registration, the router occasionally fails to redirect to the home page. As a result, users must manually navigate to http://localhost:4200. If the Login and Register buttons still appear, repeat the process until a circular button with the first letter of your username is displayed, indicating successful login.