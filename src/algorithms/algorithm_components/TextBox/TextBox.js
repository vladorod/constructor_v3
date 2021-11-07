import React from "react";
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

const TextBox = observer (({ componentBlock, contentData, title, navigation, index }) => {
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
            <input className={styles.editTextInput}/>
          </div>
          <div className={styles.editManagerBlock}>
            <EditContentManager item={componentBlock} />
          </div>
        </div>
      ) : (
        <div>
          <GeneralComponent index={index} item={componentBlock} />
          <p>
            <div dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
        </div>
      )}
    </div>
  );
});

export default TextBox;
