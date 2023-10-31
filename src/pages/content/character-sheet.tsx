import React from "react";
import OptionContainer from "../../components/option-container";
import ContextProvider from "../../components/context-provider";
import ControlPanel from "../../components/control-panel";
import Background from "../../components/background";
import Dice from "../../components/dice";
import { useRouter } from "next/router";

const CharacterSheet: React.FC = () => {
    const router = useRouter();
    const { name } = router.query;

    return (
        <div className="characterSheet">
            <ContextProvider>
                <Background />
                <ControlPanel name={ { name }.name } />
                <OptionContainer />
                <Dice />
            </ContextProvider>
        </div>
    )
}

export default CharacterSheet;