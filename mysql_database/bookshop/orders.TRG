TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER after_orders_update AFTER UPDATE ON orders FOR EACH ROW\nBEGIN\n	IF NEW.Quantity <= 0  THEN\n		SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Quantyty must be greater than zero!\';\n	END IF;\n    IF DATE(NEW.OrderDate) > DATE(NOW())  THEN\n		SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Datetime is greater than today!\';\n	END IF;\nEND' 'CREATE DEFINER=`root`@`localhost` TRIGGER after_orders_insert AFTER INSERT ON orders FOR EACH ROW\nBEGIN\n	IF NEW.Quantity <= 0  THEN\n		SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Quantyty must be greater than zero!\';\n	END IF;\n    IF DATE(NEW.OrderDate) > DATE(NOW())  THEN\n		SIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Datetime is greater than today!\';\n	END IF;\nEND'
sql_modes=1342177280 1342177280
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
db_cl_names='utf8_unicode_ci' 'utf8_unicode_ci'
