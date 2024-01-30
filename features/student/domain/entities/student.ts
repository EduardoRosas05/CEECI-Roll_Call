class Student {

 id?: number;   
 key: string;
 fullName: string;

 constructor (
   
    key:string,
    fullName:string,
    id?:number,
 ){
    this.id = id || 0;
    this.key = key;
    this.fullName = fullName;
 }
}
export default Student;