import { useState } from "react";
import { AppContext } from "./AppContext";

export const Provider = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(true);
  const [user, setUser] = useState("");
  const [inputType, setInputType] = useState("password");


  const value = {
    modalVisible,
    setModalVisible,
    time,
    setTime,
    user,
    setUser,
    inputType, setInputType
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
