import { useContext, useEffect } from "react";
import lightLogo from "../../assets/rachadinha-logo-light.svg";
import { AppContext } from "../../context/AppContext";
import { WelcomeScreen } from "../bem-vindo/bemVindo";

export const ViewPoint = () => {
  const {time, setTime} = useContext(AppContext)

  useEffect(() => {
    setTimeout(() => {
      setTime(false);
    }, 2000);
  }, []);

  return (
    <div onChange={() => setTime(false)}>
      {time ? (
        <div className="viewpoint-container">
          <div className="viewpoint-content">
            <img src={lightLogo} alt="light-logo" />
          </div>
        </div>
      ) : <WelcomeScreen />
    }
    </div>
  );
};
