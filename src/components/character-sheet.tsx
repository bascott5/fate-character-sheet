import OptionContainer from "./option-container";

const CharacterSheet: React.FC = () => {
    return (
        <div>
            <OptionContainer />
            <div className="firstColumn">
                <p>Skills</p>
                <p>Stunts</p>
            </div>
            <div className="secondColumn">
                <p>Aspects</p>
                <p>Stress</p>
            </div>
        </div>
    )
}

export default CharacterSheet;