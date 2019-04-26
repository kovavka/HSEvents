﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Domain;
using Domain.Events;
using Helpers;
using NHibernate;

namespace Tests.CreateAttendees
{
    public class AttendeesCreator
    {
        public void Run(ISession session)
        {

            CreateSchools(session);
            CreateSubjects(session);
            CreatePrograms(session);
            CreatePupils(session);
            CreateCourses(session);

            var pupils = session.Query<Pupil>();
            var courses = session.Query<Course>();

            var random = new Random();

            foreach (var course in courses)
            {
                var count = random.Next(50, 100);
                var ids = pupils.Select(x => x.Id).ToList();

                for (int i = 0; i < count; i++)
                {
                    var index = random.Next(ids.Count);
                    var id = ids[index];
                    if (course.AttendanceInfo==null)
                        course.AttendanceInfo=new List<AttendanceInfo>();

                    var pupil = pupils.First(x => x.Id == id);
                    ids.Remove(id);

                    var info = new AttendanceInfo
                    {
                        Attendee = pupil,
                        Participated = true
                    };

                    course.AttendanceInfo.Add(info);
                }

                using (var tx = session.BeginTransaction())
                {
                    session.Update(course);
                    tx.Commit();
                }
            }


        }

        public void CreatePupils(ISession session)
        {
            var fileName = "CreateAttendees\\Names.txt";
            var lines = File.ReadAllLines(fileName);

            var schools = session.Query<School>().ToList();
            var schoolsCount = schools.Count;

            var subjects = session.Query<Subject>().ToList();
            var subjectsCount = subjects.Count;

            var programs = session.Query<AcademicProgram>().ToList();
            var programsCount = programs.Count;

            var random = new Random();

            foreach (var line in lines)
            {
                var interestingPrograms = GeneratePrograms(random, programs, programsCount);
                var entered = interestingPrograms.Count > 0 && random.Next(100) > 60;
                var enterProgram = entered ? interestingPrograms[0] : null;

                var pupil = new Pupil()
                {
                    ContactInfo = new ContactInfo()
                    {
                        FullName = line,
                        PhoneNumber = "89" + GetSomeNumbers(random, 9),
                        Email = "u" + GetSomeNumbers(random, random.Next(1, 6)) + "@gmail.com"
                    },
                    School = schools[random.Next(schoolsCount)],
                    YearOfGraduation = random.Next(2016, 2019),
                    Exams = GenerateExams(random, subjects, subjectsCount).ToSet(),
                    InterestingPrograms = interestingPrograms,
                    RegistrationPrograms = interestingPrograms,
                    EnterProgram = enterProgram
                };

                using (var tx = session.BeginTransaction())
                {
                    session.Save(pupil);
                    tx.Commit();
                }
            }
        }

        public List<Exam> GenerateExams(Random random, List<Subject> subjects, int subjectsCount)
        {
            var count = random.Next(subjectsCount);
            var exams = new List<Exam>();

            for (int i = 0; i < count; i++)
            {
                var possible = subjects.Where(x => !exams.Select(y => y.Id).Contains(x.Id)).ToList();
                var points = random.Next(101);
                var exam = new Exam()
                {
                    Subject = possible[random.Next(possible.Count)],
                    NumberOfPoints = points,
                    Year = random.Next(2017, 2020)

                };
                exams.Add(exam);
            }

            return exams;
        }
        public List<AcademicProgram> GeneratePrograms(Random random, List<AcademicProgram> programs, int programsCount)
        {
            if (random.Next(100)>60)
                return new List<AcademicProgram>();

            var count = random.Next(programsCount);
            var ids = new List<long>();

            for (int i = 0; i < count; i++)
            {
                var possible = programs.Where(x => !ids.Contains(x.Id)).ToList();
                ids.Add(possible[random.Next(possible.Count)].Id);
            }

            return programs.Where(x => ids.Contains(x.Id)).ToList();
        }

        public string GetSomeNumbers(Random random, int count)
        {
            var s = "";
            for (int i = 0; i < count; i++)
            {
                s += random.Next(10).ToString();
            }

            return s;
        }
        
