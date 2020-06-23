# uBooks Project
This project was created using the Angular CLI (v. 7.3.9) and the Node.js (v. 10.15.3) server environment. The following packages (dependencies) are used for the server side: cors, express, mysql, nodemon. The following packages are used for the client part: bootstrap, jquery, font-awesome, angular-font-awesome, core-js, rxjs, tslib, zone.js.
The "uBooks" application includes the following user roles: buyer, seller, admin.
Description of roles:
* The buyer has the opportunity to order books. Buyers can use data filtering to find the right book. They can also view their books' orders and their status. Also, the buyer may be a seller who has the opportunity to offer his books.
* The administrator has the ability to create, edit and delete data.

Users have the ability to edit their profile.
All data is stored in the MySQL database "bookshop". The server interacts with the database using SQL queries (CRUD) and stored procedures.

## Requirements

* Node.js
* Angular CLI
* XAMPP-Control
* Git

## Common setup

### Clone the repository ###

```bash
git clone https://github.com/bodnya29179/uBooks.git
```
Also you can download the repository as a `.zip` file.

### Install npm packages (dependencies) ###

```bash
cd back-end_nodejs
npm install
```

```bash
cd front-end_angular/book-store
npm install
```

Shut it down manually with `Ctrl-C`.

### Install XAMPP-Control ###
Install XAMPP-Control using this link https://www.apachefriends.org/ru/download.html.
Paste the `bookshop` folder in the following directory: `..\xampp\mysql\data`. In the end you will have the path `..\xampp\mysql\data\bookshop`.

## Run

Run the program `XAMPP Control Panel`. Start `Apache` and `MySQL` modules.

Navigate to `back-end_nodejs` folder using `cd back-end_nodejs` in the terminal. Use `nodemon server.js` for a run back-end part.

Navigete to `front-end_angular/book-store` folder using `cd front-end_angular/book-store` in the terminal. Use `ng serve` for a run front-end part. Navigate to `http://localhost:4200/` in your browser. You can also use the `ng serve -o` in the terminal to automatically open a web page.
