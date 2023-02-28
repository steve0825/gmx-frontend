import "./Button.scss";
import { ReactNode } from "react";
import cx from "classnames";
import ButtonLink from "./ButtonLink";

type ButtonVariant = "primary" | "primary-action" | "semi-clear" | "clear";

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  children: ReactNode;
  variant: ButtonVariant;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
  type?: "button" | "submit" | "reset";
  imgInfo?: {
    src: string;
    alt?: string;
  };
  newTab?: boolean;
};

export default function Button({
  variant,
  disabled,
  onClick,
  children,
  to,
  className,
  imgInfo,
  type,
  newTab,
}: ButtonProps) {
  const classNames = cx("button", variant, className);
  function handleClick() {
    if (disabled || !onClick) {
      return;
    }
    if (onClick) {
      onClick();
    }
  }

  if (to) {
    return (
      <ButtonLink className={classNames} to={to} onClick={onClick} newTab={newTab}>
        {imgInfo && <img className="btn-image" src={imgInfo.src} alt={imgInfo.alt || ""} />}
        {children}
      </ButtonLink>
    );
  }

  if (onClick) {
    return (
      <button className={classNames} onClick={handleClick} disabled={disabled}>
        {imgInfo && <img className="btn-image" src={imgInfo.src} alt={imgInfo.alt || ""} />}
        {children}
      </button>
    );
  }

  return (
    <button type={type} className={classNames} disabled={disabled}>
      {imgInfo && <img className="btn-image" src={imgInfo.src} alt={imgInfo.alt || ""} />}
      {children}
    </button>
  );
}
