# FizzingBrain v.1.0.0 - documentation

## 1. The description of the task

A Guess-Quiz

> A Quiz
>
> Skills: Front-end and Back-end
>
> Focus: Data Workflow
>
> Difficulty: 2/5
>
> Creating a quiz on a subject, you know well is an excellent way to
> learn to master a simple data workflow to ensure that your players
> cannot cheat and to popularize and transmit information on a subject
> that you like.

The idea of Fizzingbrain is that the user and the computer fight a guessing duel.

The program allows you to choose the level of difficulty, which affects the time to answer the questions and the accuracy of the computer's guessing.

The program scores the guesses based on the absolute value of the guesses and gives points to the one who is closest to the solution. If they both hit the correct solution, they both get a point. For each question answered correctly, 5 points are awarded.

The game ends after 6 questions and the program will declare a winner on the basis of the points scored: in case of a tie, the program will declare a draw.

### 1.1. Possibilities for further development of the application

- infinite mode, with the possibility of continuous guessing,
- multiplayer mode, via the Internet,
- two human players fighting locally,
- expansion of the current question bank of 50 questions,
- possibility to answer questions with text answers (the program is prepared for this),

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
>
> DB_USER=yourUsername
>
> DB_PASSWORD=yourPassword
>
> DB_NAME=yourDatabaseName
>
> PORT=3003 or whatever your want (apart from 3306, which is reserved for database engines.)

## **3. Version history**

Technologies used: Angular 14 and Bootstrap 5, other NPM libraries (see _package.json_ for the exact list).

### v.1.0.0 (2022-11-11)

- The basic functionality of the application is ready.
- The difficulties can be adjusted.
- Randomized difficulty selection.
- Development of question editor and user editor.
- Question bank of 50 questions created.
- Full authorization and authentication has been done.

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

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">FizzingBrain</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="www.porkolab.digital" property="cc:attributionName" rel="cc:attributionURL">Dr. ??d??m Porkol??b</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="www.github.com/APorkolab" rel="dct:source">www.github.com/APorkolab</a>.<br />Permissions beyond the scope of this license may be available at <a xmlns:cc="http://creativecommons.org/ns#" href="www.porkolab.digital" rel="cc:morePermissions">www.porkolab.digital</a>.

---

# FizzingBrain v.1.0.0 - magyar nyelv?? dokument??ci??

## 1. A feladat le??r??sa

A Guess-Quiz

> A kv??z
>
> Sz??ks??ges k??pess??gek: Front-end ??s Back-end
>
> F??kusz: Adat munkafolyamat
>
> Neh??zs??g: 2/5
>
> Kv??z k??sz??t??se egy olyan t??m??ban, amelyet j??l ismer??nk, kiv??l?? m??dja annak, hogy
> megtanuljunk elsaj??t??tani egy egyszer?? adatmunkafolyamatot ??s biztos??tani tudjuk, hogy a j??t??kosok
> ne tudjanak csalni, valamint n??pszer??s??ts??k ??s tov??bb??ts??k a szeretett t??m??val kapcsolatos inform??ci??kat.

A Fizzingbrain l??nyege, hogy a felhaszn??l?? ??s a computer tippel??si p??rbajt v??v egym??ssal.

A program lehet??s??get ad a neh??zs??gi szint kiv??laszt??s??ra, mely a k??rd??sekre adand?? id??re ??s a a sz??m??t??g??p tippel??si pontoss??g??ra van hat??ssal.

A program a tippek abszol??t ??rt??ke alapj??n ??rt??keli a tippeket ??s annak ad pontot, aki a legk??zelebb van a megold??shoz. Ha mindketten eltal??lj??k a pontos megold??st, mindketten kapnak pontot. Minden k??rd??s helyes megv??laszol??sa ut??n 5 pont j??r.

A j??t??k 6 k??rd??s ut??n ??r v??get ??s a program a megszerzett pontok alapj??n hirdet gy??ztest: azonos pont??rt??k eset??n a program d??ntetlent hirdet.

### 1.1. A program tov??bbfejleszt??si lehet??s??gei

- v??gtelen m??d, ahol lehet??s??g van a folyamatos tippel??sre,
- multiplayer mode, interneten kereszt??l
- k??t emberi j??t??kos k??zdelme helyileg,
- jelenlegi, 50 k??rd??sb??l ??ll?? k??rd??sbank b??v??t??se,
- lehet??s??g a sz??veges v??laszt ig??nyl?? k??rd??sek megv??laszol??s??ra (a program el?? van k??sz??tve erre),

## 2. El??k??sz??letek a program futtat??sa el??tt

### 2.1 Az egyik mell??kelt SQL szkript import??l??sa

A program futtat??sa el??tt a 'backend/SQL adatb??zis szkriptek/fkbpanik_fizzingbrain_onlyStructure.sql' f??jlt be kell import??lni a phpmyadmin vagy a kedvenc adatb??zis-kezel??j??be.

Ha az adatt??bl??k nincsenek l??trehozva, a program backendje nem fog m??k??dni.

_Ha lusta vagy, akkor a "fkbpanik_fizzingbrain_withdata.sql" f??jl import??l??s??val elker??lheted a be??p??tett seedert is (alap??rtelmezetten ki van kapcsolva a programban)._

**A v??laszt??s a ti??d, de fontos, hogy az "SQL adatb??zis szkriptek" mapp??b??l _egyetlen_ f??jlt import??lj.**

### 2.2 Az .env f??jl l??trehoz??sa

