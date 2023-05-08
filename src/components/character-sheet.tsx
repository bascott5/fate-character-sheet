import OptionContainer from "./option-container";
import ContextProvider from "@/components/context-provider";

const CharacterSheet: React.FC = () => {
    return (
        <div>
            <ContextProvider>
                <OptionContainer />
                <div className="firstColumn">
                    <p>Skills</p>
                    <p>Stunts</p>
                </div>
                <div className="secondColumn">
                    <p>Aspects</p>
                    <p>Stress</p>
                </div>
            </ContextProvider>
        </div>
    )
}

export default CharacterSheet;