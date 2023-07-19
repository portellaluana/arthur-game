import { useContext } from "react";
import IconLogo from "../../assets/icons/icon-logo.svg";
import OpenEyes from "../../assets/open-eyes-password.png";
import ClosedEyes from "../../assets/closed-eyes-password.png"
import { AppContext } from "../../context/AppContext";

export const WelcomeScreen = () => {
  const { modalVisible, setModalVisible, inputType  } = useContext(AppContext)

  const handleClick = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="content-image">
          {inputType === 'password' ? <img src={OpenEyes} alt="" className="welcome-background" /> : <img src={ClosedEyes} alt="" className="welcome-background" />}
        </div>
        <div className="content-info">
          <img src={IconLogo} alt="ícone da logo" className="welcome-icon" />
          <h4>Olá</h4>
          <p>seja muito bem-vindo</p>
          <button className="btn-primary" onClick={handleClick}>fazer login</button><br/>
          <button className="btn-text">continuar sem login</button>
        </div>
      </div>
    </div>
  );
};
