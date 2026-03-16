// Avatar — shows a user's photo or their initials if no photo is available.
// The initials are derived automatically from the name prop.
// Used in comment threads, user lists, and profile areas.
// Circle shape with four size options.
import styles from "./Avatar.module.css";

type AvatarProps = {
  // Full name of the person. Initials are derived from this automatically.
  name: string;
  // URL of the profile photo. If missing, shows initials instead.
  src?: string;
  // Visual size of the avatar. xs=20px, sm=24px, md=32px, lg=40px. Defaults to "md".
  size?: "xs" | "sm" | "md" | "lg";
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({ name, src, size = "md" }: AvatarProps) {
  return (
    <div className={`${styles.root} ${styles[size]}`} title={name}>
      {src ? (
        <img src={src} alt={name} className={styles.img} />
      ) : (
        <span className={styles.initials}>{getInitials(name)}</span>
      )}
    </div>
  );
}
