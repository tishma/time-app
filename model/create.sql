DROP TABLE IF EXISTS `timezone`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX unique_username ON `user` (username);
CREATE UNIQUE INDEX unique_api_key ON `user` (api_key);

CREATE TABLE `timezone`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES `user` (id)
);
