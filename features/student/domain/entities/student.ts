class Student {

 id? : number;   
 attendance: boolean;
 date: string;
 fullName: string;

 constructor (
    attendance:boolean,
    fullName:string,
    date: string, // Asumiremos que obtienemos la fecha como una cadena
    id?:number,
 ){
    this.id = id;
    this.attendance = attendance;
    this.date = date;
    this.fullName = fullName;
 }
}
export default Student;