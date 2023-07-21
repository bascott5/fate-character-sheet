import OptionContainer from "@/components/option-container";
import ContextProvider from "@/components/context-provider";
import ControlPanel from "@/components/control-panel";

const CharacterSheet: React.FC = () => {
    return (
        <div className="characterSheet">
            <ContextProvider>
                <ControlPanel />
                <OptionContainer />
            </ContextProvider>
        </div>
    )
}

export default CharacterSheet;