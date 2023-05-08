import ContextProvider from "@/components/context-provider";
import CharacterSheet from "@/components/character-sheet";

const Home: React.FC = () => {
    return (
        <div>
            <ContextProvider>
                <CharacterSheet />
            </ContextProvider>
        </div>
    )
}

export default Home;
