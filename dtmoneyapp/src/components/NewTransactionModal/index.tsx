import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import * as z from "zod";
import { TransactionContext } from "../../contexts/TransactionsContexts";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./style";
export const NewTransactionModal = () => {
  const CreateTransaction = useContextSelector(
    TransactionContext,
    (context) => {
      return context.CreateTransaction;
    }
  );

  const newTransactionModalSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),

    type: z.string(),
  });

  type transactionModalInputs = z.infer<typeof newTransactionModalSchema>;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<transactionModalInputs>({
    resolver: zodResolver(newTransactionModalSchema),
  });

  // const handleNewTransactionModal = (data: transactionModalInputs) => {
  //   console.log({ data });
  // };

  async function handleNewTransactionModal(data: transactionModalInputs) {
    const { description, category, price, type } = data;
    await CreateTransaction({
      description,
      category,
      price,
      type,
    });

    reset();
  }
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleNewTransactionModal)}>
          <input
            type="text"
            placeholder="Descriçao"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ cursor: "pointer" }}
          >
            Enviar
          </button>
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />
        </form>
      </Content>
    </Dialog.Portal>
  );
};
