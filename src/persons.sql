CREATE TABLE Persons (
    Personid int IDENTITY(1,1) PRIMARY KEY,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
);

INSERT INTO Persons (FirstName,LastName)
VALUES ('Mika','Hakinnen');
INSERT INTO Persons (FirstName,LastName)
VALUES ('Niki','Lauda');
INSERT INTO Persons (FirstName,LastName)
VALUES ('Michael','Schumacher');
INSERT INTO Persons (FirstName,LastName)
VALUES ('Ayrton','Senna');
INSERT INTO Persons (FirstName,LastName)
VALUES ('Fernando','Alonso');