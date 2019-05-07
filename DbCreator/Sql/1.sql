Create table SchoolType(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
primary key (Id)
);

Create table School(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
Number int,
BelongToUniversityDistrict bit not null,
HasPriority bit not null,
Type_Id bigint not null,

primary key (Id),
constraint FK_School_SchoolType foreign key (Type_Id) references SchoolType(Id)
);

Create table ContactPerson(
Id bigint identity(1,1) not null,
FullName nvarchar(255) not null,
PhoneNumber nvarchar(255),
Email nvarchar(255),
Appointment nvarchar(255),
School_Id bigint,

primary key (Id),
constraint FK_ContactPerson_School foreign key (School_Id) references School(Id)
);


Create table Country(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
primary key (Id)
);

Create table Region(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
Country_Id bigint not null,
primary key (Id),
constraint FK_Region_Country foreign key (Country_Id) references Country(Id)
);

Create table CityType(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
ShortName nvarchar(255) not null,
primary key (Id)
);

Create table City(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
CityType_Id bigint not null,
Region_Id bigint not null,
primary key (Id),
constraint FK_City_CityType foreign key (CityType_Id) references CityType(Id),
constraint FK_City_Region foreign key (Region_Id) references Region(Id)
);

Create table Street(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
City_Id bigint not null,
primary key (Id),
constraint FK_Street_City foreign key (City_Id) references City(Id)
);

Create table Address(
Id bigint identity(1,1) not null,
School_Id bigint,
House nvarchar(255) not null,
Street_Id bigint not null,
primary key (Id),
constraint FK_Address_School foreign key (School_Id) references School(Id),
constraint FK_Address_Street foreign key (Street_Id) references Street(Id)
);
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
Create table Event(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
Info nvarchar(255) not null,
Comment nvarchar(255),
Type int not null,
Year int not null,

primary key (Id)
);

Create table Subject(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
primary key (Id)
);

Create table Course(
Price money,
Duration int,
Subject_Id bigint not null,
Event_Id bigint not null,

constraint FK_Course_Subject foreign key (Subject_Id) references Subject(Id),
constraint FK_Course_Event foreign key (Event_Id) references Event(Id),
constraint AK_Course_EventId unique(Event_Id)   
);

Create table AcademicCompetition(
Subject_Id bigint not null,
Event_Id bigint not null,

constraint FK_AcademicCompetition_Subject foreign key (Subject_Id) references Subject(Id),
constraint FK_AcademicCompetition_Event foreign key (Event_Id) references Event(Id),
constraint AK_AcademicCompetition_EventId unique(Event_Id)   
);


Create table SchoolWork(
Program text,
Event_Id bigint not null,

constraint FK_SchoolWork_Event foreign key (Event_Id) references Event(Id),
constraint AK_SchoolWork_EventId unique(Event_Id)   
);

Create table EventExecution(
Id bigint identity(1,1) not null,
Address_Id bigint not null,
Event_Id bigint,

primary key (Id),
constraint FK_EventExecution_Address foreign key (Address_Id) references Address(Id),
constraint FK_EventExecution_Event foreign key (Event_Id) references Event(Id)
);

Create table EventDate(
Id bigint identity(1,1) not null,
Date date not null,
StartTime time,
EndTime time,
EventExecution_Id bigint,

primary key (Id),
constraint FK_EventDate_EventExecution foreign key (EventExecution_Id) references EventExecution(Id)
);

Create table Purchase(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
Price money not null,
Description text,
Event_Id bigint,

primary key (Id),
constraint FK_Purchase_Event foreign key (Event_Id) references Event(Id)
);

Create table VolunteerInfo(
Volunteer_Id bigint not null,
Event_Id bigint not null,

constraint FK_VolunteerInfo_Volunteer foreign key (Volunteer_Id) references Volunteer(Id),
constraint FK_VolunteerInfo_Event foreign key (Event_Id) references Event(Id)
);

Create table DepartmentInfo(
Department_Id bigint not null,
Event_Id bigint not null,

constraint FK_DepartmentInfo_Department foreign key (Department_Id) references Department(Id),
constraint FK_DepartmentInfo_Event foreign key (Event_Id) references Event(Id)
);

Create table Lecturer(
Employee_Id bigint not null,
Event_Id bigint not null,

constraint FK_Lecturer_Employee foreign key (Employee_Id) references Employee(Id),
constraint FK_Lecturer_Event foreign key (Event_Id) references Event(Id)
);

Create table Organizer(
Employee_Id bigint not null,
Event_Id bigint not null,

constraint FK_Organizer_Employee foreign key (Employee_Id) references Employee(Id),
constraint FK_Organizer_Event foreign key (Event_Id) references Event(Id)
);

Create table ResultType(
Id bigint identity(1,1) not null,
Name nvarchar(255) not null,
primary key (Id)
);

Create table Result(
Id bigint identity(1,1) not null,
NumberOfPoints int not null,
Type_Id bigint not null,
AcademicCompetition_Id bigint,
Pupil_Id bigint not null,

primary key (Id),
constraint FK_Result_ResultType foreign key (Type_Id) references ResultType(Id),
constraint FK_Result_AcademicCompetition foreign key (AcademicCompetition_Id) references AcademicCompetition(Event_Id),
constraint FK_Result_Pupil foreign key (Pupil_Id) references Pupil(Attendee_Id)
);

Create table AttendanceInfo(
Id bigint identity(1,1) not null,
Participated bit not null,
Event_Id bigint,
Attendee_Id bigint not null,

primary key (Id),
constraint FK_AttendanceInfo_Event foreign key (Event_Id) references Event(Id),
constraint FK_AttendanceInfo_Attendee foreign key (Attendee_Id) references Attendee(Id)
);


Create table Exam(
Id bigint identity(1,1) not null,
NumberOfPoints int not null,
Pupil_Id bigint,
Subject_Id bigint not null,
Year int not null,

primary key (Id),
constraint FK_Exam_Subject foreign key (Subject_Id) references Subject(Id),
constraint FK_Exam_Pupil foreign key (Pupil_Id) references Pupil(Attendee_Id)
);
