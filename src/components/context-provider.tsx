"use client";
import { useReducer, createContext } from "react"
import { AspectTypes } from "./aspects";
import { SkillTypes } from "./skills";
import { StuntTypes } from "./stunts";
import { StressTypes } from "./stress";
import { NoteTypes } from "./notes";
import { IdentityTypes } from "./identity"
import { ConsequenceTypes } from "./consequences";
import { ConditionTypes } from "./conditions";
import { SituationTypes } from "./situation-aspects";
import { ThemeTypes } from "./option-container";

interface Props {
    children: JSX.Element[]
}

interface Dice {
    currentRoll: 0,
    modifier: 0
}

interface InitStateTypes {
    "options": {
        "isAspects": boolean,
        "isSkills": boolean,
        "isStunts": boolean,
        "isStress": boolean,
        "isConsequences": boolean,
        "isConditions": boolean,
        "isSituationAspects": boolean,
        "isNotes": boolean
    }
    "identity": IdentityTypes,
    "aspects": AspectTypes[],
    "skills": SkillTypes[],
    "stunts": StuntTypes[],
    "stress": StressTypes[],
    "consequences": ConsequenceTypes[],
    "conditions": ConditionTypes[],
    "situationAspects": SituationTypes[];
    "notes": NoteTypes[],
    "dice": Dice,
    "theme": ThemeTypes
}

export type ObjectTypes = AspectTypes | SkillTypes | StuntTypes | StressTypes | ConsequenceTypes | ConditionTypes | SituationTypes | NoteTypes

export type Action = 
    | { type: "TOGGLE", key: string, value: boolean }
    | { type: "TOGGLE BOX", key: string, value: object[], propertyKey: string, propertyIndex: number, propertyValue: boolean }
    | { type: "TOGGLE NESTED BOX", key: string, value: object[], propertyKey: string, propertyIndex: number, propertyValue: boolean[], nestedPropertyIndex: number }
    | { type: "TOGGLE STRESS", key: string, value: object[], propertyKey: string, propertyIndex: number, propertyValue: object[], nestedPropertyIndex: number, nestedPropertyKey: string, nestedPropertyValue: boolean }
    | { type: "ADD BOX", key: string, value: AspectTypes[] | StressTypes[] | SituationTypes[], propertyKey: string, propertyIndex: number, propertyValue: boolean[] | object[] }
    | { type: "DELETE BOX", key: string, value: AspectTypes[] | StressTypes[] | SituationTypes[], propertyKey: string, propertyIndex: number, propertyValue: boolean[] | object[] }
    | { type: "HANDLE INPUT IDENTITY", key: string, event: string | number}
    | { type: "HANDLE INPUT", key: string, value: object[], propertyKey: string, propertyIndex: number, event: string | number }
    | { type: "HANDLE NESTED INPUT", key: string, value: object[], propertyKey: string, propertyIndex: number, propertyValue: object[], nestedPropertyKey: string, nestedPropertyIndex: number, event: string | number }
    | { type: "ADD OBJECT", key: string, value: object[], addedValue: string | object }
    | { type: "DELETE OBJECT", key: string, value: object[], propertyKey: object }
    | { type: "CHANGE SKILL BONUS" }
    | { type: "CHANGE INDEX", key: string, value: ObjectTypes[], propertyIndex: number, indexB: number }
    /*| { type: "CHANGE HEIGHT", key: string, value: object[], propertyIndex: number, boxHeight: number | undefined }*/
    | { type: "SET CURRENT ROLL", payload: number | number[] }
    | { type: "SET THEME", payload: ThemeTypes }
    | { type: "LOAD JSON", name: string }

export let initState: InitStateTypes = {
    options: {
        isAspects: false,
        isSkills: false,
        isStunts: false,
        isStress: false,
        isConsequences: false,
        isConditions: false,
        isSituationAspects: false,
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
    consequences: [],
    conditions: [],
    situationAspects: [],
    notes: [],
    dice: { currentRoll: 0, modifier: 0 },
    theme: { theme: "Blue", color: "cornflowerblue" }
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
                if (action.indexB < 0 || action.indexB > action.value.length - 1) {
                    return {...state}
                } else {
                    let copy = [...action.value];

                    const temp = copy[action.propertyIndex];
                    copy[action.propertyIndex] = copy[action.indexB];
                    copy[action.indexB] = temp;

                    return {
                        ...state,
                        [action.key]: [...copy]
                    }
                }
            case "CHANGE SKILL BONUS":
                let stuntCopy = [...state.stunts];

                for (let i = 0; i < stuntCopy.length; i++) {
                    for (let j = 0; j < state.skills.length; j++) {
                        if (stuntCopy[i].skill == state.skills[j].text) {
                            stuntCopy[i].skillBonus = state.skills[j].modifier;
                        } else {
                            stuntCopy[i].skillBonus = 0;
                        }
                    }
                }

                /*stuntCopy.map((stunt, stuntIndex) => {
                    state.skills.map((skill, skillIndex) => {
                        if (skillIndex === stuntIndex && stunt != undefined) {
                            stunt.skillBonus = skill.modifier;
                        } else {
                            stunt.skillBonus = 0;
                        }
                    })
                })*/

                return {
                    ...state,
                    stunts: [...stuntCopy]
                }
            /*case "CHANGE HEIGHT":
                return {
                    ...state,
                    [action.key]: action.value.map((key, keyIndex) => {
                        return keyIndex === action.propertyIndex ? {
                            ...key,
                            ["height"]: action.boxHeight
                        } : {...key}
                    })
                }*/
            case "SET CURRENT ROLL":
                return {
                    ...state,
                    ["dice"]: {
                        ...state.dice,
                        ["currentRoll"]: action.payload
                    }
                }
            case "SET THEME":
                return {
                    ...state,
                    ["theme"]: action.payload
                }
            case "LOAD JSON":
                return JSON.parse(localStorage.getItem(action.name) || "{}")
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