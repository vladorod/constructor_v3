import React, { useState, useEffect } from "react";
import styles from "./TextBox.module.css";
import classnames from "classnames";
import {
  EditContentManager,
  GeneralComponent,
} from "../../algorithmsSettings/algorithmsSettings";
import { observer } from "mobx-react-lite";

const createMarkup = (text) => {
  return { __html: text.replace(/\n/g, "<br>") };
};

const TextBox = observer(({ componentBlock, index }) => {
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
            <textarea
              className={styles.editTextInput}
              value={newText}
              onChange={(event) => setNewText(event.target.value)}
              placeholder="Содержание блока..."
            />
          </div>
          <div className={styles.editManagerBlock}>
            <EditContentManager
              item={componentBlock}
              type="text"
              newContent={{ content: newText }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.contentBlock}>
          <GeneralComponent index={index} item={componentBlock} />
          <p className={styles.contentText}>
            <div
              dangerouslySetInnerHTML={createMarkup(
                componentBlock.content.title
              )}
            />
          </p>
        </div>
      )}
    </div>
  );
});

export default TextBox;
