USE rottprototype;

UPDATE rottprototype.user
SET user.AssignmentStreak = 3,
user.Points = 46,
user.LoginStreak = 1
WHERE user.Id = 1;

SELECT * FROM rottprototype.user

INSERT INTO `rottprototype`.`Assignment`
(
`Title`,
`Description`,
`Points`,
`Deadline`,
`Type`,
`Url`,
`Chapter`,
`Answer`)
VALUES
("Tijdmanagement",
"Vul je week uit",
10,
2022-12-15 00:00:00,
"test",
"assignmentweekfifteen",
5,
"");
