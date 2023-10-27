import axios from "axios";
import { useState } from "react";

function App() {
  const [credencial, setCredencial] = useState(null);

  return (
    <>
      {credencial ? (
        <>
          <p>Conectado como {credencial.usuario}</p>
          <button onClick={() => setCredencial(null)}>Salir</button>
          <button
            onClick={async () => {
              const response = await axios.get(
                "http://localhost:3000/auth/perfil",
                { headers: { Authorization: `Bearer ${credencial.token}` } }
              );
              console.log(response.data);
            }}
          >
            Perfil
          </button>
        </>
      ) : (
        <>
          <p>No esta conectado</p>
          <button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/auth/login",
                { usuario: "psanchez", password: "Algo1234" }
              );
              console.log(response.data);
              if (response.status === 200) {
                setCredencial(response.data);
              }
            }}
          >
            Ingresar
          </button>
        </>
      )}
    </>
  );
}

export default App;
