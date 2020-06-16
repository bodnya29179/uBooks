TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `after_users_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN\n	SET @count = (SELECT COUNT(UserID) FROM users WHERE Email = NEW.Email);\n	IF @count > 1 THEN\n	SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'User with this email exists!\';\nEND IF;\nEND' 'CREATE DEFINER=`root`@`localhost` TRIGGER `after_users_update` AFTER UPDATE ON `users` FOR EACH ROW BEGIN\n	SET @count = (SELECT COUNT(UserID) FROM users WHERE Email = NEW.Email);\n	IF @count > 1 THEN\n	SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'User with this email exists!\';\nEND IF;\nEND'
sql_modes=1342177280 1342177280
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
db_cl_names='utf8_unicode_ci' 'utf8_unicode_ci'
