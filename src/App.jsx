import { useState, useEffect } from 'react'

export default function App() {
  const [paises, setPaises] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then((res) => res.json())
      .then((dados) => {
        setPaises(dados.sort(comparar));
      });
  }, []);

  function comparar(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  function Filtrar(pais) {
    if (filtro === 'todos') {
      return pais;
    } else if (filtro === pais.region) {
      return pais;
    }
  }

  function favoritar(i) {
    const selectedPais = paises[i];
    setFavoritos([...favoritos, selectedPais]);
    setPaises(paises.filter((_, index) => index !== i));
  }

  function desfavoritar(i) {
    const deselectedPais = favoritos[i];
    setPaises([...paises, deselectedPais]);
    setFavoritos(favoritos.filter((_, index) => index !== i));
  }

  function geraTabela(items, populacaoTotal, total, isFavorites) {
    return (
      <>
        <h1 className="text-2xl text-center m-4">
          Total de países: <span>{total}</span>
        </h1>
        <h1 className="text-2xl text-center m-4">
          População Total: <span>{populacaoTotal}</span>
        </h1>
        <table className="w-full">
          <tbody>
            {items
              .filter(Filtrar)
              .filter((pais) =>
                pais.name.toUpperCase().includes(inputValue.toUpperCase())
              )
              .map((pais, i) => (
                <tr key={i}>
                  <td>
                    <img
                      className="aspect-video h-20"
                      src={pais.flags.svg}
                      alt={`Flag of ${pais.name}`}
                    />
                  </td>
                  <td>{pais.alpha2Code}</td>
                  <td>{pais.name}</td>
                  <td>{pais.capital}</td>
                  <td>{pais.population}</td>
                  <td>
                    <button
                      className="border-2 rounded-lg p-2"
                      onClick={() => (isFavorites ? desfavoritar(i) : favoritar(i))}
                    >
                      {isFavorites ? 'Desfavoritar' : 'Favoritar'}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }

  const populacaoTotal = paises.reduce((a, b) => a + b.population, 0);
  const totalPaises = paises.length;
  const populacaoFavoritos = favoritos.reduce((a, b) => a + b.population, 0);
  const totalFavoritos = favoritos.length;

  return (
    <div className="grid grid-cols-2 grid-rows-[auto_auto_1fr] gap-4 p-4">
      <fieldset
        id="fieldset"
        className="w-full p-2 flex justify-between row-start-1 row-end-2 col-start-1 col-end-3"
      >
        {<fieldset
  id="fieldset"
  className="w-full p-2 flex justify-between row-start-1 row-end-2 col-start-1 col-end-3"
>
  <div>
    <input
      name="fieldset"
      type="radio"
      id="Todos"
      onChange={() => setFiltro("todos")}
    />
    <label htmlFor="Todos">Todos</label>
  </div>
  <div>
    <input
      name="fieldset"
      type="radio"
      id="Asia"
      onChange={() => setFiltro("Asia")}
    />
    <label htmlFor="Asia">Asia</label>
  </div>
  <div>
    <input
      name="fieldset"
      type="radio"
      id="Americas"
      onChange={() => setFiltro("Americas")}
    />
    <label htmlFor="Americas">Americas</label>
  </div>
  <div>
    <input
      name="fieldset"
      type="radio"
      id="Europe"
      onChange={() => setFiltro("Europe")}
    />
    <label htmlFor="Europe">Europe</label>
  </div>
  <div>
    <input
      name="fieldset"
      type="radio"
      id="Africa"
      onChange={() => setFiltro("Africa")}
    />
    <label htmlFor="Africa">Africa</label>
  </div>
  <div>
    <input
      name="fieldset"
      type="radio"
      id="Oceania"
      onChange={() => setFiltro("Oceania")}
    />
    <label htmlFor="Oceania">Oceania</label>
  </div>
  <div>
    <input
      name="fieldset"
      type="radio"
      id="Antartic"
      onChange={() => setFiltro("Antartic")}
    />
    <label htmlFor="Antartic">Antartic</label>
  </div>
</fieldset>
}
      </fieldset>
      <div className="w-full row-start-2 row-end-3 col-start-1 col-end-3">
        <input
          className="w-full p-2 border-2"
          type="text"
          id="input"
          placeholder="Digite um país"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="w-full row-start-3 row-end-4 col-start-1 col-end-2">
        {geraTabela(paises, populacaoTotal, totalPaises, false)}
      </div>
      <div className="w-full row-start-3 row-end-4 col-start-2 col-end-3">
        {geraTabela(favoritos, populacaoFavoritos, totalFavoritos, true)}
      </div>
    </div>
  );
}
