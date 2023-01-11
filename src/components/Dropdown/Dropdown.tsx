import { Menu } from "@headlessui/react";
import cx from "classnames";
import { FaChevronDown } from "react-icons/fa";

import "./Dropdown.scss";

export type Option = {
  label: string;
  value: any;
};

export type Props = {
  selectedOption?: Option;
  placeholder?: string;
  options: Option[];
  className?: string;
  onSelect: (option: Option) => void;
};

export function Dropdown(p: Props) {
  return (
    <div className={cx("Dropdown-root", p.className)}>
      <Menu>
        <Menu.Button as="div">
          <button className="Dropdown-current">
            <span className="Dropdown-current-label">{p.selectedOption?.label || p.placeholder}</span>
            <FaChevronDown className="Dropdown-current-arrow" />
          </button>
        </Menu.Button>
        <Menu.Items as="div" className="Dropdown-options menu-items">
          {p.options.map((option) => (
            <Menu.Item key={option.label}>
              <div className="Dropdown-option" onClick={() => p.onSelect(option)}>
                {option.label}
              </div>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}
