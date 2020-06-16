TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `after_countries_update` AFTER UPDATE ON `countries` FOR EACH ROW\nBEGIN\n	SET @count = (SELECT COUNT(CountryID) FROM Countries WHERE CountryName = NEW.CountryName);\n	IF @count > 1 THEN\n	SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Country with this name exists!\';\nEND IF;\nEND' 'CREATE DEFINER=`root`@`localhost` TRIGGER `after_countries_insert` AFTER INSERT ON `countries` FOR EACH ROW BEGIN\n	SET @count = (SELECT COUNT(CountryID) FROM Countries WHERE CountryName = NEW.CountryName);\n	IF @count > 1 THEN\n	SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Country with this name exists!\';\nEND IF;\nEND'
sql_modes=1342177280 1342177280
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
db_cl_names='utf8_unicode_ci' 'utf8_unicode_ci'
