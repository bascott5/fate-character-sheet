import Dropdown from '@/components/dropdown01';
import { useState } from 'react';
import Link from 'next/link';

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
	content.push((
		<div>
			<h2>Defining Aspects</h2>
			<p>An aspect is a phrase that describes something unique or noteworthy about whatever it’s attached to. They’re the primary way you spend and gain fate points, and they influence the story by providing an opportunity for a character to get a bonus, complicating a character’s life, or adding to another character’s roll or passive opposition.</p>
			<h2>Defining Fate Points</h2>
			<p>GMs and players, you both have a pool of points called fate points you can use to influence the game. You represent these with tokens, as we mentioned in The Basics. Players, you start with a certain number of points every scenario, equal to your character’s refresh. You’ll also reset to your refresh rate if you ended a mid-scenario session with fewer fate points than your rate. GMs, you get a budget of fate points to spend in every scene.</p>
			<p>When your aspects come into play, you will usually spend or gain a fate point.</p>
		</div>
	));
	content.push((
		<div>
			<h2>Defining Skills</h2>
			<p>A </p><p>skill </p><p>is a word that describes a broad family of competency at something—such as Athletics, Fight, or Deceive—which your character might have gained through innate talent, training, or years of trial and error. Skills are the basis for everything your character actually does in the game that involves challenge and chance (and dice).</p>
			<p>Skills are rated on the adjective ladder. The higher the rating, the better your character is at the skill. Taken together, your list of skills gives you a picture of that character’s potential for action at a glance—what you’re best at, what you’re okay at, and what you’re not so good at.</p>
			<p>We define skills in two ways in Fate—in terms of the </p><p>game actions </p><p>that you can do with them, and the </p><p>context </p><p>in which you can use them. There are only a handful of basic game actions, but the number of potential contexts is infinite.</p>
			<h2>The Basic Game Actions</h2>
			<p>We cover these in more detail in Actions and Outcomes, but here’s a quick reference so that you don’t have to flip all the way over there right now.</p>
			<p>Overcome: </p><p>True to its name, you tackle some kind of challenge, engaging task, or hindrance related to your skill.</p>
			<p>Create an Advantage: </p><p>Whether you’re discovering something that already exists about an opponent or creating a situation that helps you succeed, creating advantages allows you to discover and create aspects, and lets you get free invocations of them.</p>
			<p>Attack: </p><p>You try to harm someone in a conflict. That harm may be physical, mental, emotional, or social in nature.</p>
			<p>Defend: </p><p>You try to keep someone from harming you, getting past you, or creating an advantage to use against you.</p>
			<p>There are also some special effects that some skills perform, such as giving you additional stress boxes for a conflict. See Physique and Will in the default skill list below for examples.</p>
			<p>Even though there are only four actions that all skills adhere to, the skill in question lends context to the action. For example, both Burglary and Crafts allow you to create an advantage, but only under very different contexts—Burglary allows you to do it when you’re casing a place you’re about to break into, and Crafts allows you to do it when you’re examining a piece of machinery. The different skills let you differentiate the PCs’ abilities from one another a bit, allowing each person to have a unique contribution to the game.</p>
			<h2>Defining Stunts</h2>
			<p>A stunt is a special trait your character has that changes the way a skill works for you. Stunts indicate some special, privileged way a character uses a skill that is unique to whoever has that stunt, which is a pretty common trope in a lot of settings—special or elite training, exceptional talents, the mark of destiny, genetic alteration, innate coolness, and a myriad of other reasons all explain why some people get more out of their skills than others do.</p>
			<p>Unlike skills, which are about the sort of things anyone can do in your campaign, stunts are about individual characters. For that reason, the next several pages are about how to make your own stunts, but we’ll also have example stunts listed under each skill in the Default Skill List.</p>
			<p>Having stunts in your game allows you to differentiate characters that have the same skills as one another.</p>
			<div>
				<p>Landon and Cynere both have a high Fight skill, but Cynere also has the Warmaster stunt, which makes her better at creating advantages with the skill. This differentiates the two characters a great deal—Cynere has a unique capability to analyze and understand her enemies’ weaknesses in a way Landon doesn’t.</p>
				<p>One might imagine Cynere starting a fight by testing an enemy with moves and jabs, carefully assessing her opponent’s limits before moving in for a decisive strike, whereas Landon is happy to wade in and chop away.</p>
			</div>
			<p>You can also use this to set apart a certain set of abilities as belonging to a dedicated few, if that’s something your setting needs. For example, in a contemporary setting, you might feel that there shouldn’t be a base skill that allows just anyone to have medical training. (Unless, of course, it’s a game about doctors.) However, as a stunt for another, more general knowledge skill (like Lore), you can have one character be “the doctor” if that’s what the player wants.</p>
			<h2>Stunts and Refresh</h2>
			<p>Taking a new stunt beyond the first three reduces your character’s refresh rate by one.</p>
			<div>
				<h3>Stuntmaker—A Tool for Stunt Inspiration</h3>
				<p>If you're having trouble coming up with a stunt, give the Stuntmaker a go. It will generate random stunts to inspire you! (Just be sure to vet them with the table before using them.)</p>
			</div>
		</div>
	));
	content.push((
		<div>
			<h2>It's Time For Action!</h2>
			<p>You roll the dice when there’s some kind of interesting opposition keeping you from achieving your goals. If there’s no interesting opposition, you just accomplish whatever you say you’re trying to do.</p>
			<p>As said previously, characters in a Fate game solve their problems proactively. Players, during the game you’re going to do a lot—you might break into the bad guy’s fortress, pilot a starship past a minefield, rally a group of people into a protest, or poll a network of informants to get the latest word on the street.</p>
			<p>Whenever you take action, there’s a good chance that something or someone is going to be in your way. It wouldn’t be an interesting story if the bad guy just rolled over and handed you victory on a plate—clearly, he’s got some crazy security measures to keep you out of his place. Or the mines are unstable and already blowing up around you. Or the protesters are really scared of the cops. Or someone’s been bribing the informants to keep quiet.</p>
			<p>That’s when it’s time to take out the dice.</p>
			<li>Choose the character’s skill that is appropriate to the action.</li>
			<li>Roll four Fate dice.</li>
			<li>Add together the symbols showing on the dice. A + is +1, a - is –1, and a 0 is 0.</li>
			<li>Add your skill rating to the dice roll. The total is your result on the ladder.</li>
			<li>If you invoke an aspect, add +2 to your result or reroll the dice.</li>
			<div>
				<p>Cynere needs to bribe her way past the guards keeping her from entering the city of Thaalar. Amanda says she’ll do this as a straight-up overcome action, because the guards are nameless NPCs anyway and not really worth a conflict.</p>
				<p>Lily looks through Cynere’s skill list and picks Resources as her skill, hoping she can scrounge enough out of her coin purse to satisfy them. Her Resources skill is Average (+1), so she’ll add one to whatever result she gets from rolling the dice.</p>
				<p>She rolls and gets: +-0+</p>
				<p>Her total result is +2 (+1 from her dice and +1 from her skill of Average), which corresponds to a Fair on the ladder.</p>
			</div>
			<h2>Opposition</h2>
			<p>As said in The Basics, whenever you roll the dice, you’re comparing your roll to your opposition. Opposition is either active, meaning it’s another person rolling dice against you, or passive, meaning that it’s just a set rating on the ladder which represents the influence of the environment or situation you’re in. GMs, it’s your job to decide what the most reasonable source of opposition is.</p>
			<p>Amanda decides to roll active opposition against Lily on behalf of the guards. She decides the most appropriate opposing skill is Will—they’re trying to resist the temptation of bribery, after all.</p>
			<p>The guards are nameless NPCs with no reason to be particularly strong of will, so she gives them a Mediocre (+0). She rolls and gets: ++0+</p>
			<p>...for an incredibly lucky result of +3!</p>
			<p>That gives her a Good (+3) result, beating Lily’s roll by one.</p>
			<div>
				<h3>For the GM: Active or Passive?</h3>
				<p>If a PC or a named NPC can reasonably interfere with whatever the action is, then you should give them the opportunity to roll active opposition. This does not count as an action for the opposing character; it’s just a basic property of resolving actions. In other words, a player doesn’t have to do anything special to earn the right to actively oppose an action, as long as the character is present and can interfere. If there’s any doubt, having an appropriate situation aspect helps justify why a character gets to actively oppose someone else.</p>
				<p>If there is no character in the way, then look at your situation aspects in this scene to see if any of them justify some sort of obstacle, or consider the circumstances (like rough terrain, a complex lock, time running out, a situational complication, etc.). If something sounds interesting, choose passive opposition and set a rating on the ladder.</p>
				<p>Sometimes you’re going to run into edge cases, where something inanimate seems like it should provide active opposition (like an automated gun) or an NPC can’t provide proactive resistance (like if they’re unaware of what the PC is doing). Follow your gut—use the type of opposition that fits the circumstances or makes the scene more interesting.</p>
			</div>
			<div>
				<h3>Is the Opposition Rating for a roll known to the player? 99% of the time, Yes</h3>
				<p>From Rob Donoghue, co-owner of Evil Hat Productions, the publisher of Fate.</p>
				<p>So, the only reason I would not say that it's written in stone that the difficulty is known is that there are a very small (and largely innocuous) handful of exceptions.</p>
				<p>The first is situational. While vanishingly few and far between, I can conceive of situations where the lack of information to the player is reflective of something similarly disorienting and confusing in play (hallucinations, illusions and such). There is a strong component of taste in this usage - not every table can or should be comfortable with this, but some will be. That said, were I to do this as a GM, I would also be fully prepared to reimburse "wasted" Fate points, or otherwise balance the scales.</p>
				<p>A subset of this would be certain types of horror, but while I can intellectually see the argument of hiding information to promote a sense of powerlessness, I don't think I'd really go for that.</p>
				<p>The second is when the GM is "testing the breeze" - the roll may not have a difficulty per se, and instead merely be a framing mechanism. Again, not something that's done at every table, and if this is the case, the GM should communicate as much, or make sure to give some suitable narrative payout for the spending of a Fate Point. (Similar situations where we're rolling to see who does best/worst are less of an issue because the bonus has a direct effect).</p>
				<p>Aside from those situations and those of their ilk, there is no real reason to keep difficulty secret.</p>
				<p>But there's a catch</p>
				<p>Communicating difficulty can be awkward (conversationally) and when in a situation where the range of difficulty is roughly at parity with player capability (say, within +/-2) a GM can be forgiven for not explicitly calling out the difficulty of every roll before the dice hit the table. She should strive to be clear about effect and margin, though the language for that should suit the table (some like the ladder, some like numbers, some like descriptive approximations - they all work) but clarity need not be exhaustive.</p>
				<p>Anyway, that's just my philosophy-level answer. Specific builds can and should have their own answers.</p>
			</div>
		</div>
	)); //contain svgs of dice

	for (let i = 0; i < chapter.length; i++) {
		chapters.push(<Dropdown chapter={chapter[i]} index={i} />);
	}
	
	return (
		<div className="dropdownContainer">
			<button onClick={() => isOpen(!open)}>---</button>
			<div style={open ? { display: "block" } : { display: "none" }}>
				<h1 className='logo'>Fate Core</h1>
				<Link href={ "/" }>Character Sheet</Link>
				{ chapters }
			</div>
		</div>
	);
}

export default Navbar;