import { useState } from 'react';
import Section from '@/components/section';

interface Props {
    chapter: string,
    index: number
}

const Dropdown: React.FC<Props> = ({ chapter, index }: Props) => {
    const [open, isOpen] = useState<boolean>(false);

	let pages = [];
    let sections = new Array();
    switch (index) {
		case 0:
			sections = ["What You Need To Play", "Players & Gamemasters", "The Character Sheet", "Taking Action, Dice, & the Ladder", "Fate Points", "Start Playing"];
			break;

		case 1:
			sections = ["Setting Up Your Game", "Making the Setting Work in Fate", "A Game’s Scale", "The Setting’s Big Issues", "Faces & Places", "Make Characters"];
			break;

		case 2:
			sections = ["Your Character Idea", "The Phase Trio", "Skills", "Stunts & Refresh", "Stress & Consequences", "You’re All Set!", "Quick Character Creation"];
			break;

		case 3:
			sections = ["Types of Aspects", "What Aspects Do", "Making A Good Aspect", "Invoking & Compelling", "Using Aspects For Roleplaying", "Fate Point Economy"];
			break;

		case 4:
			sections = ["Building Stunts", "Default Skill List", "Athletics", "Burglary", "Contacts", "Crafts", "Deceive", "Drive", "Empathy", "Fight", "Investigate", "Lore", "Notice", "Physique", "Provoke", "Rapport", "Resources", "Shoot", "Stealth", "Will"];
			break;

		case 5:
			sections = ["Four Outcomes", "Four Actions"];
			break;

		case 6:
			sections = ["Challenges", "Contests", "Conflicts", "Setting the Scene", "Establishing Sides", "Turn Order", "The Exchange", "Resolving Attacks", "Conceding the Conflict", "Getting Taken Out", "Movement", "Advantages in a Conflict", "Ending a Conflict", "Teamwork"];
			break;

		case 7:
			sections = ["What To Do During Game Creation", "What To Do During Play", "Creating and Playing the Opposition (NPCs)"];
			break;

		case 8:
			sections = ["Defining Scenarios", "Find Problems", "Ask Story Questions", "Establish the Opposition", "Set Up The First Scene", "Defining Scenes", "The Scenario In Play"];
			break;

		case 9:
			sections = ["Building an Arc", "Building A Campaign", "Advancement & Change", "World Advancement"];
			break;

		case 10:
			sections = ["Creating An Extra", "More Examples of Extras"];
			break;

		default:
			sections = [];
			break;
	}

	for (let i = 0; i < sections.length; i++) {
		pages.push(<Section sections={sections[i]} />);
	}

    return (
        <div>
			<button onClick={() => isOpen(open => open = !open)} className="dropdown">{ chapter }</button>
            {
                open ?
					<div className="linkContainer">{ pages }</div>
            	:
                	null
            }
		</div>
    );
}

export default Dropdown;