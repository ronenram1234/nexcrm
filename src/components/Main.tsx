import { FunctionComponent, useContext } from "react";
import { GlobalProps } from "../App";
// import { useNavigate } from "react-router-dom";
import ModalLoginReg from "./ModalLoginReg";

interface MainProps {}

const Main: FunctionComponent<MainProps> = () => {
  const { isDarkMode, isUserLogedin } = useContext(GlobalProps);
  // const navigate = useNavigate();

  return (
    <>
      {/* {isUserLogedin ? console.log("3-yes") : console.log("3-no")} */}
      {isUserLogedin ? (
        <>
          {/* {isUserLogedin ? console.log("1-yes") : console.log("1-no")} */}
          <h1>main</h1>
          {/* <h2>{isDarkMode ? "isDarkMode- true" : "isDarkMode - false"}</h2> */}
        </>
      ) : (
        <>
        <ModalLoginReg />
          {/* {isUserLogedin ? console.log("2-yes") : console.log("2-no")} */}
          {/* {console.log("modal")} */}
        </>
      )}
    </>
  );

  // <h2>{isDarkMode ? "isDarkMode- true" : "isDarkMode - false"}</h2>
};

export default Main;
