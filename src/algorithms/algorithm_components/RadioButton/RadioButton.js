import React, { useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./RadioButton.module.css";
import {
  EditContentManager,
  GeneralComponent,
} from "../../algorithmsSettings/algorithmsSettings";
import { observer } from "mobx-react-lite";

const RadioButton = observer(
  ({ componentBlock, contentData, id, changeData, index }) => {
    const isYes = true; //contentData[0].item === 'Да';

    const title = componentBlock.content.title
      .replace("<b>", "")
      .replace("</b>", "");
    const [newTitle, setNewTitle] = useState(title);
    const buttonsMap = componentBlock.content.value.map( (button) => button.item);
    const [buttons, setButtons] = useState(buttonsMap);

    useEffect(() => {
      if (componentBlock.onEdit === false) {
        setNewTitle(title);
        setButtons(buttonsMap);
      }
    }, [componentBlock.onEdit]);

    return (
      <div
        className={classnames({
          [styles.wrap]: true,
          [styles.visibleWrap]: componentBlock.visibility,
          [styles.invisibleWrap]: !componentBlock.visibility,
        })}
      >
        {componentBlock.onEdit ? (
          <div className={styles.editBlock}>
            <div className={styles.editContentBlock}>
              <input
                className={styles.editTitleInput}
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="Текст заголовка..."
              />
              {buttons.map((buttonText, index) => {
                return (
                  <input
                    className={styles.editTextInput}
                    value={buttonText}
                    onChange={(event) => {
                      setButtons([buttons.map( (item, itemIndex) => {
                        if (itemIndex === index) {
                          return event.target.value;
                        }
                        return item;
                      })])
                    }}
                    placeholder="Текст кнопки..."
                  />
                );
              })}
            </div>
            <div className={styles.editManagerBlock}>
              <EditContentManager
                item={componentBlock}
                type="radiobutton"
                newContent={{ title: newTitle, buttons: buttons }}
              />
            </div>
          </div>
        ) : (
          <div className={styles.contentBlock}>
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
                      changeData(
                        id,
                        !item.checked,
                        item.key,
                        item,
                        componentBlock
                      )
                    }
                  >
                    <input
                      type="radio"
                      id={item.item}
                      className={styles.radioButton}
                    />
                    <label
                      htmlFor={item.item}
                      className={styles.radioButtonText}
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default RadioButton;
