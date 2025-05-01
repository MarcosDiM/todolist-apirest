import { useEffect } from "react";
import { AppRouter } from "./routes/AppRouter";
import { taskStore } from "./store/todoStore";

function App() {
  const setArrayTareas = taskStore((state) => state.setArrayTareas);

  useEffect(() => {

    fetch("http://localhost:3000/backlog")
      .then((res) => res.json())
      .then((data) => setArrayTareas(data.tareas))
      .catch(console.error);
  }, [setArrayTareas]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