        public void CreateCourses(ISession session)
        {
            var subjects = session.Query<Subject>().ToList();
            var courses = session.Query<Course>().ToList();

            foreach (var subject in subjects)
            {
                var forSubject = courses.Where(x => x.Subject.Id == subject.Id).ToList();

                for (int i = 2017; i < 2020; i++)
                {
                    var course = forSubject.FirstOrDefault(x => x.ExamYear == i);
                    if (course == null)
                    {
                        course = new Course()
                        {
                            ExamYear = i,
                            Info = "Course",
                            Name = $"Course {subject.Name} {i}",
                            Subject = subject
                        };
                        session.Save(course);
                    }
                }
            }
        }
        public void CreateSubjects(ISession session)
        {
            var fileName = "CreateAttendees\\Subjects.txt";
            var lines = File.ReadAllLines(fileName);

            foreach (var line in lines)
            {
                var subject = session.Query<Subject>().FirstOrDefault(x => x.Name == line);
                if (subject == null)
                {
                    subject = new Subject() {Name = line };
                    session.Save(subject);
                }
            }
        }
        public void CreatePrograms(ISession session)
        {
            var fileName = "CreateAttendees\\Programs.txt";
            var lines = File.ReadAllLines(fileName);

            foreach (var line in lines)
            {
                var academicProgram = session.Query<AcademicProgram>().FirstOrDefault(x => x.Name == line);
                if (academicProgram == null)
                {
                    academicProgram = new AcademicProgram() {Name = line };
                    session.Save(academicProgram);
                }
            }
        }

        public void CreateSchools(ISession session)
        {
            var fileName = "CreateAttendees\\Schools.txt";
            var lines = File.ReadAllLines(fileName);


            foreach (var line in lines)
            {
                var items = line.Split(';').Select(x => x.Trim()).ToList();
                var name = items[0];
                var type = items[1];
                var number = int.Parse(items[2]);
                var countryName = items[3];
                var regionName = items[4];
                var cityTypeName = items[5];
                var cityName = items[6];
                var streetName = items[7];
                var house = items[8];

                var country = session.Query<Country>().FirstOrDefault(x => x.Name == countryName);
                if (country == null)
                {
                    country = new Country() { Name = countryName};
                    session.Save(country);
                }

                var cityType = session.Query<CityType>().FirstOrDefault(x => x.Name == cityTypeName);
                if (cityType == null)
                {
                    cityType = new CityType()
                    {
                        Name = cityTypeName,
                        ShortName = cityTypeName
                    };
                    session.Save(cityType);
                }

                var schoolType = session.Query<SchoolType>().FirstOrDefault(x => x.Name == type);
                if (schoolType == null)
                {
                    schoolType = new SchoolType() { Name = type };
                    session.Save(schoolType);
                }

                var region = session.Query<Region>().FirstOrDefault(x => x.Name == regionName && x.Country.Id == country.Id);
                if (region == null)
                {
                    region = new Region()
                    {
                        Name = countryName,
                        Country = country
                    };
                    session.Save(region);
                }
                
                var city = session.Query<City>().FirstOrDefault(x => x.Name == cityName && x.Region.Id == region.Id && x.CityType.Id == cityType.Id);
                if (city == null)
                {
                    city = new City()
                    {
                        Name = cityName,
                        CityType = cityType,
                        Region = region
                    };
                    session.Save(city);
                }
                
                var street = session.Query<Street>().FirstOrDefault(x => x.Name == streetName && x.City.Id == city.Id);
                if (street == null)
                {
                    street = new Street()
                    {
                        Name = streetName,
                        City = city
                    };
                    session.Save(street);
                }
                
                var address = session.Query<Address>().FirstOrDefault(x => x.House == house && x.Street.Id == street.Id);
                if (address == null)
                {
                    address = new Address()
                    {
                        House = house,
                        Street = street
                    };
                    session.Save(address);
                }


                var school = new School()
                {
                    Addresses = new List<Address>() {address},
                    BelongToUniversityDistrict = false,
                    HasPriority = false,
                    Name = name,
                    Number = number,
                    Type = schoolType
                };

                session.Save(school);
            }
        }
    }
}
