import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "INI CONTOH GAMBAR",
    description: "Kumpulan gambar dan file lainnya.",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    staticDir: "ini-media",
    imageSizes: [
      {
        name: "tes1",
        width: 100,
        height: 100,
        position: "center",
      },
      {
        name: "tes2",
        width: 200,
        height: 200,
        position: "center",
      },
    ],
    mimeTypes: ["image/*", "video/*", "application/pdf"],
  },
};
