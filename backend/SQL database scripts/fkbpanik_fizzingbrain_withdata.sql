-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Nov 12. 15:57
-- Kiszolgáló verziója: 10.4.25-MariaDB
-- PHP verzió: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `fkbpanik_fizzingbrain`
--
CREATE DATABASE IF NOT EXISTS `fkbpanik_fizzingbrain` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `fkbpanik_fizzingbrain`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `hungarianQuestion` varchar(2000) NOT NULL,
  `englishQuestion` varchar(2000) NOT NULL,
  `hungarianAnswer` varchar(2000) NOT NULL,
  `englishAnswer` varchar(2000) NOT NULL,
  `descriptionHungarian` varchar(2000) DEFAULT NULL,
  `descriptionEnglish` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `question`
--

INSERT INTO `question` (`id`, `hungarianQuestion`, `englishQuestion`, `hungarianAnswer`, `englishAnswer`, `descriptionHungarian`, `descriptionEnglish`) VALUES
(358, 'Melyik évben koronázták meg II. Erzsébet angol királynőt?', 'In which year was Queen Elizabeth II of England crowned?', '1953', '1953', '', ''),
(359, 'Milyen magas a Chrysler Building Manhattanben?', 'How tall is the Chrysler Building in Manhattan in meters?', '319', '319', '', ''),
(360, 'Hány teáskanálnyi anyag fér egy csészébe?', 'How many teaspoons are in a cup?', '48', '48', '', ''),
(361, 'Hány évig tartott a trójai háború?', 'How many years did the Trojan War last?', '10', '10', '', ''),
(362, 'Melyik évben került a mozikba a Disney Szépség és a szörnyeteg című animációs filmje?', 'What year was Disney\'s animated Beauty and the Beast in theaters?', '1991', '1991', '', ''),
(363, 'Charles Dickens \'Szép remények/Nagy várakozások\' című műve melyik évben jelent meg először?', 'Charles Dickens\' \'Great Expectations\' was first published in what year?', '1861', '1861', '', ''),
(364, 'Hány év telt el a függetlenségi háború kezdete és az amerikai polgárháború vége között?', 'How many years passed between the beginning of the Revolutionary War and the end of the American Civil War?', '89', '89', '1776-1865', '1776-1865'),
(365, 'Hány ízület van egy felnőtt ember lábában?', 'How many joints are in each adult human\'s foot?', '30', '30', '', ''),
(366, 'Hány fő szervrendszer található az emberi szervezetben?', 'How many major organ systems are in the human body?', '11', '11', '', ''),
(367, 'Hány Ford T-modell autót gyártottak a gyártás csúcsévében, 1923-ban?', 'How many Ford Model T cars were produced during their peak production year, 1923?', '2011125', '2011125', '', ''),
(368, 'Hányszor hangzik el a vér szó Shakespeare klasszikus darabjában, a Macbethben?', 'How many times is the word: blood spoken in Shakespeare\'s classic play Macbeth?', '42', '42', '', ''),
(369, 'Hány másodperc 35 perc?', 'How many seconds are in 35 minutes?', '2100', '2100', '', ''),
(370, 'Hány másodperc 3 év?', 'How many seconds are in 3 years?', '94608000', '94608000', '', ''),
(371, 'Hány oldalas a Harry Potter-sorozat ötödik könyve, a Harry Potter és a Főnix Rendje?', 'How many pages are in the Harry Potter series\' fifth book, Harry Potter and the Order of the Phoenix?', '766', '766', '', ''),
(372, 'Hány oldalas Michelle Obama - Így lettem (Becoming) című memoárja?', 'How many pages are in Michelle Obama\'s memoir Becoming?', '448', '448', '', ''),
(373, 'Hány epizódból állt az 1990-es évek népszerű szitkomjának, a Jóbarátoknak az első évada?', 'How many episodes were there in the first season of beloved 1990s sitcom Friends?', '24', '24', '', ''),
(374, 'Hányan élték túl a Titanic elsüllyedését?', 'How many people survived the sinking of the RMS Titanic?', '706', '706', '', ''),
(375, 'Az IMDB szerint hány perces az eredeti kiadású, 1972-es Keresztapa 1.?', 'According to IMDB, how long in minutes is the 1972 original release version of The Godfather?', '175', '175', '', ''),
(376, 'Melyik évben jelent meg az első iPhone az Egyesült Államokban?', 'In what year was the first iPhone released for sale in the USA?', '2007', '2007', '', ''),
(377, 'Melyik évben halt meg Michael Jackson?', 'In what year did Michael Jackson die?', '2009', '2009', '', ''),
(378, 'Hány pontot szerzett Kareem Abdul-Jabbar - az NBA minden idők legjobb pontszerzője - profi karrierje során?', 'How many points did Kareem Abdul-Jabbar - the NBA\'s all-time leading scorer - score during his pro career?', '38387', '38387', '', ''),
(379, 'Hány szoba található a Fehér Házban?', 'How many rooms are in the White House?', '135', '135', '', ''),
(380, 'Hány győzelmet gyűjtött össze Rocky Marciano veretlen nehézsúlyú ökölvívó profi karrierje során?', 'How many wins did undefeated heavyweight boxer Rocky Marciano amass during his professional career?', '49', '49', '', ''),
(381, 'Hány kilométer légvonalban London és New York?', 'As the crow flies, how many miles is it from London to New York?', '5584', '5584', '', ''),
(382, 'Hány kilométer légvonalban Makó és Jeruzsálem?', 'As the crow flies, how many miles is it from Makó, Hungary to Jerusalem, Israel?', '3285', '3285', '', ''),
(383, 'Hány kilométer légvonalban Budapest és Washington?', 'As the crow flies, how many miles is it from Budapest, Hungary to Washington DC, United States?', '11804', '11804', '', ''),
(384, 'Hány teáskanálnyi anyag fér egy csészébe?', 'How many teaspoons are in a cup?', '48', '48', '', ''),
(385, 'Hány gramm testömegű egy fekete gólya?', 'How many grams is a black stork?', '3000', '3000', '', ''),
(386, 'Hány darab háti csigolyánk van?', 'How many dorsal (back) vertebrae do we have?', '12', '12', '', ''),
(387, 'Hány méter magas egy narancsfa?', 'How many metres tall is an orange tree?', '8', '8', '', ''),
(388, 'Hány méter hosszú egy pápaszemes kobra?', 'How many metres is an Indian cobra long?', '2', '2', '', ''),
(389, 'Hány számot tartalmaz egy hagyományos európai rulettkerék?', 'How many numbers are on a traditional European roulette wheel?', '37', '37', 'Az európai rulettkeréken 37 szám van, az amerikai rulettkeréken pedig 38 (a dupla 0 miatt).', 'There are 37 numbers on a European roulette wheel and 38 numbers on an American Roulette wheel (because of the double 0).'),
(390, 'Hány liter vére van átlagosan egy embernek?', 'On average, how many litres of blood does a person have?', '5', '5', '', ''),
(391, 'Van 10 hal egy zárt akváriumban. 2 elsüllyedt, 4 elúszott, 3 meghalt. Hány hal van most az akvárium?', 'I have 10 fish in a closed aquarium. 2 sunk, 4 swam away, 3 died. How many fish are now in the aquarium?', '10', '10', 'Egy sem hagyta el az akváriumot.', 'Not a single one has left the aquarium.'),
(392, 'Ha kilencszer egymás után feldobsz egy pénzérmét és mind a kilencszer írás lesz, akkor hány százalék az esély arra, hogy tizedikre fej lesz?', 'If you flip a coin nine times in a row and all nine times it comes up heads, what is the percentage chance that it will come up heads on the tenth time?', '50', '50', 'A dobások egymástól függetlenek.', 'The flips are independent of each other.'),
(393, 'Melyik évben nyerte el Indonézia a függetlenségét Hollandiától?', 'In what year did Indonesia gain its independence from the Netherlands?', '1945', '1945', '', ''),
(394, ' Mennyi a nőstény Csendes-óceáni északi simabálna élettartama években kifejezve?', 'What is the average lifespan in years of a female North Pacific right whale?', '70', '70', '', ''),
(395, 'Mennyi a gepárdok várható élettartama években kifejezve?', 'What is the median life expectancy in years for a cheetah ?', '12', '12', '', ''),
(396, 'Mekkora a Holt-tenger legnagyobb mélysége méterben?', 'What is the maximum depth of the Dead Sea?', '306', '306', '', ''),
(397, 'Hány felesége volt VIII. Henrik angol királynak?', 'How many wives did King Henry VIII have?', '6', '6', '', ''),
(398, 'Melyik évben koronázták XIV. Lajost Franciaország királyává?', 'What year was Louis XIV crowned the king of France?', '1654', '1654', '', ''),
(399, 'Melyik évben koronázták meg I.Viktória, angol királynőt?', 'In what year was Queen Victoria of the United Kingdom crowned?', '1838', '1838', '', ''),
(400, 'Hány méter hosszú a Brooklyn Bridge?', 'How many meters long is the Brooklyn Bridge?', '1834', '1834', '', ''),
(401, 'Melyik évben született a 14. dalai láma?', 'What year was the 14th Dalai Lama born in?', '1935', '1935', '', ''),
(402, 'Melyik évben halt meg II. Erzsébet angol királynő?', 'What year was reigning English monarch Queen Elizabeth II dies in?', '2022', '2022', '', ''),
(403, 'Melyik évben született II. Erzsébet angol királynő?', 'What year was reigning English monarch Queen Elizabeth II born in?', '1926', '1926', '', ''),
(404, 'Milyen hosszú az \'Óz, a csodák csodája\' című film percben kifejezve?', 'What is the run time of \'The Wizard of Oz\' in minutes?', '112', '112', '', ''),
(405, 'Milyen hosszú az \'Elfújta a szél\' című film percben kifejezve?', 'What is the run time in minutes of \'Gone With the Wind\'?', '238', '238', '', ''),
(406, 'Hány szobával büszkélkedhet a Versailles-i kastély?', 'How many rooms does the Palace of Versailles boast?', '2300', '2300', '', ''),
(407, 'Hány fürdőszoba található a Fehér Házban?', 'How many bathrooms are in the White House?', '35', '35', '', ''),
(408, 'Hány yard egy mérföld?', 'How many yards are in a mile?', '76', '76', '', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(1000) NOT NULL,
  `lastName` varchar(1000) NOT NULL,
  `email` varchar(1000) NOT NULL,
  `password` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`) VALUES
(1, 'Zoltán', 'Dr. Porkoláb', 'adam@porkolab.digital', '$2a$10$mG8QBTLEN2zfvitmGuE3W.ZQKvTHvgJct9KRDsiTjrrYzrRenJnTC'),
(2, 'Mókus', 'Minta', 'minta@minta.hu', '$2a$10$c1qOoTf9.fwREtY7lLMdbuLy8qa07/oGOxTv.wWShoZjAPs7hHMfu'),
(3, 'Ádám', 'Dr. Porkoláb', 'adam@porkolab.digital', '$2a$10$1qVEZuu61dJrWaQDsIaWvuYze45kC5y42TMrDVX36eiJ1I/fjXPWa'),
(4, 'Mókus', 'Minta', 'minta@minta.hu', '$2a$10$TEhujFrzX4PYLlEjMLMv/OFF27V/OEkAYPEDkZwtMlkg2kPGRX2Mi'),
(5, 'Ádám', 'Dr. Porkoláb', 'adam@porkolab.digital', '$2a$10$6kWcxYSaLuJS.Rn3tgLX2eahb5rFJRswWskpxLgX6EeSl0HtcQ6Ee'),
(6, 'Mókus', 'Minta', 'minta@minta.hu', '$2a$10$8Wq4xiMVYSvFn07peBoGZO6VlvLKLxi3gth9mvnbgfd5DTUYTkg/O'),
(7, 'Ádám', 'Dr. Porkoláb', 'adam@porkolab.digital', '$2a$10$woG4s0.HeSENpB3mG0VhVO2kFv8K09KQW405kmGHlOR5q6QbcIGMi'),
(8, 'Mókus', 'Minta', 'minta@minta.hu', '$2a$10$0FKoZPkvcR3uxfiwfoL.cOUdRusKJuhDIqEEvvuDdd/drPw2gHBo.'),
(9, 'Ádám', 'Dr. Porkoláb', 'adam@porkolab.digital', '$2a$10$5/PZ0AidhjBmKROVfapIBOuGaUQPXxjwKGtmb29oTcJaOQA4liDRi'),
(10, 'Mókus', 'Minta', 'minta@minta.hu', '$2a$10$tWQP566VQT7EuchwXCRpLuE/ZebNP1tWGToPTDU4dWm/JFgimrP6.'),
(11, 'Ádám', 'Dr. Porkoláb', 'adam@porkolab.digital', '$2a$10$KWFtI0R8X5DIsHL4L/Tp0.lSRze.50DK8NwCiXv2SY.YpZm3Yc39C'),
(12, 'Mókus', 'Minta', 'minta@minta.hu', '$2a$10$5xHsD6AI/8t6oeRPRkZMDuwSuKBGsUA7mYaoi6RxrHNXb3wJqTpXO'),
(13, 'Ádám', 'Dr. Porkoláb', 'adam@porkolab.digital', '$2a$10$unMgzmQpSqM2SFJnimQvnOhZgF5LQDUFTRKWBxIsaKcvvm5W3T3WC');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=410;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
