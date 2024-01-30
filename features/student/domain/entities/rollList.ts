    class RollList {

        id? : number;
        attendance : boolean;
        studentId : number;
        date: string;
        fullName?: string;
        courseFull? : string;

        constructor (
            attendace : boolean,
            studentId : number,
            date: string,
            courseFull?: string,
            fullName?: string,
            id? : number,
        ){
            this.id = id;
            this.attendance = attendace;
            this.studentId = studentId;
            this.date = date;
            this.fullName = fullName;
            this.courseFull = courseFull;
        }
    }

    export default RollList;