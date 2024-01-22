import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Student from "../../domain/entities/student";
import StudentResult from "../../domain/entities/studentResult";
import StudentRepositoryImp from "../../infraestructure/repositories/studentRepositoryImp";
import StudentDatasourceImp from "../../infraestructure/datasources/studentDatasourceImp";

//estructura del context
interface ContextDefinition {
    loading: boolean,
    students: Student[],

    getStudent:()=>void,
}

const studentContext = createContext({} as ContextDefinition);

interface StudentState {
    loading: boolean,
    students: Student[],
}

//definir los tipos de acciones que podra ejecutar el context
type StudentActionType =
    |   {type: 'Set Loading', payload: boolean}
    |   {type: 'Set Data', payload: StudentResult
}

//iniciar el state
const InitialState : StudentState = {
    loading: false,
    students: [],

}

function studentReducer (
    state: StudentState,
    action: StudentActionType){
        switch(action.type){
            case 'Set Loading':
                return {
                    ...state,
                    loading: action.payload
                };
            case 'Set Data':
                return {
                    ...state,
                    students: action.payload.student
                };
            default:
                return state;
    }
}
type Props = { children?: ReactNode }

const StudentProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(studentReducer, InitialState);

    const getStudent = async () => {
        const repository = new StudentRepositoryImp(
            new StudentDatasourceImp()
        );
        //cambiar el estado de laoding
        dispatch({
            type: 'Set Loading',
            payload: true,
        });
        const apiResult = await repository.getStudent();
        
        dispatch({
            type: 'Set Data',
            payload: apiResult,
        });
    };

    return(
        <studentContext.Provider value={{
            ...state,
            getStudent,
        }}>
        {children}
        </studentContext.Provider>
    )

};

    function useStudentState(){
        const context = useContext(studentContext);
        if (context == undefined){
            throw new Error ("useStudentState debe ser usado por" + "con un StudentProvider");
        }
        return context;
    }

export {StudentProvider, useStudentState}