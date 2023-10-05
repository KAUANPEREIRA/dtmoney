import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLight, TrContainer, TransactionsTable } from "./style";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TrContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%"> Desenvolvimento de site</td>
              <td>
                <PriceHightLight variant="income">R$ 12.000,00</PriceHightLight>
              </td>
              <td>Venda</td>
              <td>30/09/2023</td>
            </tr>

            <tr>
              <td width="50%">Hamburguer</td>

              <td>
                <PriceHightLight variant="outcome">R$ - 59,00</PriceHightLight>
              </td>
              <td>Alimentação</td>
              <td>30/09/2023</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TrContainer>
    </div>
  );
}
