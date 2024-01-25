import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import StudentRepositoryImp from "../../infraestructure/repositories/studentRepositoryImp";
import StudentDatasourceImp from "../../infraestructure/datasources/studentDatasourceImp";
import RollList from "../../domain/entities/rollList";
import RollListResult from "../../domain/entities/rollListResult";

//estructura del context
interface ContextDefinition {
    loading: boolean,
    rolllist: RollList[],

    getRollList:()=>void,
}

const rollListContext = createContext({} as ContextDefinition);

interface RollListState {
    loading: boolean,
    rolllist: RollList[],
}

//definir los tipos de acciones que podra ejecutar el context
type RollListActionType =
    |   {type: 'Set Loading', payload: boolean}
    |   {type: 'Set Data', payload: RollListResult
}

//iniciar el state
const InitialState : RollListState = {
    loading: false,
    rolllist: [],

}

function rollListReducer (
    state: RollListState,
    action: RollListActionType){
        switch(action.type){
            case 'Set Loading':
                return {
                    ...state,
                    loading: action.payload
                };
            case 'Set Data':
                return {
                    ...state,
                    rolllist: action.payload.rollList
                };
            default:
                return state;
    }
}
type Props = { children?: ReactNode }

const RollListProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(rollListReducer, InitialState);

    const getRollList = async () => {
        const repository = new StudentRepositoryImp(
            new StudentDatasourceImp()
        );
        //cambiar el estado de laoding
        dispatch({
            type: 'Set Loading',
            payload: true,
        });
        const apiResult = await repository.getRollList();
        
        dispatch({
            type: 'Set Data',
            payload: apiResult,
        });
    };

    return(
        <rollListContext.Provider value={{
            ...state,
            getRollList,
        }}>
        {children}
        </rollListContext.Provider>
    )

};

    function useRollListState(){
        const context = useContext(rollListContext);
        if (context == undefined){
            throw new Error ("useStudentState debe ser usado por" + "con un StudentProvider");
        }
        return context;
    }

export {RollListProvider, useRollListState}