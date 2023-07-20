import { ViewPoint } from "./components/viewPoint/ViewPoint";
import { Provider } from "../src/context/Provider"
import { Login } from "./components/login/Login";

function App() {
  return (
    <Provider>

      <ViewPoint />
      <Login/>
      
    </Provider>
  );
}

export default App;
