import { useState } from 'react';
import Section from '@/components/section';
import Link from "next/link";

interface Props {
    chapter: string,
    index: number
}

const Dropdown: React.FC<Props> = ({ chapter, index }: Props) => {
    const [open, isOpen] = useState<boolean>(false);

	let pages = [];
    let sections = new Array();
	let link = "";
    switch (index) {
		case 0:
			link = "basic"
			sections = ["What You Need To Play", "Players & Gamemasters", "The Character Sheet", "Taking Action, Dice, & the Ladder", "Fate Points", "Start Playing"];
			break;

		case 1:
			link = "game-creation"
			sections = ["Setting Up Your Game", "Making the Setting Work in Fate", "A Game’s Scale", "The Setting’s Big Issues", "Faces & Places", "Make Characters"];
			break;

		case 2:
			link = "character-creation"
			sections = ["Your Character Idea", "The Phase Trio", "Skills", "Stunts & Refresh", "Stress & Consequences", "You’re All Set!", "Quick Character Creation"];
			break;

		case 3:
			link = "aspects-fate-points"
			sections = ["Types of Aspects", "What Aspects Do", "Making A Good Aspect", "Invoking & Compelling", "Using Aspects For Roleplaying", "Fate Point Economy"];
			break;

		case 4:
			link = "skills-stunts"
			sections = ["Building Stunts", "Default Skill List", "Athletics", "Burglary", "Contacts", "Crafts", "Deceive", "Drive", "Empathy", "Fight", "Investigate", "Lore", "Notice", "Physique", "Provoke", "Rapport", "Resources", "Shoot", "Stealth", "Will"];
			break;

		case 5:
			link = "actions-outcomes"
			sections = ["Four Outcomes", "Four Actions"];
			break;

		case 6:
			link = "challenges-contests-conflicts"
			sections = ["Challenges", "Contests", "Conflicts", "Setting the Scene", "Establishing Sides", "Turn Order", "The Exchange", "Resolving Attacks", "Conceding the Conflict", "Getting Taken Out", "Movement", "Advantages in a Conflict", "Ending a Conflict", "Teamwork"];
			break;

		case 7:
			link = "running-the-game"
			sections = ["What To Do During Game Creation", "What To Do During Play", "Creating and Playing the Opposition (NPCs)"];
			break;

		case 8:
			link = "scenes-sessions-scenarios"
			sections = ["Defining Scenarios", "Find Problems", "Ask Story Questions", "Establish the Opposition", "Set Up The First Scene", "Defining Scenes", "The Scenario In Play"];
			break;

		case 9:
			link = "the-long-game"
			sections = ["Building an Arc", "Building A Campaign", "Advancement & Change", "World Advancement"];
			break;

		case 10:
			link = "extras"
			sections = ["Creating An Extra", "More Examples of Extras"];
			break;

		default:
			link = ""
			sections = [];
			break;
	}

	for (let i = 0; i < sections.length; i++) {
		pages.push(<Section sections={sections[i]} />);
	}

    return (
        <div>
			<div className="navbarDropdown">
				<button className="navbarButton" onClick={() => isOpen(!open)}><h4>{open ? "-" : "+"}</h4></button>
				<Link href={"/content/fate-core/" + link}>
						<h4>{ chapter }</h4>
				</Link>
			</div>
            {open ? <div className="navbarSection">{ pages }</div> : null}
		</div>
    );
}

export default Dropdown;