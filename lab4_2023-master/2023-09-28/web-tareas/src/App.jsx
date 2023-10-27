import { useEffect, useState } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [descripcionTarea, setDescripcionTarea] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/tareas")
      .then((res) => res.json())
      .then((tareas) => setTareas(tareas));
  }, []);

  const agregarTarea = async () => {
    const res = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tarea: { descripcion: descripcionTarea, lista: false },
      }),
    });

    if (res.ok) {
      const tareaNueva = await res.json();
      setTareas([...tareas, tareaNueva]);
      setDescripcionTarea("");
    } else {
      console.log("Fallo al crear tarea");
    }
  };

  const editarTarea = async (tareaAEditar) => {
    const tareaEditada = { ...tareaAEditar, lista: !tareaAEditar.lista };
    const res = await fetch(`http://localhost:3000/tareas/${tareaAEditar.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tarea: tareaEditada }),
    });

    if (res.ok) {
      setTareas(
        tareas.map((tarea) =>
          tarea.id === tareaAEditar.id ? tareaEditada : tarea
        )
      );
    } else {
      console.log("Fallo al modificar tarea");
    }
  };

  const eliminarTarea = async (tareaId) => {
    if (window.confirm("¿Desea eliminar la tarea?")) {
      const res = await fetch(`http://localhost:3000/tareas/${tareaId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTareas(tareas.filter((tarea) => tarea.id !== tareaId));
      } else {
        console.log("Fallo al quitar tarea");
      }
    }
  };

  return (
    <>
      <h1>Tareas</h1>
      <form
        onSubmit={(e) => {
          agregarTarea();
          e.preventDefault();
        }}
      >
        <label htmlFor="descripcionTarea">Descripcion:</label>
        <input
          name="descripcionTarea"
          value={descripcionTarea}
          onChange={(e) => setDescripcionTarea(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <span onClick={() => editarTarea(tarea)}>
              {tarea.descripcion} {tarea.lista ? "✔️" : "❌"}
            </span>
            <button onClick={() => eliminarTarea(tarea.id)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
