import Dropdown from '@/components/dropdown01';
import { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
	const [open, isOpen] = useState(false)
    let chapters = new Array(11);
	const chapter = ["Basics", "Game Creation", "Character Creation", "Aspects & Fate Points", "Skills & Stunts", "Actions & Outcomes", "Challenges, Contests, & Conflicts", "Running the Game", "Scenes, Sessions, & Scenarios", "The Long Game", "Extras"];

	for (let i = 0; i < chapter.length; i++) {
		chapters.push(<Dropdown chapter={chapter[i]} index={i} />);
	}
	
	return (
		<div className="dropdownContainer">
			<button onClick={() => isOpen(!open)}>---</button>
			<div style={open ? { display: "block" } : { display: "none" }}>
				<h1 className='logo'>Fate Core</h1>
				<Link href={ "/content/character-sheet" }>Character Sheet</Link>
				{ chapters }
			</div>
		</div>
	);
}

export default Navbar;