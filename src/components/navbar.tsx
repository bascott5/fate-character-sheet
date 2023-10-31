import React from 'react';
import Dropdown from '../components/dropdown01';
import { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import { Context } from './context-provider';

const Navbar: React.FC = () => {
	const [context, dispatch] = useContext(Context);
	const [open, isOpen] = useState(false)
    let chapters = new Array(11);
	const chapter = ["Basics", "Game Creation", "Character Creation", "Aspects & Fate Points", "Skills & Stunts", "Actions & Outcomes", "Challenges, Contests, & Conflicts", "Running the Game", "Scenes, Sessions, & Scenarios", "The Long Game", "Extras"];
	const container = useRef<any>(null);

    useEffect(() => {
        const outsideClickHandler = (e: any) => {
            if (container.current && !container.current.contains(e.target)) {
                isOpen(false);
            }
        }
        
        document.addEventListener("mousedown", outsideClickHandler);
        return () => {
            document.removeEventListener("mousedown", outsideClickHandler)
        }
    }, [container]);

	for (let i = 0; i < chapter.length; i++) {
		chapters.push(<Dropdown chapter={chapter[i]} index={i} />);
	}
	
	return (
		<div ref={ container }>
			<div className="navbar" style={open ? { display: "block" } : { display: "none" }}>
				<h1 className="logo">Fate Core</h1>
				<div>
					<ul><Link href={ "/content/character-sheet" } onClick={() => isOpen(false)}>Character Sheet</Link></ul>
					<ul><Link href={ "/content/characters" } onClick={() => isOpen(false)}>Characters</Link></ul>
				</div>
				{ chapters }
			</div>
		</div>
	);
}

export default Navbar;