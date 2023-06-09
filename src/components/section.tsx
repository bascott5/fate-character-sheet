import Link from "next/link";

interface Props {
    sections: string
}

const Section: React.FC<Props> = ({ sections }: Props) => {
    return (
        <ul className="section">
            <Link href={"./" + sections + ".tsx"} className="link">{ sections }</Link>
        </ul>
	)
}

export default Section;