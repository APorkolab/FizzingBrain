# FizzingBrain v.1.0.0 - documentation

## 1. The description of the task

A Guess-Quiz

> A Quiz
>
> Skills: Front-end and Back-end
> Focus: Data Workflow
> Difficulty: 2/5
>
> Creating a quiz on a subject, you know well is an excellent way to
> learn to master a simple data workflow to ensure that your players
> cannot cheat and to popularize and transmit information on a subject
> that you like.

## 2. Preparations before running the software

### 2.1 The import of one of the included SQL script

Before running the program, the file 'backend/SQL database scripts/fkbpanik_fizzingbrain_onlyStructure.sql' must be imported into phpmyadmin or your favorite database manager.

If the data tables are not created, the backend of the program will not work.

_If you're lazy, you can also avoid using the built-in seeder (it's disabled by default in the program) by importing the "fkbpanik_fizzingbrain_withdata.sql" file._

**The choice is yours, but it is important to import _ONE_ of the files from the 'SQL database scripts' folder.**

### 2.2 The creation of the .env file

**The application excludes the file _.env_**, which contains the database connection data. **If you clone this project, the ._env file needs to be added and properly filled a the root of your backend_.**

The contents of the file are as follows, please use proper data of your database :

> DB_HOST=localhost
> DB_USER=yourUsername
> DB_PASSWORD=yourPassword
> DB_NAME=yourDatabaseName
> PORT=3003 or whatever your want (apart from 3306, which is reserved for database engines.)

## **3. Version history**

Technologies used: Angular 14 and Bootstrap 5, other NPM libraries (see _package.json_ for the exact list).

### v.1.0.0 (2022-11-01)

- Package size is now customizable,
- The game state is saved to localstorage, if the user moves to another page and then wants to continue the game, the program will reset the state (currently restore after reload is disabled, but it can be enabled).
- Develop appropriate routing.
- Design more faithful to the design specification.
- Bug fixing (complete elimination of 'any').
- Correction of respositivity errors.
- Rationalisation of function assignment and card service.
- Storing data in a Card model instead of JSON, in line with good practice.
- Background map (_thanks to **vedanti** for the wonderful photo: [https://www.pexels.com/photo/gray-pavement-245250/](https://www.pexels.com/photo/gray-pavement-245250/)_).
- **Timeframe used:** _About 16 hours_.

## **4. Install the application**

1.  If you do not have the Git version control software installed, download and install the version for your operating system from [https://git-scm.com](https://git-scm.com/).
2.  If you do not have the NodeJS runtime environment installed, download and install the version marked "LTS" from [https://nodejs.org/en/](https://nodejs.org/en/).
3.  If you do not have the Angular framework installed on your system, do so by issuing the `npm i -g @angular/cli` command in PowerShell.
4.  clone the contents of the relevant GitHub repository. So in PowerShell, issue the following command:

    `git clone https://github.com/APorkolab/FizzingBrain.git`

5.  **Point 2 provides instructions. Please follow them.**

6.  Install the application dependencies:

    - Backend

      - In the terminal, go to the /backend folder (`cd backend`) and run `npm i`.

    - frontend

      - On the terminal, go to the /frontend folder and run `npm i`.\*

7.1. For manual installation:

- In the terminal, issue the `ng build` command.
- The contents of the /frontend/dist/frontend folder must be copied to the /backend/public folder.

OR

7.2. For automatic installation:

- In the terminal, go to the /backend folder and run the `npm run build` command.
- It is important to install using only one of the methods.

## **5. Configure the application**

- In the _/frontend/environments_ folder, configure the API endpoint path:

  - _environment.ts_ file: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)
  - _environment.prod.ts_ file: [http://localhost:3000/](http://localhost:3000/)

## **6. Start the application**

- Both the backend and the frontend can be started with the `npm start` command.

## **7. A special thanks to...**

- Thanks for the project idea for Josef Cruz (https://javascript.plainenglish.io/9-super-creative-project-ideas-for-junior-web-developers-e8181e6f4eef)
- Thanks for the trivias: https://triviabliss.com/trivia-where-the-answer-is-a-number/
- Thanks for the trivias: https://triviabliss.com/trivia-tie-breakers/
- Thanks for the free HTML template: https://www.tooplate.com/view/2122-nano-folio

## **8. Legal information**

[![Creative Commons License](https://camo.githubusercontent.com/72af7c8e70a45c471163e803748d0338b3b2b52f6b040804e549e4163de72a58/68747470733a2f2f692e6372656174697665636f6d6d6f6e732e6f72672f6c2f62792f342e302f38387833312e706e67)](http://creativecommons.org/licenses/by/4.0/)  
This work by [Ádám Dr. Porkoláb](https://porkolab.digital/) is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).  
Based on a work at [](https://github.com/APorkolab/)[https://github.com/APorkolab/](https://github.com/APorkolab/).
