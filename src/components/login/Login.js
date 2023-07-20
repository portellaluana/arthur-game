import { useContext, useState } from "react";
import googleIcon from "../../assets/icons/google-icon.png";
import { AppContext } from "../../context/AppContext";
import rachadinha from "../../assets/rachadinha-logo.svg";
import hidePassword from "../../assets/icons/hide-grey.png";
import showPassword from "../../assets/icons/show-grey.png";

export const Login = () => {
  const [hide, setHide] = useState(false);

    const { modalVisible, user, setUser, inputType, setInputType } = useContext(AppContext);

  const onHide = () => {
    setHide(!hide);

    if (inputType === "password") {
      setInputType("text");
    } else setInputType("password");
  };

  const handleUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div
        className={`modal-login ${
          modalVisible
            ? "modal-login-container-active modal-login-container"
            : ""
        }`}
      >
        <div className="modal-login-content">
          <input
            name="email"
            value={user.email}
            onChange={handleUser}
            type="email"
            placeholder="email"
            required
          />
          <input
            name="password"
            value={user.password}
            onChange={handleUser}
            type={inputType}
            placeholder="senha"
            className="input-senha"
            required
          />
          {hide ? (
            <img
              src={showPassword}
              alt=""
              className="hide-password"
              onClick={onHide}
            />
          ) : (
            <img
              src={hidePassword}
              alt=""
              className="hide-password"
              onClick={onHide}
            />
          )}{" "}
          <button className="btn-forgot-password">esqueci a senha</button>
          {user.email && user.password ? (
            <button className="btn-primary">entrar</button>
          ) : (
            <button className="btn-disabled">entrar</button>
          )}
          <button className="btn-text btn-google">
            <img src={googleIcon} alt="google-icon" />
            entrar com Google
          </button>
         
        </div>
        <img
          src={rachadinha}
          className="marca-rachadinha"
          alt="marca-rachadinha"
        />
      </div>
    </>
  );
};
