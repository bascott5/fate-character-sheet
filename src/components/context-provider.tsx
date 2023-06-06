"use client";
import { useReducer, createContext } from "react"

interface Props {
    children: JSX.Element
}

export type Action = 
| { type: "Save", payload: object } 
| { type: "Load", payload: object }

export let initState: Object = {
    isAspects: false,
    isSkills: false,
    isStunts: false,
    isStress: false,
    isNotes: false,
    aspect: {},
    skills: {},
    stunts: {},
    stress: {},
    notes: {}
}

export const Context = createContext<[Object, React.Dispatch<Action>]>([initState, () => initState]);

const ContextProvider: React.FC<Props> = ({ children }: Props) => {
    const reducer = (state: Object, action: Action) => {
        switch (action.type) {
            case "Save":
                console.log(state);
                Object.entries(state).map((key, value) => {
                    return {...state, payload: action.payload}
                })
            case "Load":
                return {...state}
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