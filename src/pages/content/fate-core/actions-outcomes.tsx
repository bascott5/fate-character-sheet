const ActionsOutcomes: React.FC = () => {
    return (
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
    )
}

export default ActionsOutcomes;