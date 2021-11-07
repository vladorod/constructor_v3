import React, { useState, useEffect } from "react";
import classnames from "classnames";
import styles from "./AlgorithmButton.module.css";
import {
  EditContentManager,
  GeneralComponent,
} from "../../algorithmsSettings/algorithmsSettings";
import { observer } from "mobx-react-lite";


const AlgorithmButton = observer (({
  componentBlock,
  contentData,
  id,
  changeData,
  index,
}) => {
  const text = componentBlock.content.title;
  const [newText, setNewText] = useState(text);

  useEffect(() => {
    if (componentBlock.onEdit === false) {
      setNewText(text);
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
              className={styles.editTextInput}
              value={newText}
              onChange={(event) => setNewText(event.target.value)}
              placeholder="Текст кнопки..."
            />
          </div>
          <div className={styles.editManagerBlock}>
            <EditContentManager
              item={componentBlock}
              type="button"
              newContent={{ content: newText }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.contentBlock}>
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
                {componentBlock.content.title}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default AlgorithmButton;
