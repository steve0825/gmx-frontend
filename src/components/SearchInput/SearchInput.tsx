import "./SearchInput.scss";
import { t } from "@lingui/macro";
import searchIcon from "img/search.svg";
import { useMedia } from "react-use";
import cx from "classnames";

export default function SearchInput({ value, setValue, onKeyDown, className }) {
  const isSmallerScreen = useMedia("(max-width: 700px)");
  const classNames = cx("Search-input", className);
  return (
    <div className={classNames}>
      <input
        type="text"
        placeholder={t`Search Token`}
        value={value}
        onChange={setValue}
        onKeyDown={onKeyDown}
        autoFocus={!isSmallerScreen}
        className="Tokenselector-search-input"
        style={{
          backgroundImage: `url(${searchIcon})`,
        }}
      />
    </div>
  );
}
