import Student from "../../domain/entities/student";
import StudentResult from "../../domain/entities/studentResult";
import StudentDatasource from "../../domain/datasources/studentDatasource";
import BackendConfig from "../../../../config/backend/config";

class StudentDatasourceImp extends StudentDatasource {

    async getStudent(): Promise<StudentResult> {
        try {
            const response = await fetch (`${BackendConfig.url}/api/rollsList`);
            const jsonResponde = await response.json();

            console.log(jsonResponde);

            if(!jsonResponde){
                return new StudentResult([]);
            }

            const students = jsonResponde.map((item:any) => {
                const student = new Student (
                    item.attendance,
                    item.fullName,
                    item.date,
                    item.id,
                );
                return student;
            });
            return new StudentResult(students)

        } catch(error){
            console.error('error de fetch en student:', error);
            return new StudentResult([]);
        }
    }
}
export default StudentDatasourceImp;