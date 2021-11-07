import React from "react";
import classnames from "classnames";
import styles from "./RadioButton.module.css";
import { GeneralComponent } from "../../algorithmsSettings/algorithmsSettings";

class RadioButton extends React.Component {
  render() {
    const { componentBlock, contentData, id, changeData, title, index } =
      this.props;
    const isYes = true; //contentData[0].item === 'Да';
    return (
      <div
        className={classnames({
          [styles.wrap]: true,
          [styles.visibleWrap]: componentBlock.visibility,
          [styles.invisibleWrap]: !componentBlock.visibility,
        })}
      >
        <GeneralComponent index={index} item={componentBlock} />
        <p className={styles.title}>{title}</p>
        <div>
          <div
            className={classnames({
              [styles.yesNoWrap]: isYes || !isYes === "Нет",
            })}
          >
            {contentData.map((item) => (
              <div
                key={item.key}
                className={classnames({
                  [styles.radioButtonWrap]: true,
                  [styles.yesNoRadioButtonWrap]: isYes || isYes === "Нет",
                  [styles.radioButtonWrapUnChecked]: !item.checked,
                  [styles.radioButtonWrapChecked]: item.checked,
                })}
                onClick={() =>
                  changeData(id, !item.checked, item.key, item, componentBlock)
                }
              >
                <input
                  type="radio"
                  id={item.item}
                  className={styles.radioButton}
                />
                <label htmlFor={item.item} className={styles.radioButtonText}>
                  {item.item}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default RadioButton;
