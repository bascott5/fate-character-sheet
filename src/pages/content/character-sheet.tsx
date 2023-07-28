import OptionContainer from "@/components/option-container";
import ContextProvider from "@/components/context-provider";
import ControlPanel from "@/components/control-panel";
import { useRouter } from "next/router";

const CharacterSheet: React.FC = () => {
    const router = useRouter();
    const { name } = router.query;

    return (
        <div className="characterSheet">
            <ContextProvider>
                <ControlPanel name={ { name }.name } />
                <OptionContainer />
            </ContextProvider>
        </div>
    )
}

export default CharacterSheet;