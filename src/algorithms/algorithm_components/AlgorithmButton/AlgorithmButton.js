import React from "react";
import classnames from "classnames";
import styles from "./AlgorithmButton.module.css";
import { GeneralComponent } from "../../algorithmsSettings/algorithmsSettings";

const AlgorithmButton = ({
  componentBlock,
  contentData,
  id,
  changeData,
  title,
  index,
}) => (
  <div
    className={classnames({
      [styles.wrap]: true,
      [styles.visibleWrap]: componentBlock.visibility,
      [styles.invisibleWrap]: !componentBlock.visibility,
    })}
  >
    {contentData.map((item) => (
      <div key={item.key}>
        <GeneralComponent index={index} item={componentBlock} />
        <button
          className={classnames({
            [styles.button]: true,
            [styles.buttonChecked]: item.checked,
            [styles.buttonUnchecked]: !item.checked,
          })}
          onClick={() =>
            changeData(id, !item.checked, item.key, item, componentBlock)
          }
        >
          {title}
        </button>
      </div>
    ))}
  </div>
);

export default AlgorithmButton;
