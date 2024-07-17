import z from "zod";
import { AccountType, accountSchema } from "./account.schema";

export enum VoteValue {
    upVote = 1,
    noVote = 0,
    downVote = -1,
}

export const voteSchema = z.object({
    value: z.nativeEnum(VoteValue),
    user: accountSchema.extend({
        accountType: z.literal(AccountType.user)
    }),
})

export type Vote = z.infer<typeof voteSchema>;
