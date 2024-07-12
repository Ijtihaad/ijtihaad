import z from "zod"

export enum AssetType {
    image = "image",
    video = "video",
    audio = "audio",
    youtubeVideo = "youtubeVideo",
}

export const assetSchema = z.object({
    assetUrl: z.string(),
    originalName: z.string(),
    assetType: z.nativeEnum(AssetType)
})

export const updateAssetSchema = z.object({
    displayName: z.string(),
});

export const assetQueryUniqueInputSchema = z.object({
    uniqueName: z.string().optional(),
});

export type Asset = z.infer<typeof assetSchema>;
export type UpdateAsset = z.infer<typeof updateAssetSchema>;
export type AssetQueryUniqueInput = z.infer<typeof assetQueryUniqueInputSchema>;