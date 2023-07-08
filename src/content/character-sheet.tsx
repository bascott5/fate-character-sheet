import OptionContainer from "@/components/option-container";
import ContextProvider from "@/components/context-provider";
import Identity from "@/components/identity";

const CharacterSheet: React.FC = () => {
    return (
        <div>
            <ContextProvider>
                <Identity />
                <OptionContainer />
            </ContextProvider>
        </div>
    )
}

export default CharacterSheet;