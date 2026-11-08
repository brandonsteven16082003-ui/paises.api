
import { useState } from "react";

function TarjetaPais({ pais }) {
  const [errorBandera, setErrorBandera] = useState(false);
  const codigoPais = pais.cca2?.toLowerCase();
  const urlBandera =
    pais.flags?.image ||
    (codigoPais ? `https://flagcdn.com/w320/${codigoPais}.png` : null);

  return (
    <article className="tarjeta">
      <div className="bandera">
        {urlBandera && !errorBandera ? (
          <img
            src={urlBandera}
            alt={`Bandera de ${pais.name.common}`}
            loading="lazy"
            onError={() => setErrorBandera(true)}
          />
        ) : (
          <span role="img" aria-label={`Bandera de ${pais.name.common}`}>
            {pais.flags?.emoji || "🌍"}
          </span>
        )}
      </div>

      <div className="informacion">
        <h2>{pais.name.common}</h2>

        <p>
          <strong>Capital:</strong>{" "}
          {pais.capital?.join(", ") || "No disponible"}
        </p>

        <p>
          <strong>Región:</strong>{" "}
          {pais.region || "No disponible"}
        </p>

        <p>
          <strong>Población:</strong>{" "}
          {pais.population
            ? Number(pais.population).toLocaleString("es-CO")
            : "No disponible"}
        </p>

        <p>
          <strong>Idiomas:</strong>{" "}
          {pais.languages?.join(", ") || "No disponible"}
        </p>
      </div>
    </article>
  );
}

export default TarjetaPais;
