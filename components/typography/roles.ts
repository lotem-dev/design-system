import type { TextVariant, TextWeight, TextDecoration, TextTransform, TextColor } from "../atoms/Text";

export type TextRole =
  | "badgeStatus"; // אפשר להוסיף בהמשך: pageTitle, sectionTitle וכו'

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
};
