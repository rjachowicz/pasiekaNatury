export const valueIconSources = {
  heart: "/assets/icons/values/heart.svg",
  leaf: "/assets/icons/values/leaf.svg",
  tree: "/assets/icons/values/tree.svg",
  sun: "/assets/icons/values/sun.svg",
  bee: "/assets/icons/values/bee.svg",
  "hand-stars": "/assets/icons/values/hand-stars.svg",
  "honey-jar": "/assets/icons/values/honey-jar.svg",
} as const;

export type ValueIconName = keyof typeof valueIconSources;
