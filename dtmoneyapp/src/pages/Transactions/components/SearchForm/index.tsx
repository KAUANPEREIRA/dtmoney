import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import * as z from "zod";
import { TransactionContext } from "../../../../contexts/TransactionsContexts";
import { SearchFormContainer } from "./style";

export const SearchForm = () => {
  const FetchTransactions = useContextSelector(
    TransactionContext,
    (context) => {
      return context.FetchTransactions;
    }
  );
  const searchFormSchema = z.object({ query: z.string() });

  type SearhFormInputs = z.infer<typeof searchFormSchema>;

  //SearhFormInputs tipagem do formulario

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearhFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearchTransaction = async (data: SearhFormInputs) => {
    await FetchTransactions(data.query);
  };
  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input
        type="text"
        placeholder="Busque uma transação"
        {...register("query")}
      ></input>
      <button disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
