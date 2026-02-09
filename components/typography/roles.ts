import type { TextVariant, TextWeight, TextDecoration, TextTransform, TextColor } from "./tokens";

export type TextRole =
  | "badgeStatus"
  | "link"; // אפשר להוסיף בהמשך: pageTitle, sectionTitle וכו'

export const TEXT_ROLES: Record<
  TextRole,
  {
    variant: TextVariant;
    weight?: TextWeight;
    decoration?: TextDecoration;
    transform?: TextTransform;
    color?: TextColor;
  }
> = {
  badgeStatus: {
    variant: "Label",
    weight: "bold",
    decoration: "none",
    transform: "none",
  },
  link: {
    variant: "Body",
    weight: "regular",
    decoration: "underline",
    transform: "none",
    color: "brand",
  },
};
