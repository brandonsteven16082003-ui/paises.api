
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Buscador from "./components/Buscador";
import FiltroRegion from "./components/FiltroRegion";
import TarjetaPais from "./components/TarjetaPais";

import { obtenerPaises } from "./services/paisesAPI.js";

import "./App.css";

function App() {
  const [paises, setPaises] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [region, setRegion] = useState("Todas");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarPaises = async () => {
      try {
        const datos = await obtenerPaises();
        setPaises(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarPaises();
  }, []);

  const paisesFiltrados = paises.filter((pais) => {
    const nombre = pais.name.common.toLowerCase();

    const coincideNombre = nombre.includes(
      busqueda.toLowerCase()
    );

    const coincideRegion =
      region === "Todas" || pais.region === region;

    return coincideNombre && coincideRegion;
  });

  return (
    <div>
      <Navbar />

      <main className="contenedor">
        <section className="presentacion">
          <h1>Explorador de Países</h1>

          <p>
            Descubre información geográfica y demográfica
            de diferentes países del mundo.
          </p>
        </section>

        <section className="controles">
          <Buscador
            busqueda={busqueda}
            setBusqueda={setBusqueda}
          />

          <FiltroRegion
            region={region}
            setRegion={setRegion}
          />
        </section>

        {cargando && (
          <p className="mensaje">
            Consultando información de los países...
          </p>
        )}

        {error && (
          <p className="error">{error}</p>
        )}

        {!cargando && !error && (
          <>
            <p className="contador">
              Países encontrados: {paisesFiltrados.length}
            </p>

            <section className="rejilla">
              {paisesFiltrados.map((pais) => (
                <TarjetaPais
                  key={pais.cca2}
                  pais={pais}
                />
              ))}
            </section>

            {paisesFiltrados.length === 0 && (
              <p className="mensaje">
                No se encontraron países.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
