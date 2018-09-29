Create table SchoolType(
Id int identity(1,1) not null,
Name nvarchar(255) not null,
primary key (Id)
);

Create table School(
Id int identity(1,1) not null,
Name nvarchar(255) not null,
Number int,
BelongToUniversityDistrict bit not null,
HasPriority bit not null,
Type_Id int not null,

primary key (Id),
constraint FK_Schoole_SchoolType foreign key (Type_Id) references SchoolType(Id)
);

Create table ContactPerson(
Id int identity(1,1) not null,
FullName nvarchar(255) not null,
PhoneNumber nvarchar(255),
Email nvarchar(255),
Appointment nvarchar(255),
School_Id int,

primary key (Id),
constraint FK_ContactPerson_School foreign key (School_Id) references School(Id)
);

