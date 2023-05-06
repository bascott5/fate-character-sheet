import { useState } from 'react';
import Section from './section';

interface Props {
    chapter: string[],
    index: number
}

const Dropdown: React.FC<Props> = ({chapter, index}: Props) => {
    const [open, isOpen] = useState<boolean>(false);

    let sections = new Array();
    switch (index) {
		case 0:
		sections = [];
		break;

		case 1:
		sections = [];
		break;

		default:
		sections = [];
		break;
	}
	
	let pages = new Array(sections.length);

	for (let i = 0; i < sections.length; i++) {
		pages.push(<Section sections={sections[i]} />)
	}

    return (
        <div className="dropdownContainer">
			<button onClick={() => isOpen(open => open = !open)} className="dropdown">{ chapter }</button>
            <li>
            {
                open ?
				    <ul>{ pages }</ul>                    
                    :
                    null
            }
            </li>
		</div>
    );
}

export default Dropdown;