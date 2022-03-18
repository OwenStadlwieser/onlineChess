# Intro
## Welcome to online chess
This project features a javascript application where users can signup and challenge their friends to online chess matches
## Link to demo:
https://drive.google.com/file/d/1Q236z1epmLZPFKjT0Gw8sLf5NBXs2R9J/view?usp=sharing
# Run on on your own machine
1. Install xampp https://www.apachefriends.org/index.html
2. Start apache and mysql from xampp app
3. Open php myadmin
4. Create database titled "chess"
5. Create the tables shown below using the SQL tab within database chess
6. Clone this repository to C:\xampp\htdocs
7. open url http://localhost/onlineChess/chess/pages/openchess.html
8. Application should be open :)
# Tables:
## GAMES:
CREATE TABLE `games` (
`whiteplayerid` varchar(100) NOT NULL,
`blackplayerid` varchar(100) NOT NULL,
`Winner` varchar(100) NOT NULL DEFAULT '1',
`gameID` int(11) NOT NULL AUTO_INCREMENT,
`moves` mediumtext NOT NULL,
`starter` int(11) NOT NULL DEFAULT 1,
PRIMARY KEY (`gameID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4
## USERS:
CREATE TABLE `users` (
`user_first` varchar(100) NOT NULL,
`user_last` varchar(100) NOT NULL,
`user_email` varchar(100) NOT NULL,
`user_pwd` varchar(100) NOT NULL,
`rating` int(11) NOT NULL,
`uid` varchar(100) NOT NULL,
`user_uid` varchar(100) NOT NULL,
PRIMARY KEY (`user_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
## FRIENDS:
CREATE TABLE `friends` (
`user1id` varchar(100) NOT NULL,
`user2id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
