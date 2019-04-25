Create table "Group"(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
primary key (Id)
);	

Create table Volunteer(
Id bigint identity(1,1) not null,
FullName nvarchar(255) not null,
Group_Id bigint,

primary key (Id),
constraint FK_Volunteer_Group foreign key (Group_Id) references "Group"(Id)
);

Create table Department(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
Color nvarchar(255) not null,
primary key (Id)
);	

Create table Employee(
Id bigint identity(1,1) not null,
FullName nvarchar(255) not null,
PhoneNumber nvarchar(255),
Email nvarchar(255),
Appointment nvarchar(255),
User_Id BIGINT,

primary key (Id),
constraint FK_Employee_User foreign key (User_Id) references "User"(Id)
);