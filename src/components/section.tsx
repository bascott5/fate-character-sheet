import Link from "next/link";

interface Props {
    sections: string[]
}

const Section: React.FC<Props> = ({ sections }: Props) => {
    return sections.map((key: string) => (
		<Link href={"/" + key + ".tsx"}>{key}</Link>
	))
}

export default Section;