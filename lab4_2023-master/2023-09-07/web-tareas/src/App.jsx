import { useEffect, useState } from "react";

function App() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    /*
    fetch("http://localhost:3000/tareas").then((respuesta) => {
      respuesta.json().then((tareas) => setTareas(tareas));
    });
    */
    const getTareas = async () => {
      const respuesta = await fetch("http://localhost:3000/tareas");
      const tareas = await respuesta.json();
      setTareas(tareas);
    };
    getTareas();
  }, []);

  return (
    <>
      <h1>Tareas</h1>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {tarea.descripcion} {tarea.lista ? "✔️" : "❌"}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
