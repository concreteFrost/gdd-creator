import { useNavigate } from 'react-router-dom';
import * as buttonStyle from "../Button.module.scss";

interface NavigateButtonProps {
    route: string;
    icon: any
}
function NavigateButton({ route, icon }: NavigateButtonProps) {

    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(route)}
            className={buttonStyle.create_btn}
            style={{
                padding: "5px 10px",
                position: "absolute",
                right: "5px",
                top: "8px",
            }}
        >{icon}</button>)
}

export default NavigateButton;