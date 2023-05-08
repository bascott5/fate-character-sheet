import Dropdown from './dropdown01';

const Navbar: React.FC = () => {
    let chapters = new Array(11);
	const chapter = ["Basics", "Character Creation", "Aspects & Fate Points", "Skills & Stunts", "Actions & Outcomes", "Challenges, Contests, & Conflicts", "Running the Game", "Scenes, Sessions, & Scenarios", "The Long Game", "Extras"];

	for (let i = 0; i < chapter.length; i++) {
		chapters.push(<Dropdown chapter={chapter[i]} index={i} />);
	}
	
	return (
		<div className="dropdownContainer">
			<h1 className='logo'>Fate Core</h1>
			{ chapters }
		</div>
	);
}

export default Navbar;