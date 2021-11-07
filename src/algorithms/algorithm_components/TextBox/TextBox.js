import React from "react";
import styles from "./TextBox.module.css";
import classnames from "classnames";
import { GeneralComponent } from "../../algorithmsSettings/algorithmsSettings";

const createMarkup = (text) => {
  return { __html: text.replace(/\n/g, "<br>") };
};

const TextBox = ({ componentBlock, contentData, title, navigation, index }) => {
  return (
    <div
      className={classnames({
        [styles.wrap]: true,
        [styles.visibleWrap]: componentBlock.visibility,
        [styles.invisibleWrap]: !componentBlock.visibility,
      })}
    >
      <GeneralComponent index={index} item={componentBlock} />
      <p>
        <div dangerouslySetInnerHTML={createMarkup(title)} />
      </p>
    </div>
  );
};

export default TextBox;
