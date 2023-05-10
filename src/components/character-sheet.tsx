import OptionContainer from "./option-container";
import ContextProvider from "@/components/context-provider";

const CharacterSheet: React.FC = () => {
    return (
        <div>
            <ContextProvider>
                <OptionContainer />
            </ContextProvider>
        </div>
    )
}

export default CharacterSheet;