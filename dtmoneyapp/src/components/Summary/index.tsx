import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { useSummary } from "../../hooks/useSummary";
import { priceFormatter } from "../../utils/formater";
import { SummaryCard, SummaryContainer } from "./style";

export const Summary = () => {
  const summary = useSummary();

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={23} color="#00b37e"></ArrowCircleUp>
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
        {/* <strong>R$ 17.400,00</strong> */}
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={23} color="#f75a68"></ArrowCircleDown>
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
        {/* <strong>R$ 17.400,00</strong> */}
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={23} color="#fff"></CurrencyDollar>
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
        {/* <strong>R$ 17.400,00</strong> */}
      </SummaryCard>
    </SummaryContainer>
  );
};
