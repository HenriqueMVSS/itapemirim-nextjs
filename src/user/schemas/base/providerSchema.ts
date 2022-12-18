
import { z } from "zod";
import { allowedProvidersList } from "../../../auth/allowedProviders";

const messages = {
  invalidProvider:
    "Valeu a tentativa, mas dessa vez você se deu mal hahah'",
};

export const providerSchema = z
  .string()
  .refine((provider) => allowedProvidersList.includes(provider), {
    message: messages.invalidProvider,
  });