import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";

export const SearchForm = () => {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Busque uma transação"></input>
      <button>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
