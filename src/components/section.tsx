import Link from "next/link";

interface Props {
    sections: string
}

const Section: React.FC<Props> = ({ sections }: Props) => {
    return (
		<Link href={"./" + sections + ".tsx"}>{ sections }</Link>
	)
}

export default Section;