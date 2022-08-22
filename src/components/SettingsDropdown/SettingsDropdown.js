import React, { useRef } from "react";
import { Menu } from "@headlessui/react";
import { Trans } from "@lingui/macro";
import cx from "classnames";
import "./SettingsDropdown.css";
import language16Icon from "../../img/ic_language16.svg";
import arbitrumIcon from "../../img/ic_arbitrum_24.svg";
import avaxIcon from "../../img/ic_avalanche_24.svg";
import checkedIcon from "../../img/ic_checked.svg";
import { importImage, LANGUAGE_LOCALSTORAGE_KEY } from "../../Helpers";
import { defaultLocale, dynamicActivate, locales } from "../../utils/i18n";

export default function SettingsDropdown({ networkOptions, selectorLabel, onNetworkSelect }) {
  const currentLanguage = useRef(localStorage.getItem(LANGUAGE_LOCALSTORAGE_KEY) || defaultLocale);
  return (
    <Menu>
      <Menu.Button as="div" className="networks-dropdown">
        <button className={cx("btn-primary small transparent networks-dropdown-icon")}>
          <img src={selectorLabel === "Arbitrum" ? arbitrumIcon : avaxIcon} alt={selectorLabel} />
        </button>
        <div className="networks-dropdown-seperator" />
        <button className={cx("btn-primary small transparent networks-dropdown-icon")}>
          <img src={language16Icon} alt={locales[currentLanguage]} />
        </button>
      </Menu.Button>
      <div>
        <Menu.Items as="div" className="menu-items networks-dropdown-items">
          <div className="networks-dropdown-headings">Network</div>
          <div className="networks-dropdown-list">
            <NetworkDropdown
              networkOptions={networkOptions}
              selectorLabel={selectorLabel}
              onNetworkSelect={onNetworkSelect}
            />
          </div>
          <div className="networks-dropdown-headings">Language</div>
          <div className="networks-dropdown-list">
            <LanguageDropdown currentLanguage={currentLanguage} />
          </div>
        </Menu.Items>
      </div>
    </Menu>
  );
}

function NetworkDropdown({ networkOptions, selectorLabel, onNetworkSelect }) {
  async function handleNetworkSelect(option) {
    await onNetworkSelect(option);
  }
  return networkOptions.map((network) => {
    const networkIcon = importImage(network.icon);
    return (
      <Menu.Item key={network.value}>
        <div
          className="networks-dropdown-menu-item menu-item"
          onClick={() => handleNetworkSelect({ value: network.value })}
        >
          <div className="menu-item-group">
            <div className="networks-dropdown-menu-item-img">
              <img src={networkIcon} alt={network.label} />
            </div>
            <span className="networks-dropdown-item-label">{network.label}</span>
          </div>
          <div className="networks-dropdown-menu-item-img">
            {selectorLabel === network.label && <img src={checkedIcon} alt="checked-icon" />}
          </div>
        </div>
      </Menu.Item>
    );
  });
}

function LanguageDropdown({ currentLanguage }) {
  return (
    <>
      {Object.keys(locales).map((item) => {
        const image = importImage(`flag_${item}.svg`);
        return (
          <Menu.Item key={item}>
            <div
              className="networks-dropdown-menu-item  menu-item"
              onClick={() => {
                localStorage.setItem(LANGUAGE_LOCALSTORAGE_KEY, item);
                dynamicActivate(item);
              }}
            >
              <div className="menu-item-group">
                <img className="networks-dropdown-language-img" src={image} alt="language-menu-open-icon" />
                <span className="networks-dropdown-item-label menu-item-label">
                  <Trans>{locales[item]}</Trans>
                </span>
              </div>
              <div className="networks-dropdown-menu-item-img">
                {currentLanguage.current === item && <img src={checkedIcon} alt={locales[item]} />}
              </div>
            </div>
          </Menu.Item>
        );
      })}
    </>
  );
}
