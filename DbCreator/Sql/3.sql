Create table "User"(
Id bigint identity(1,1) not null,
Login nvarchar(255) not null,
Password nvarchar(255) not null,
Type int not null,
primary key (Id)
);

CREATE table Attendee(
Id bigint identity(1,1) not null,
FullName nvarchar(255) not null,
PhoneNumber nvarchar(255),
Email nvarchar(255),
Type int not null,
User_Id BIGINT,

primary key (Id),
constraint FK_Attendee_User foreign key (User_Id) references "User"(Id)
);

Create table AcademicProgram(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
primary key (Id)
);	

Create table Pupil(
Sex int not null,
YearOfGraduation int not null,
EnterProgram_Id bigint,
School_Id bigint not null,
Attendee_Id bigint not null,

constraint FK_Pupil_EnterProgram foreign key (EnterProgram_Id) references AcademicProgram(Id),
constraint FK_Pupil_School foreign key (School_Id) references School(Id),
constraint FK_Pupil_Attendee foreign key (Attendee_Id) references Attendee(Id),
constraint AK_AttendeeId unique(Attendee_Id)
);

Create table InterestingProgram(
AcademicProgram_Id bigint not null,
Pupil_Id bigint not null,

constraint FK_InterestingProgram_AcademicProgram foreign key (AcademicProgram_Id) references AcademicProgram(Id),
constraint FK_InterestingProgram_Pupil foreign key (Pupil_Id) references Pupil(Attendee_Id)

);	

Create table RegistrationProgram(
AcademicProgram_Id bigint not null,
Pupil_Id bigint not null,

constraint FK_RegistrationProgram_AcademicProgram foreign key (AcademicProgram_Id) references AcademicProgram(Id),
constraint FK_RegistrationProgram_Pupil foreign key (Pupil_Id) references Pupil(Attendee_Id)
);