
function FiltroRegion({ region, setRegion }) {
  return (
    <select
      className="filtro"
      value={region}
      onChange={(e) => setRegion(e.target.value)}
    >
      <option value="Todas">Todas las regiones</option>
      <option value="Africa">África</option>
      <option value="Americas">América</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europa</option>
      <option value="Oceania">Oceanía</option>
    </select>
  );
}

export default FiltroRegion;
