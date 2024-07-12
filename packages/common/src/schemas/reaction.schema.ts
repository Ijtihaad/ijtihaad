import z from "zod";
import { AccountType, accountSchema } from "./account.schema";

export const reactionSchema = z.object({
    type: z.string(),
    user: accountSchema.extend({
        accountType: z.literal(AccountType.user)
    }),
})

export type Reaction = z.infer<typeof reactionSchema>;
