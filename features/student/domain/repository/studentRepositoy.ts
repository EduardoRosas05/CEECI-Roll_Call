import Student from "../entities/student";
import StudentResult from "../entities/studentResult";

abstract class StudentRepository {

    abstract getStudent():Promise<StudentResult>

}
export default StudentRepository;