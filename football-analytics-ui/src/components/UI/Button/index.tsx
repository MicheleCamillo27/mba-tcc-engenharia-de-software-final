import styles from "./styles.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, ...props }: Props) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}