import Student from "../entities/student";
import StudentResult from "../entities/studentResult";
import RollList from "../entities/rollList";
import RollListResult from "../entities/rollListResult";
import AddRollListResult from "../entities/AddRollListResult";

abstract class StudentDatasource {

    abstract getStudent():Promise<StudentResult>;
    abstract getRollList():Promise<RollListResult>;
    abstract addRollList(rollList:RollList): Promise<AddRollListResult>

}
export default StudentDatasource;