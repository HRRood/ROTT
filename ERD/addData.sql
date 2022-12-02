USE rottprototype;

UPDATE rottprototype.user
SET user.AssignmentStreak = 3,
user.Points = 46,
user.LoginStreak = 1
WHERE user.Id = 1;

SELECT * FROM rottprototype.user