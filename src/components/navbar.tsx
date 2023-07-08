import Dropdown from '@/components/dropdown01';
import { useState } from 'react';

const Navbar: React.FC = () => {
	const [open, isOpen] = useState(false)
    let chapters = new Array(11);
	const chapter = ["Basics", "Character Creation", "Aspects & Fate Points", "Skills & Stunts", "Actions & Outcomes", "Challenges, Contests, & Conflicts", "Running the Game", "Scenes, Sessions, & Scenarios", "The Long Game", "Extras"];
	const content = new Array();
	content.push((
		<div>
			<h2>Welcome to Fate</h2>
			<p>If you’ve never played a roleplaying game before, here’s the basic idea: you and a bunch of friends get together to tell an interactive story about a group of characters you make up. You get to say what challenges and obstacles those characters face, how they respond, what they say and do, and what happens to them.</p>
			<p>It’s not all just conversation, though—sometimes you’ll use dice and the rules in this Web site to bring uncertainty into the story and make things more exciting.</p>
			<p>Fate doesn’t come with a default setting, but it works best with any premise where the characters are proactive, capable people leading dramatic lives. There is more advice on that under Game Creation.</p>
			<div>
				<h3>New To Fate</h3>
				<p>If you’re a new player, all you really need to know is in this chapter and on your character sheet—the GM will help you figure out the rest.</p>
				<p>If you’re a new GM, this is just the tip of the iceberg for you. You should read and get familiar with the whole core rules.</p>
			</div>
			<div>
				<h3>For Veterans</h3>
				<p>This is a new version of Fate, which was developed to update and streamline the system. You’ll recognize some of what’s in here, but some rules have changed as have some terminology. You can find a guide to all the changes that have been made.</p>
			</div>
		</div>
	)); //contains link to veteran's guide
	content.push((
		<div>
			<h2>What Makes a Good Fate Game?</h2>
			<p>You can use Fate to tell stories in many different genres, with a variety of premises. There is no default setting; you and your group will make that up yourselves. The very best Fate games, however, have certain ideas in common with one another, which best showcases what the game is designed to do.</p>
			<p>Whether you’re talking about fantasy, science fiction, superheroes, or gritty cop shows, Fate works best when you use it to tell stories about people who are proactive, competent, and dramatic.</p>
			<h2>Proactivity</h2>
			<p>Characters in a game of Fate should be proactive. They have a variety of abilities that lend themselves to active problem solving, and they aren’t timid about using them. They don’t sit around waiting for the solution to a crisis to come to them—they go out and apply their energies, taking risks and overcoming obstacles to achieve their goals.</p>
			<p>This doesn’t mean that they don’t ever plan or strategize, or that they’re all careless to a fault. It just means that even the most patient among them will eventually rise and take action in a tangible, demonstrable way.</p>
			<p>Any Fate game you play should give a clear opportunity for the characters to be proactive in solving their problems, and have a variety of ways they might go about it. A game about librarians spending all their time among dusty tomes and learning things isn’t Fate. A game about librarians using forgotten knowledge to save the world is.</p>
			<h2>Competence</h2>
			<p>Characters in a game of Fate are good at things. They aren’t bumbling fools who routinely look ridiculous when they’re trying to get things done—they’re highly skilled, talented, or trained individuals who are capable of making visible change in the world they inhabit. They are the right people for the job, and they get involved in a crisis because they have a good chance of being able to resolve it for the better.</p>
			<p>This doesn’t mean they always succeed, or that their actions are without unintended consequence. It just means that when they fail, it isn’t because they made dumb mistakes or weren’t prepared for the risks.</p>
			<p>Any Fate game that you play should treat the characters like competent people, worthy of the risks and challenges that come their way. A game about garbage men who are forced to fight supervillains and get their asses constantly handed to them isn’t Fate. A game about garbage men who </p><p>become an awesome anti-supervillain hit squad is.</p>
			<h2>Drama</h2>
			<p>Characters in a game of Fate lead dramatic lives. The stakes are always high for them, both in terms of what they have to deal with in their world, and what they’re dealing with in the six inches of space between their ears. Like us, they have interpersonal troubles and struggle with their issues, and though the external circumstances of their lives might be a lot bigger in scope than what we go through, we can still relate to and sympathize with them.</p>
			<p>This doesn’t mean they spend all their time wallowing in misery and pain, or that everything in their lives is always a world-shaking crisis. It just means that their lives require them to make hard choices and live with the consequences—in other words, that they’re essentially human.</p>
			<p>Any Fate game that you play should provide the potential and opportunity for drama among and between the characters, and give you a chance to relate to them as people. A game about adventurers mindlessly punching increasing numbers of bigger, badder bad guys is not Fate. A game about adventurers </p><p>struggling to lead normal lives despite being destined to fight ultimate evil is.</p>
			<div>
				<h3>When Creating Your Game:</h3>
				<li>Setting: </li><p>Decide what the world that surrounds the protagonists is like.</p>
				<li>Scale: </li><p>Decide how epic or personal your story will be.</p>
				<li>Issues: </li><p>Decide what threats and pressures inherent to the setting will spur the protagonists to action.</p>
				<li>NPCs: </li><p>Decide who the important people and locations are.</p>
				<li>Skills and Stunts: </li><p>Decide what sorts of things characters in the setting are likely to want to do.</p>
				<li>Character Creation: </li><p>Make the PCs.</p>
			</div>
		</div>
	));
	content.push((
		<div>
			<h2>Character Creation Is Play</h2>
			<p>First, character creation tells part of the characters’ stories, just like any other game session does. </p><p>Characters that really come alive have histories of their own and with each other. This establishes where they’ve been, what they’ve done, and why they continue to act against the issues they face, together or in opposition. There’s an ongoing story you’re now stepping into—it’s just that the most interesting parts haven’t happened yet.</p>
			<p>Second, it sets the stage for the next part of the story.</p><p>Each arc of a story sets up the next, so that they flow into one another in a natural evolution. Character creation needs to set up the first story arc.</p>
			<p>Third, character creation in Fate is collaborative.</p><p>As with game creation, character creation is best done as a group activity. Doing all of this together builds a strong foundation of communication between the players and GM, and this process has a number of ways to establish connections between the characters and the setting.</p>
			<p>Combined with game creation, character creation can take a full session to do—this allows everyone to learn about the world and each other’s characters. You and the other players will talk about your characters, make suggestions to each other, discuss how they connect, and establish more of the setting.</p>
			<p>You’ll want to keep good notes on this process. You can use the character sheet and character creation worksheet downloadable at FateRPG.com.</p>
			<p>Start by determining your character’s high concept and trouble. Then build your character’s backstory, a process that takes place over three phases. Once you have that figured out, flesh out your character’s skills and stunts. Then you’re ready to play!</p>
			<div>
				<h3>When Creating Your Character</h3>
				<li>Aspects: </li><p>Come up with your character’s high concept and trouble aspects.</p>
				<li>Name: </li><p>Name your character.</p>
				<li>Phase One: </li><p>Describe your character’s first adventure.</p>
				<li>Phase Two and Three: </li><p>Describe how you’ve crossed paths with two other characters.</p>
				<li>Aspects: </li><p>Write down one aspect for each of these three experiences.</p>
				<li>Skills: </li><p>Pick and rate your skills.</p>
				<li>Stunts: </li><p>Pick or invent three to five stunts.</p>
				<li>Refresh: </li><p>Determine how many fate points you start play with.</p>
				<li>Stress and Consequences: </li><p>Determine how much of a beating your character can take.</p>
			</div>
		</div>
	));

	for (let i = 0; i < chapter.length; i++) {
		chapters.push(<Dropdown chapter={chapter[i]} index={i} />);
	}
	
	return (
		<div className="dropdownContainer">
			<button onClick={() => isOpen(!open)}>---</button>
			<div style={open ? { display: "block" } : { display: "none" }}>
				<h1 className='logo'>Fate Core</h1>
				{ chapters }
			</div>
		</div>
	);
}

export default Navbar;