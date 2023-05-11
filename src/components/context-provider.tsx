import { useReducer, createContext } from "react"

interface Props {
    children: JSX.Element
}

export type Action = 
| { type: "Save", payload: any } 
| { type: "Load", payload: any };

export let initState: Object = {
    isAspects: false,
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

const ContextProvider: React.FC<Props> = ({ children }: Props) => {
    const reducer = (state: Object, action: Action) => {
        switch (action.type) {
            case "Save":
                return {...state}
            case "Load":
                return {...state}
            default:
                return {...state};
        }
    }

    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <div>
            <Context.Provider value={[state, dispatch]}>
                <button onClick={() => dispatch({ type: "Save", payload: 0})}>Save</button>
                <button onClick={() => dispatch({ type: "Load", payload: 0})}>Load</button>
                { children }
            </Context.Provider>
        </div>
    );
}

export default ContextProvider;