class RollList {

    id? : number;
    attendance : boolean;
    studentId : number;
    fullName?: string;
    date : string;

    constructor (
        attendace : boolean,
        studentId : number,
        date: string,
        fullName?: string,
        id? : number,
    ){
        this.id = id;
        this.attendance = attendace;
        this.studentId = studentId;
        this.fullName = fullName;
        this.date = date;
    }
}

export default RollList;