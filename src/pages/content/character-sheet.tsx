import OptionContainer from "@/components/option-container";
import ContextProvider from "@/components/context-provider";
import ControlPanel from "@/components/control-panel";

const CharacterSheet: React.FC = () => { //TODO: wrap context provider around characters and character sheet so they can both be affected by the same context
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