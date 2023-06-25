"use client";
import { useReducer, createContext } from "react"
import { AspectTypes } from "./aspects";
import { SkillTypes } from "./skills";
import { StuntTypes } from "./stunts";
import { StressTypes } from "./stress";
import { NoteTypes } from "./notes";

interface Props {
    children: JSX.Element
}

interface InitStateTypes {
    "options": {
        "isAspects": boolean,
        "isSkills": boolean,
        "isStunts": boolean,
        "isStress": boolean,
        "isNotes": boolean
    }
    "aspects": AspectTypes[],
    "skills": SkillTypes[],
    "stunts": StuntTypes[],
    "stress": StressTypes[],
    "notes": NoteTypes[],
}

export type Action = 
    | { type: "TOGGLE", key: string, value: boolean }
    | { type: "TOGGLE BOX", key: string, value: object[], propertyKey: string, propertyIndex: number, propertyValue: boolean }
    | { type: "TOGGLE NESTED BOX", key: string, value: object[], propertyKey: string, propertyIndex: number, propertyValue: boolean[], nestedPropertyIndex: number }
    | { type: "ADD BOX", key: string, value: AspectTypes[] | StressTypes[], propertyKey: string, propertyIndex: number, propertyValue: boolean[] }
    | { type: "HANDLE INPUT", key: string, value: object[], propertyKey: string, propertyIndex: number, event: string | number }
    | { type: "ADD OBJECT", key: string, value: object[], addedValue: string | object }
    | { type: "DELETE OBJECT", key: string, value: object[], propertyKey: object }
    | { type: "CHANGE INDEX", key: string, value: object[], indexA: number, indexB: number }

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
                    [action.key]: action.value.map((key, keyIndex) => {
                        return keyIndex === action.propertyIndex ? {
                            ...key,
                            [action.propertyKey]: !action.propertyValue
                        } : {...key}
                    })
                }
            case "TOGGLE NESTED BOX":
                return {
                    ...state,
                    [action.key]: action.value.map((key, keyIndex) => {
                        return keyIndex === action.propertyIndex ? {
                            ...key,
                            [action.propertyKey]: action.propertyValue.map((nestedKey, nestedKeyIndex) => {
                                return nestedKeyIndex === action.nestedPropertyIndex ? {
                                    nestedKey: !nestedKey
                                } : nestedKey
                            })
                        } : {...key}
                    })
                }
            case "ADD BOX":
                return {
                    ...state,
                    [action.key]: action.value.map((key, keyIndex) => {
                        return keyIndex === action.propertyIndex ? {
                            ...key,
                            [action.propertyKey]: [...action.propertyValue, false]
                        } : {...key}
                    })
                }
            case "HANDLE INPUT":
                return {
                    ...state,
                    [action.key]: action.value.map((key, keyIndex) => {
                        return keyIndex === action.propertyIndex ? {
                            ...key, 
                            [action.propertyKey]: action.event 
                        } : {...key}
                    })
                }
            case "ADD OBJECT":
                return {
                    ...state,
                    [action.key]: [...action.value, action.addedValue]
                }
            case "DELETE OBJECT":
                return {
                    ...state,
                    [action.key]: action.value.filter(keyCopy => keyCopy != action.propertyKey)
                }
            case "CHANGE INDEX":
                return {
                    ...state,
                    [action.key] : (() => {
                        let temp = action.value[action.indexB];
                        action.value[action.indexB] = action.value[action.indexA];
                        action.value[action.indexA] = temp;

                        return [...action.value];
                    }) //action.value.splice(action.indexB, 0, action.indexA)
                }
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