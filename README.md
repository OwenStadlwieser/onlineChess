Link to demo:
https://drive.google.com/file/d/1Q236z1epmLZPFKjT0Gw8sLf5NBXs2R9J/view?usp=sharing

#Tables:
##GAMES:
CREATE TABLE `games` (
`whiteplayerid` varchar(100) NOT NULL,
`blackplayerid` varchar(100) NOT NULL,
`Winner` varchar(100) NOT NULL DEFAULT '1',
`gameID` int(11) NOT NULL AUTO_INCREMENT,
`moves` mediumtext NOT NULL,
`starter` int(11) NOT NULL DEFAULT 1,
PRIMARY KEY (`gameID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4
##USERS:
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
##FRIENDS:
CREATE TABLE `friends` (
`user1id` varchar(100) NOT NULL,
`user2id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
