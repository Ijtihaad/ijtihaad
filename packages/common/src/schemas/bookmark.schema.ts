import z from "zod";
import { AccountType, accountSchema } from "./account.schema";

export const bookmarkSchema = z.object({
    user: accountSchema.extend({
        accountType: z.literal(AccountType.user)
    }),
})

export type Bookmark = z.infer<typeof bookmarkSchema>;