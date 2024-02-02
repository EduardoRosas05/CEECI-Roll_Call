class Student {

 id?: number;   
 course: string;
 fullName: string;

 constructor (
   
   course:string,
    fullName:string,
    id?:number,
 ){
    this.id = id || 0;
    this.course = course;
    this.fullName = fullName;
 }
}
export default Student;