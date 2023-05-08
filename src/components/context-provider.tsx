import { useReducer, createContext } from "react"

interface Props {
    children: JSX.Element[]
}

export type Action = 
| { type: "toggle", payload: any } 
| { type: "", payload: any };

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

const ContextProvider: React.FC<Props> = ({ children }: Props) => {
    const reducer = (state: Object, action: Action) => {
        switch (action.type) {
            case "toggle":
                console.log(state);
                return {...state, payload: !action.payload}
            default:
                return {...state};
        }
    }

    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <Context.Provider value={[state, dispatch]}>
            { children }
        </Context.Provider>
    );
}

export default ContextProvider;