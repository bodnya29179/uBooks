TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER after_bookgenres_update AFTER UPDATE ON bookgenres FOR EACH ROW\nBEGIN\n	SET @count = (SELECT COUNT(BookGenreID) FROM bookgenres WHERE BookGenre = NEW.BookGenre);\n	IF @count > 1 THEN\n		SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Book genre with this name exists!\';\n	END IF;\nEND' 'CREATE DEFINER=`root`@`localhost` TRIGGER `after_bookgenres_insert` AFTER INSERT ON `bookgenres` FOR EACH ROW BEGIN\n	SET @count = (SELECT COUNT(BookGenreID) FROM bookgenres WHERE BookGenre = NEW.BookGenre);\n	IF @count > 1 THEN\n		SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Book genre with this name exists!\';\n	END IF;\nEND'
sql_modes=1342177280 1342177280
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
db_cl_names='utf8_unicode_ci' 'utf8_unicode_ci'
