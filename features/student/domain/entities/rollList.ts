class RollList {

    id? : number;
    attendance : boolean;
    studentId : number;
    date : string;

    constructor (
        attendace : boolean,
        studentId : number,
        date: string,
        id? : number,
    ){
        this.id = id;
        this.attendance = attendace;
        this.studentId = studentId;
        this.date = date;
    }
}

export default RollList;