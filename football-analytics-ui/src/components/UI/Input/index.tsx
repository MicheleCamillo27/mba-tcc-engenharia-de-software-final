import styles from "./styles.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: Props) {
  return <input className={styles.input} {...props} />;
}