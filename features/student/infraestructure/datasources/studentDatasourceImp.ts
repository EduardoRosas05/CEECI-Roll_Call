import Student from "../../domain/entities/student";
import StudentResult from "../../domain/entities/studentResult";
import StudentDatasource from "../../domain/datasources/studentDatasource";
import BackendConfig from "../../../../config/backend/config";
import RollList from "../../domain/entities/rollList";
import RollListResult from "../../domain/entities/rollListResult";
import AddRollListResult from "../../domain/entities/AddRollListResult";

class StudentDatasourceImp extends StudentDatasource {

    async getStudent(): Promise<StudentResult> {
        try {
            const response = await fetch (`${BackendConfig.url}/api/rollsListUser`);
            const jsonResponse = await response.json();

            console.log(jsonResponse);

            if(!jsonResponse){
                return new StudentResult([]);
            }

            const students = jsonResponse.map((item:any) => {
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

    async getRollList(): Promise<RollListResult> {
        try {
            const response = await fetch (`${BackendConfig.url}/api/rollsList`);
            const jsonResponse = await response.json();

            console.log(jsonResponse);

            if (!jsonResponse) {
                return new RollListResult([]);
            }

            const rollLists = jsonResponse.map((item:any) => {
                const rollList = new RollList (
                    item.attendance,
                    item.studentId,
                    item.fullName,
                    item.date,
                    item.id,
                );
                return rollList;
            });
            return new RollListResult(rollLists)
        } catch (error) {
            console.error('error de fetch en rollList', error);
            return new RollListResult([]);
        }
    }

    async addRollList(rollList : RollList): Promise<AddRollListResult> {
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
                const result = new AddRollListResult(response.message, response.rollList || null)
                result.errors = response.errors || null;
                result.error = response.error || false;
                return result;
            });
    }
}
export default StudentDatasourceImp;