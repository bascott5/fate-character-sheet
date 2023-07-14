import OptionContainer from "@/components/option-container";
import ContextProvider from "@/components/context-provider";
import Identity from "@/components/identity";
import ControlPanel from "@/components/control-panel";

const CharacterSheet: React.FC = () => {
    return (
        <div className="characterSheetContainer">
            <ContextProvider>
                <ControlPanel />
                <Identity />
                <OptionContainer />
            </ContextProvider>
        </div>
    )
}

export default CharacterSheet;