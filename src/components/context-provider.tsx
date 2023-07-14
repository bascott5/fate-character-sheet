"use client";
import { useReducer, createContext } from "react"
import { AspectTypes } from "./aspects";
import { SkillTypes } from "./skills";
import { StuntTypes } from "./stunts";
import { StressTypes } from "./stress";
import { NoteTypes } from "./notes";
import { IdentityTypes } from "./identity"

interface Props {
    children: JSX.Element[]
}

interface InitStateTypes {
    "options": {
        "isAspects": boolean,
        "isSkills": boolean,
        "isStunts": boolean,
        "isStress": boolean,
        "isNotes": boolean
    }
    "identity": IdentityTypes,
    "aspects": AspectTypes[],
    "skills": SkillTypes[],
    "stunts": StuntTypes[],
    "stress": StressTypes[],
    "notes": NoteTypes[],
}

export type ObjectTypes = AspectTypes | SkillTypes | StuntTypes | StressTypes | NoteTypes

export type Action = 
    | { type: "TOGGLE", key: string, value: boolean }
    | { type: "TOGGLE BOX", key: string, value: object[], propertyKey: string, propertyIndex: number, propertyValue: boolean }
    | { type: "TOGGLE NESTED BOX", key: string, value: object[], propertyKey: string, propertyIndex: number, propertyValue: boolean[], nestedPropertyIndex: number }
    | { type: "TOGGLE STRESS", key: string, value: object[], propertyKey: string, propertyIndex: number, propertyValue: object[], nestedPropertyIndex: number, nestedPropertyKey: string, nestedPropertyValue: boolean }
    | { type: "ADD BOX", key: string, value: AspectTypes[] | StressTypes[], propertyKey: string, propertyIndex: number, propertyValue: boolean[] | object[] }
    | { type: "DELETE BOX", key: string, value: AspectTypes[] | StressTypes[], propertyKey: string, propertyIndex: number, propertyValue: boolean[] | object[] }
    | { type: "HANDLE INPUT IDENTITY", key: string, event: string | number}
    | { type: "HANDLE INPUT", key: string, value: object[], propertyKey: string, propertyIndex: number, event: string | number }
    | { type: "HANDLE NESTED INPUT", key: string, value: object[], propertyKey: string, propertyIndex: number, propertyValue: object[], nestedPropertyKey: string, nestedPropertyIndex: number, event: string | number }
    | { type: "ADD OBJECT", key: string, value: object[], addedValue: string | object }
    | { type: "DELETE OBJECT", key: string, value: object[], propertyKey: object }
    | { type: "CHANGE INDEX", key: string, value: ObjectTypes[], propertyIndex: number, indexB: number }
    | { type: "CHANGE HEIGHT", key: string, value: object[], boxHeight: number | undefined, propertyIndex: number }
    | { type: "LOAD JSON", name: string }

export let initState: InitStateTypes = {
    options: {
        isAspects: false,
        isSkills: false,
        isStunts: false,
        isStress: false,
        isNotes: false
    },
    identity: {
        name: "",
        pronouns: "",
        fatePoints: 3,
        refresh: 3
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
                                return nestedKeyIndex === action.nestedPropertyIndex ? !nestedKey : nestedKey
                            })
                        } : {...key}
                    })
                }
            case "TOGGLE STRESS":
                return {
                    ...state,
                    [action.key]: action.value.map((key, keyIndex) => {
                        return keyIndex === action.propertyIndex ? {
                            ...key,
                            [action.propertyKey]: action.propertyValue.map((nestedKey, nestedKeyIndex) => {
                                return nestedKeyIndex === action.nestedPropertyIndex ? {
                                    ...nestedKey,
                                    [action.nestedPropertyKey]: !action.nestedPropertyValue
                                } : {...nestedKey}
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
                            [action.propertyKey]: action.propertyValue
                        } : {...key}
                    })
                }
            case "DELETE BOX":
                return {
                    ...state,
                    [action.key]: action.value.map((key, keyIndex) => {
                        return keyIndex === action.propertyIndex ? {
                            ...key,
                            [action.propertyKey]: action.propertyValue.splice(action.propertyValue.length - 1, 1)
                        } : {...key}
                    })
                }
            case "HANDLE INPUT IDENTITY":
                return {
                    ...state,
                    identity: {
                        ...state.identity,
                        [action.key]: action.event 
                    }
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
            case "HANDLE NESTED INPUT":
                return {
                    ...state,
                    [action.key]: action.value.map((key, keyIndex) => {
                        return keyIndex === action.propertyIndex ? {
                            ...key, 
                            [action.propertyKey]: action.propertyValue.map((nestedKey, nestedKeyIndex) => {
                                return nestedKeyIndex === action.nestedPropertyIndex ? {
                                    ...nestedKey,
                                    [action.nestedPropertyKey]: action.event
                                } : {...nestedKey}
                            })
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
                    [action.key]: action.value.map((key, keyIndex) => {
                        return keyIndex === action.propertyIndex ? {
                            key: action.value.splice(keyIndex, 1, action.value[keyIndex + 1])//[0]
                        } : {...key}
                    })
                    
                    /*action.value.map((key, keyIndex) => {
                        return keyIndex === action.propertyIndex ? {
                            key: action.value.splice(keyIndex, 1, action.value[keyIndex + 1])//[0]
                        } : {...key}*/
                            /*(() => {
                                let value = [...action.value]

                        let temp = value[action.indexB];
                        value[action.indexB] = value[action.indexA];
                        value[action.indexA] = temp;

                        return { value }
                        })
                    })*/
                }
            case "CHANGE HEIGHT":
                return {
                    ...state,
                    [action.key]: action.value.map((key, keyIndex) => {
                        return keyIndex === action.propertyIndex ? {
                            ...key,
                            ["height"]: action.boxHeight
                        } : {...key}
                    })
                }
            case "LOAD JSON":
                return JSON.parse(localStorage.getItem(action.name))
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