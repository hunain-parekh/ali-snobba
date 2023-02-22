import { useEffect, useState } from "react";
import Loader from "./pages/Loader/Loader";
import Main from "./pages/Main/Main";


function App() {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  });
  return (
    <div className="App">
      {loader ? <Loader /> : <Main />}
    </div>
  );
}

export default App;
