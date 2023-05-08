import { useContext } from "react";
import { Context } from "./context-provider";
import Option from "./option";

const OptionContainer: React.FC = () => {
    let buttons = new Array(5);
    let context = useContext(Context);

    for (let i = 0; i < 5; i++) {
        buttons.push(<Option title={Object.keys({ ...context })[i]} />)
    }

    return (
        <div>
            { buttons }
        </div>
    )
}

export default OptionContainer;