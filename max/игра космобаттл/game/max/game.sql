-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 05 2018 г., 02:45
-- Версия сервера: 10.1.25-MariaDB
-- Версия PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `game`
--

-- --------------------------------------------------------

--
-- Структура таблицы `score`
--

CREATE TABLE `score` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `seconds` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `score`
--

INSERT INTO `score` (`id`, `name`, `score`, `seconds`) VALUES
(1, 'max', 11, 15),
(2, 'jake', 7, 20),
(3, 'marina', 88, 59),
(4, '', 0, 0),
(5, '', 0, 0),
(6, 'dwqdw', 0, 5),
(7, 'dwq', 0, 4),
(8, 'Maxim', 0, 7),
(9, 'wdwwd', 0, 6),
(10, 'wdwww', 0, 21),
(11, 'dqwd', 0, 25),
(12, 'prop', 15, 6),
(13, 'wdwdw', -15, 15),
(14, 'dwdwd', 0, 11),
(15, 'dw', 15, 349),
(16, 'dw', 60, 15),
(17, 'dw', 0, 7),
(18, 'wdwd', 0, 9),
(19, 'Jake', 15, 15),
(20, 'Jakex2', 0, 11),
(21, 'Top', 45, 15),
(22, 'wdwd', 105, 42);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `score`
--
ALTER TABLE `score`
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `score`
--
ALTER TABLE `score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
