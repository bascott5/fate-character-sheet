import Dropdown from './dropdown01';

const Navbar: React.FC = () => {
    let chapters = new Array(5);
	let chapter = ["Basics", "Character Creation", "Aspects & Fate Points", "Skills & Stunts", "Actions & Outcomes", "Challenges, Contests, & Conflicts", "Running the Game", "Scenes, Sessions, & Scenarios", "The Long Game", "Extras"];

	for (let i = 0; i < 5; i++) {
		chapters.push(<Dropdown chapter={chapter[i]} index={i} />);
	}
	
	return (
		<div>
			<h1>Fate Core</h1>
			{ chapters }
		</div>
	);
}

export default Navbar;