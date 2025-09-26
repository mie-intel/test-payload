import type { CollectionConfig } from "payload";

export const Papers: CollectionConfig = {
  slug: "paper",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "author",
      type: "text",
      required: true,
    },
  ],
};