**Az alkalmaz??s nem tartalmazza az _.env_** f??jlt, amely az adatb??zis-kapcsolati adatokat tartalmazza. **Ha kl??nozod ezt a projektet, a ._env f??jlt hozz?? kell adni ??s megfelel??en ki kell t??lteni a backend mappa gy??ker??be_.**

A f??jl tartalma a k??vetkez??, k??rlek, haszn??ld a saj??t adatb??zisod megfelel?? adatait :

> DB_HOST=localhost
>
> DB_USER=yourUsername
>
> DB_PASSWORD=yourPassword
>
> DB_NAME=yourDatabaseName
>
> PORT=3003 vagy amit csak akarsz (kiv??ve a 3306-ot, amely az adatb??zis-motorok sz??m??ra van fenntartva).

## **3. Version history**

Alkalmazott technol??gi??k: Angular 14 ??s Bootstrap 5, egy??b NPM k??nyvt??rak (a pontos list??t l??sd a _package.json_-ban).

### v.1.0.0 (2022-11-11)

- A program alapvet?? m??k??d??se elk??sz??lt.
- A neh??zs??gek be??ll??that??ak.
- Randomiz??lt neh??zs??gv??laszt??s.
- K??rd??sszerkeszt?? ??s userszerkeszt?? kialak??t??sa.
- 50 k??rd??sb??l ??ll?? k??rd??sbank k??sz??lt.
- Teljes k??r?? authoriz??ci?? ??s autentik??ci?? k??sz??lt.

## **4. Az alkalmaz??s telep??t??se**

1. Ha nincs telep??tve a Git verzi??kezel?? szoftver, akkor a https://git-scm.com weboldalr??l t??lts??k le ??s telep??ts??k fel a f??oldalon megtal??lhat?? v??ltozatok k??z??l az oper??ci??s rendszer??nknek megfelel??t.

2. Ha nincs telep??tve a NodeJS futtat??k??rnyezet, akkor a https://nodejs.org/en/ weboldalr??l t??lts??k le ??s telep??ts??k fel a f??oldalon tal??lhat??, "LTS" megjel??l??s?? v??ltozatot.

3. Ha nincs telep??tve az Angular keretrendszer a rendszeren, akkor azt a PowerShell-ben kiadott `npm i -g @angular/cli` paranccsal ezt tegy??k meg.

4. Le kell kl??nozni az adott GitHub repository tartalm??t. Teh??t a PowerShell-ben a k??vetkez?? parancsot kell kiadni:

   `git clone https://github.com/APorkolab/Nyelvszo-v.2.0.git`

5. Telep??teni kell az alkalmaz??s f??gg??s??geit:

   - Backend

     - A termin??lon be kell l??pni a /backend mapp??ba (`cd backend`) ??s futtatni az `npm i` parancsot.

   - Frontend
     - A termin??lon be kell l??pni a /frontend mapp??ba ??s futtatni az `npm i` parancsot.

6.1. Manu??lis telep??t??s eset??n:

- A termin??lban ki kell adni az `ng build` parancsot.

- A /frontend/dist/frontend mappa tartalm??t be kell m??solni a /backend/public mapp??ba.

VAGY

6.2. Automatikus telep??t??s eset??n:

- A termin??lon be kell l??pni a /backend mapp??ba ??s futtatni az `npm run build` parancsot.
- Fontos, hogy csak az egyik m??dszer szerint kell telep??teni.

## **4. Az alkalmaz??s konfigur??l??sa**

- A _/frontend/environments_ mapp??ban be kell ??ll??tani az API v??gpont el??r??si ??tvonal??t:

  - _environment.ts_ ??llom??ny: http://127.0.0.1:3000/
  - _environment.prod.ts_ ??llom??ny: http://localhost:3000/

## **5. Az alkalmaz??s ind??t??sa**

- Mind a backend, mind a frontend az `npm start` paranccsal ind??that??.
- A j??t??k aktu??lis verzi??ja a [https://fizzingbrain.porkolab.digital/] c??men el??rhet??.

## **6. Az alkalmaz??s elind??t??sa**

- Mind a backend, mind a frontend az `npm start` paranccsal ind??that??.

## **7. K??l??n k??sz??n??m...**

- K??sz??n??m a projekt ??tlet??t Josef Cruznak: (https://javascript.plainenglish.io/9-super-creative-project-ideas-for-junior-web-developers-e8181e6f4eef).
- K??sz??n??m a k??rd??seket Elaine Foley-nak: https://triviabliss.com/trivia-where-the-answer-is-a-number/
- K??sz??net a k??rd??sek??rt Steve Wright-nak: https://triviabliss.com/trivia-tie-breakers/
- K??sz??net az ingyenes HTML sablon??rt: https://www.tooplate.com/view/2122-nano-folio

## **8. Jogi inform??ci??k**

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons Licenc" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br /><a xmlns:cc="http://creativecommons.org/ns#" href="porkolab.digital" property="cc:attributionName" rel="cc:attributionURL">Dr. Porkol??b ??d??m</a> <span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">FizzingBrain</span> c??m?? m??ve <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Nevezd meg! - Ne add el! 4.0 Nemzetk??zi Licenc</a> alatt van.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="www.github.com/APorkolab" rel="dct:source">www.github.com/APorkolab</a>.<br />Az ezen publikus licenc <strong>hat??sk??r??n k??v??l es??</strong> jogok megtekinthet??ek itt: <a xmlns:cc="http://creativecommons.org/ns#" href="www.porkolab.digital" rel="cc:morePermissions">www.porkolab.digital</a>
