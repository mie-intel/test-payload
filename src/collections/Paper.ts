import type { CollectionConfig } from "payload";

export const Papers: CollectionConfig = {
  slug: "Papers",
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
    // {
    //   name: "content",
    //   type: "richText",
    //   required: true,
    // },
  ],
};
