import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import RollList from "../../domain/entities/rollList";
import StudentRepositoryImp from "../../infraestructure/repositories/studentRepositoryImp";
import StudentDatasourceImp from "../../infraestructure/datasources/studentDatasourceImp";  

//definir la estructura de mi context
interface ContextDefinition {
    //definicion del estado
    loading : boolean,
    saved : boolean,
    success : boolean,
    message? : string,
    rollList : RollList,
    errors : any,

    //acciones que tendra mi context
    setRollListProp:(property: string, value:any) => void,
    saveRollList:() => void,
}   

//crear el objecto context de react 
const AddRollListContext = createContext({} as ContextDefinition)

interface AddRollListState {
    //definicion del estado
    loading: boolean,
    saved: boolean,
    success: boolean,
    message?: string,
    rollList: RollList,
    errors: any, 
}

type AddRollListActionType =
    | { type : "Set Loading"; payload: boolean}
    | { type : "Set Saved"; payload: boolean}
    | { type : "Set Success"; payload: {
        success: boolean,
        rollList? : RollList,
    }}
    | { type : "Set RollList"; payload: RollList}
    | { type : "Set Message"; payload: string | null}
    | { type : "Set Errors"; payload: {
        massage: string,
        errors: any
    }
};

//inicializar el estado
const initialState: AddRollListState = {
    loading: false,
    saved: false,
    success: false,
    message: undefined,
    rollList: new RollList(
        false,
        0,
        '',
        ''
    ),
    errors: {},
};

function AddRollListReducer(
    state: AddRollListState,
    action: AddRollListActionType
){
    switch(action.type){
        //manipular el estado con base a las acciones
        case "Set Loading" :
            return {...state, 
                loading: action.payload,
            };
        case "Set Saved" :
            return {...state, 
                saved: action.payload,
            };
        case "Set RollList" :
            return {...state,
                rollList: action.payload,
            };
        case "Set Errors" :
            return {...state,
                errors: action.payload.errors || {},
                message: action.payload.massage,
                saved: false,
            }
        default :
            return state;
    }
};

type Props = {
    children?: ReactNode;
};

const AddRollListProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(AddRollListReducer, initialState);

    function setRollListProp(property: string, value:any){

        dispatch({
            type: "Set Errors",
            payload: {
                massage: '',
                errors: {},
            },
        });

        dispatch({
            type: "Set RollList",
            payload: {
                ...state.rollList,
                [property]:value,
            }
        });
    }

    async function saveRollList(){
        const rollListRepository = new StudentRepositoryImp(
            new StudentDatasourceImp
        )
        //enviar los datos al backend
        dispatch({
            type: "Set Saved",
            payload: true,
        });

        const result = await rollListRepository.addRollList(state.rollList);
        if(result.rollList){
            dispatch({
                type: "Set Success",
                payload: {
                    success: true
                }
            })
        } else {
            //manejar el caso si result.rollList no es un array
            dispatch({
                type: "Set Errors",
                payload: {
                    massage: result.message,
                    errors: result.errors || {},
                },
            });
        }
    }

    return(
        <AddRollListContext.Provider value={{
            ...state,

            //funciones
            setRollListProp,
            saveRollList,
        }}
        >
            {children}
        </AddRollListContext.Provider>
    );
}

function useAddRollListState (){
    const context = useContext(AddRollListContext);
        if(context === undefined){
            throw new Error("useAddRollList debe ser usado" + "con un useAddRollListState");
        }
        return context;
}

export {AddRollListProvider, useAddRollListState}

