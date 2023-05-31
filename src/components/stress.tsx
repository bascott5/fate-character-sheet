import { useState } from "react";

const Stress: React.FC = () => {
    const [stress, setStress] = useState<boolean[]>([false]);
    const [edit, isEdit] = useState<boolean>(false);

    return (
        <div className="characterSheetBox">
            <h1>STRESS</h1>
            <button onClick={() => setStress([...stress, false])}>+</button>
            <button onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ?
                    stress.map((key, index) => (
                        <div>
                            <svg>
                                <rect className="stress" style={{ fill: key ? "red" : "white" }} height={50} width={50} onClick={() => setStress(stress => {
                                    const stressCopy = [...stress]
                                    stressCopy[index] = !stressCopy[index];
                                    return [...stressCopy];
                                })} />
                            </svg>
                        </div>
                    ))
                :
                    stress.map(key => (
                        <div>
                            { key }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Stress;