import { useState } from "react";

const Notes: React.FC = () => {
    const [notes, setNotes] = useState([]);
    [...notes, "test"]
}

export default Notes;