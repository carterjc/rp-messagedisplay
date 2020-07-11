DROP DATABASE IF EXISTS message_db;

CREATE DATABASE message_db;

USE message_db;

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS actions;

CREATE TABLE messages
(
	message_id			INT				PRIMARY KEY AUTO_INCREMENT,
    message				VARCHAR(500)	NOT NULL,
    date_added			DATETIME		NOT NULL,
    times_used			INT						,
    date_for			DATE
);

CREATE TABLE actions
(
	action_id 			INT				PRIMARY KEY AUTO_INCREMENT,
    action_log			VARCHAR(50)		NOT NULL,
    message_id			INT						,
    action_time			DATETIME		NOT NULL,
    CONSTRAINT messages_message_id
		FOREIGN KEY (message_id)
        REFERENCES messages (message_id)
);

CREATE TRIGGER messages_OnInsert BEFORE INSERT ON `messages`
	FOR EACH ROW SET NEW.date_added = IFNULL(NEW.date_added, NOW());
    
CREATE TRIGGER actions_OnInsert BEFORE INSERT ON `actions`
	FOR EACH ROW SET NEW.action_time = IFNULL(NEW.action_time, NOW());
