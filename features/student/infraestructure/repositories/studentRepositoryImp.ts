import Student from "../../domain/entities/student";
import StudentResult from "../../domain/entities/studentResult";
import StudentDatasource from "../../domain/datasources/studentDatasource";
import StudentRepository from "../../domain/repository/studentRepositoy";
import RollList from "../../domain/entities/rollList";
import RollListResult from "../../domain/entities/rollListResult";
import AddRollListResult from "../../domain/entities/AddRollListResult";

class StudentRepositoryImp extends StudentRepository{
    

    datasource: StudentDatasource;

    constructor (datasource: StudentDatasource){
        super();
        this.datasource = datasource;
    }

    getStudent(): Promise<StudentResult>{
        return this.datasource.getStudent();
    }

    getRollList(): Promise<RollListResult> {
        return this,this.datasource.getRollList();
    }

    addRollList(rollList: RollList): Promise<AddRollListResult> {
        return this.datasource.addRollList(rollList);
    }

    

}
export default StudentRepositoryImp;