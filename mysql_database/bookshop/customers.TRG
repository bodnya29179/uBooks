TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER after_customers_update AFTER UPDATE ON customers FOR EACH ROW\nBEGIN\n	SET @count = (SELECT COUNT(UserID) FROM customers WHERE PhoneNumber = NEW.PhoneNumber AND CountryID = NEW.CountryID);\n	IF @count > 1 THEN\n	SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Customer with this phone number exists!\';\nEND IF;\nEND' 'CREATE DEFINER=`root`@`localhost` TRIGGER `after_customers_insert` AFTER INSERT ON `customers` FOR EACH ROW BEGIN\n	SET @count = (SELECT COUNT(UserID) FROM customers WHERE PhoneNumber = NEW.PhoneNumber AND CountryID = NEW.CountryID);\n	IF @count > 1 THEN\n	SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Customer with this phone number exists!\';\nEND IF;\nEND'
sql_modes=1342177280 1342177280
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
db_cl_names='utf8_unicode_ci' 'utf8_unicode_ci'
