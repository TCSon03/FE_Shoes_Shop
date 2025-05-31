import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./router";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
