import Student from "../entities/student";
import StudentResult from "../entities/studentResult";
import RollList from "../entities/rollList";
import RollListResult from "../entities/rollListResult";

abstract class StudentRepository {

    abstract getStudent():Promise<StudentResult>
    abstract addRollList(rollList:RollList):Promise<RollListResult>

}
export default StudentRepository;