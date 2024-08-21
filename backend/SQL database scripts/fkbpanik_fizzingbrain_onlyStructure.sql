CREATE DATABASE IF NOT EXISTS `fkbpanik_fizzingbrain` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `fkbpanik_fizzingbrain`;
CREATE TABLE IF NOT EXISTS `question` (
  `id` int(11) NOT NULL,
  `hungarianQuestion` varchar(2000) NOT NULL,
  `englishQuestion` varchar(2000) NOT NULL,
  `hungarianAnswer` varchar(2000) NOT NULL,
  `englishAnswer` varchar(2000) NOT NULL,
  `descriptionHungarian` varchar(2000) DEFAULT NULL,
  `descriptionEnglish` varchar(2000) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(1000) NOT NULL,
  `lastName` varchar(1000) NOT NULL,
  `email` varchar(1000) NOT NULL,
  `password` varchar(1000) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
ALTER TABLE
  `question`
ADD
  PRIMARY KEY (`id`);
ALTER TABLE
  `user`
ADD
  PRIMARY KEY (`id`);
ALTER TABLE
  `question`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 1;
ALTER TABLE
  `user`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 1;
