
const API_URL = "https://api.restcountries.com/countries/v5";

const API_KEY = import.meta.env.VITE_RESTCOUNTRIES_API_KEY;

function convertirTexto(valor) {
  if (typeof valor === "string") {
    return valor;
  }

  if (typeof valor === "number") {
    return String(valor);
  }

  if (valor && typeof valor === "object") {
    return (
      valor.name ||
      valor.common ||
      valor.english_name ||
      "No disponible"
    );
  }

  return "No disponible";
}

export async function obtenerPaises() {
  if (!API_KEY) {
    throw new Error("No se encontró la API Key en .env.local");
  }

  const paises = [];
  let offset = 0;
  let hayMas = true;

  while (hayMas) {
    const parametros = new URLSearchParams({
      limit: "100",
      offset: String(offset),
      response_fields:
        "names.common,codes.alpha_2,capitals,languages,region,population,flag.emoji"
    });

    const respuesta = await fetch(
      `${API_URL}?${parametros}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(
        resultado.errors?.[0]?.message ||
        `Error HTTP: ${respuesta.status}`
      );
    }

    const registros = resultado.data?.objects || [];

    const datosAdaptados = registros.map((pais) => {
      const capitales = Array.isArray(pais.capitals)
        ? pais.capitals
        : pais.capitals
          ? [pais.capitals]
          : [];

      const idiomas = Array.isArray(pais.languages)
        ? pais.languages
        : pais.languages
          ? Object.values(pais.languages)
          : [];

      return {
        name: {
          common: convertirTexto(pais.names?.common)
        },

        cca2: pais.codes?.alpha_2 || convertirTexto(pais.names?.common),

        capital: capitales.map(convertirTexto),

        region: convertirTexto(pais.region),

        population: Number(pais.population) || 0,

        languages: idiomas.map(convertirTexto),

        flags: {
          emoji: pais.flag?.emoji || "🌍"
        }
      };
    });

    paises.push(...datosAdaptados);

    hayMas = resultado.data?.meta?.more === true;

    offset += registros.length;

    if (registros.length === 0) {
      hayMas = false;
    }
  }

  const abjasia = paises.find((pais) =>
    ["abjasia", "abkhazia"].includes(pais.name.common.trim().toLowerCase())
  );

  if (abjasia) {
    abjasia.name.common = "Abjasia";
    abjasia.flags = {
      ...abjasia.flags,
      image: "/abkhazia.svg"
    };
  } else {
    paises.push({
      name: { common: "Abjasia" },
      cca2: "AB",
      capital: ["Sujumi"],
      region: "Asia",
      population: 0,
      languages: ["Abjasio", "Ruso"],
      flags: { image: "/abkhazia.svg" }
    });
  }

  return paises.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
}
