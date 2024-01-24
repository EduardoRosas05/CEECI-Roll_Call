import Student from "../../domain/entities/student";
import StudentResult from "../../domain/entities/studentResult";
import StudentDatasource from "../../domain/datasources/studentDatasource";
import BackendConfig from "../../../../config/backend/config";
import RollList from "../../domain/entities/rollList";
import RollListResult from "../../domain/entities/rollListResult";

class StudentDatasourceImp extends StudentDatasource {

    async getStudent(): Promise<StudentResult> {
        try {
            const response = await fetch (`${BackendConfig.url}/api/rollsListUser`);
            const jsonResponde = await response.json();

            console.log(jsonResponde);

            if(!jsonResponde){
                return new StudentResult([]);
            }

            const students = jsonResponde.map((item:any) => {
                const student = new Student (
                    item.key,
                    item.fullName,
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

    async addRollList(rollList : RollList): Promise<RollListResult> {
        return fetch(`${BackendConfig.url}/api/rollsList?id=${rollList.id}`,{
            method: !rollList.id? "POST" : "PUT",
            body: JSON.stringify(rollList),
            headers:{
                "Content-Type":"application/json",
            },
        })
        .then((response) => response.json())
            .then((response) => {
                console.log(response);
                const result = new RollListResult(response.message, response.rollList || null)
                result.errors = response.errors || null;
                result.error = response.error || false;
                return result;
            });
    }
}
export default StudentDatasourceImp;