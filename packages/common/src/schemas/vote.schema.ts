import z from "zod";
import { AccountType, accountSchema } from "./account.schema";

export const voteSchema = z.object({
    upVote: z.boolean(),
    user: accountSchema.extend({
        accountType: z.literal(AccountType.user)
    }),
})

export type Vote = z.infer<typeof voteSchema>;
