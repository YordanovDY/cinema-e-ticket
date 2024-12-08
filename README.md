# Cinema Electronic Ticket Application
Welcome to the Cinema Electronic Ticket (E-Ticket) Application repository! This project is designed to provide users with a seamless experience for browsing movies, booking tickets, and managing their cinema visits—all from the convenience of their devices.

## Features
- Everyone can browse movies and check for upcoming projections.
- Logged in users can view available seats and choose the perfect spot for their viewing experience.
- Users can purchase tickets at any time of the day and access them by their mobile device at check-in.
- Managers can add movies, create schedule and organize the screen halls. They can also read messages sent through the contact form.
- The administrator has the powers of a manager and can change some of the text and images in static web pages. The administrator can also register manager accounts.

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

## Found Bugs
- Upon login or registration (more frequently during registration), the router occasionally fails to redirect to the home page. As a result, users must manually navigate to http://localhost:4200. If the Login and Register buttons still appear, repeat the process until a circular button with the first letter of your username is displayed, indicating successful login.