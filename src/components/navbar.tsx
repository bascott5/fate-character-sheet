import Dropdown from './dropdown01';

const Navbar: React.FC = () => {
    let chapters = new Array(5);
	let chapter = ["Chapter 1", " Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"];

	for (let i = 0; i < 5; i++) {
		chapters.push(<Dropdown chapter={chapter[i]} index={i} />);
	}
	
	return (
		<div>
			{ chapters }
		</div>
	)	
}

export default Navbar;