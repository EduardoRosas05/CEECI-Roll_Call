import Student from "../entities/student";
import StudentResult from "../entities/studentResult";

abstract class StudentDatasource {

    abstract getStudent():Promise<StudentResult>;

}
export default StudentDatasource;