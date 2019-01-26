
export class Department {
    id: number;
    name: string;
    color: string;
}

export class Volunteer {
    id: number;
    fullName: string;
    group: Group;
}

export class Group {
    id: number;
    name: string;
}

export class SubjectModel {
    id: number;
    name: string;
}

export class AcademicProgram {
    id: number;
    name: string;
}
