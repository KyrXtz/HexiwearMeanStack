# E-health web app using MEAN stack and Typescript
E-health web application based on the MEAN stack technologies(MongoDB, Express.js, Angular, and Node.js) and Typescript. Various graphs and charts(using Chart.js) are provided to display incoming sensor data (heart rate, steps, etc.) from the open-source Hexiwear smartwatch for each patient, as well as a private chat and BMI(Body Mass Index), BMR(Basal Metabolic Rate), TDEE(Total Daily Energy Expenditure) algorithm calculations.

Other features:
- password hashing with bcrypt
- authentication and authorization with JSON Web Tokens(JWT)

## Installation
1) Run `npm install` on `./Site` directory. 
2) Run `npm install` on `./Site/angular-src` directory.
3) Run `ng build` on `./Site/angular-src` directory.
4) Run `npm start` on `./Site` directory.
5) Visit /localhost:3000 on your browser.
## Mongodb
To get mongodb functionality you must set your username password and localdb name respectively in `.Site/config/database.js`.
