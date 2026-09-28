export const valueIconSources = {
  heart: "/assets/icons/values/heart.svg",
  leaf: "/assets/icons/values/leaf.svg",
  tree: "/assets/icons/values/tree.svg",
  "honey-jar": "/assets/icons/values/honey-jar.svg",
} as const;

export type ValueIconName = keyof typeof valueIconSources;
