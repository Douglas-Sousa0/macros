import Rotas from "./routes"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return(
    <>
      <Rotas />
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
