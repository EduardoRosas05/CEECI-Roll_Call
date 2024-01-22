import Student from "../../domain/entities/student";
import StudentResult from "../../domain/entities/studentResult";
import StudentDatasource from "../../domain/datasources/studentDatasource";
import StudentRepository from "../../domain/repository/studentRepositoy";

class StudentRepositoryImp extends StudentRepository{

    datasource: StudentDatasource;

    constructor (datasource: StudentDatasource){
        super();
        this.datasource = datasource;
    }

    getStudent(): Promise<StudentResult>{
        return this.datasource.getStudent();
    }

}
export default StudentRepositoryImp;