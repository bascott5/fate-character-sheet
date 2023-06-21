"use client";
import { useReducer, createContext } from "react"

interface Props {
    children: JSX.Element
}

export interface InitStateTypes {
    "options": {
        "isAspects": boolean,
        "isSkills": boolean,
        "isStunts": boolean,
        "isStress": boolean,
        "isNotes": boolean
    }
    "aspects": Array<Object>,
    "skills": Array<Object>,
    "stunts": Array<Object>,
    "stress": Array<Object>,
    "notes": Array<Object>,
}

export type Action = 
    | { type: "TOGGLE", key: string, value: boolean }
    | { type: "TOGGLE BOX", key: string, value: object[], propertyIndex: number, keyProperty: string, valueProperty: boolean }
    | { type: "HANDLE INPUT", key: string, value: object[], keyProperty: string, propertyIndex: number, event: HTMLInputElement }
    | { type: "ADD OBJECT", key: string, value: object[], addedValue: string | number }
    | { type: "DELETE OBJECT", key: string, value: object[], propertyIndex: number }
    | { type: "Save", payload: object } 
    | { type: "Load", payload: object }

export let initState: InitStateTypes = {
    options: {
        isAspects: false,
        isSkills: false,
        isStunts: false,
        isStress: false,
        isNotes: false
    },
    aspects: [],
    skills: [],
    stunts: [],
    stress: [],
    notes: []
}

export const Context = createContext<[InitStateTypes, React.Dispatch<Action>]>([initState, () => initState]);

const ContextProvider: React.FC<Props> = ({ children }: Props) => {
    const reducer = (state: InitStateTypes, action: Action) => {
        switch (action.type) {
            case "TOGGLE":
                return {
                    ...state,
                    options: {
                        ...state.options,
                        [action.key]: !action.value
                    }
                }
            case "TOGGLE BOX":
                return {
                    ...state,
                    [action.key]: action.value.map((key: any, keyIndex: number) => {
                        if (keyIndex === action.propertyIndex) {
                            return {
                                ...key,
                                [action.keyProperty]: !action.keyProperty
                            }
                            /*return {...key, [action.keyProperty]: action.keyProperty.map((key, keyIndex) => {
                                if (keyIndex === action.propertyIndex2) {
                                    return {...key, [action.box]: !action.box}
                                }
                            })}*/
                        }
                    })
                }
            case "HANDLE INPUT":
                return {
                    ...state,
                    [action.key]: action.value.map((key: any, keyIndex: number) => {
                        if (keyIndex === action.propertyIndex) {
                            return {
                                ...key, 
                                [action.keyProperty]: action.event 
                            }
                        }
                    })
                }
            case "ADD OBJECT":
                //Object.entries(state).map(([key, value]) => {
                    //if (key === action.name) {
                        return {
                            ...state,
                            [action.key]: [...action.value, action.addedValue]
                        }
                    //}
                //});
            case "DELETE OBJECT":
                return {
                    ...state,
                    [action.key]: action.value.map((key: object[], keyIndex: number) => {
                        if (keyIndex === action.propertyIndex) {
                            return [...key, key.filter((keyCopy: object) => keyCopy != key)];
                        }
                    })
                }
            case "Save":
                Object.entries(state).map((key, value) => {
                    return {...state, payload: action.payload}
                })
            case "Load":
                return {...state};
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