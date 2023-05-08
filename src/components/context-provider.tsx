import { useReducer, createContext } from "react"

export type Action = 
| { type: "toggle", payload: boolean } 
| { type: "", payload: boolean };

export let initState: object = {
    isAspect: false,
    isSkills: false,
    isStunts: false,
    isStress: false,
    isNotes: false,
    Aspect: {},
    Skills: {},
    Stunts: {},
    Stress: {},
    Notes: {}
}

export const Context = createContext<[Object, React.Dispatch<Action>]>([initState, () => initState]);

const ContextProvider: React.FC<any> = (children: any) => {
    const reducer = (state: Object, action: Action) => {
        switch (action.type) {
            case "toggle":
                return {...state, payload: !action.payload}
            default:
                return {...state};
        }
    }

    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;