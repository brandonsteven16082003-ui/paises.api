
function Buscador({ busqueda, setBusqueda }) {
  return (
    <form
      className="buscador"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Escribe el nombre de un país..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <button type="submit">
        Buscar
      </button>
    </form>
  );
}

export default Buscador;
