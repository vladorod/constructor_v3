import React, { useState, useEffect } from "react";
import classnames from "classnames";
import styles from "./Accordion.module.css";
import downArrow from "../../../assets/image/down-arrow.png";
import upArrow from "../../../assets/image/up-arrow.png";
import {
  EditContentManager,
  GeneralComponent,
} from "../../algorithmsSettings/algorithmsSettings";
import { observer } from "mobx-react-lite";


const createMarkup = (text) => {
  return text;
};

const AlgorithmAccordion = observer(
  ({ componentBlock, contentData }) => {
    const [expanded, setExpanded] = useState(false);
    const title = componentBlock.content.title.replace("<b>", "").replace("</b>", "");
    const [newTitle, setNewTitle] = useState(title);
    const text = componentBlock.content.value[0].item;
    const [newText, setNewText] = useState(text);

    useEffect(() => {
      if (componentBlock.onEdit === false) {
        setNewTitle(title);
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
        onClick={() => setExpanded(!expanded)}
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
              <textarea
                className={styles.editTextInput}
                value={newText}
                onChange={(event) => setNewText(event.target.value)}
                placeholder="Текст..."
              />
            </div>
            <div className={styles.editManagerBlock}>
              <EditContentManager
                item={componentBlock}
                type="accordion"
                newContent={{ title: newTitle, content: newText }}
              />
            </div>
          </div>
        ) : (
          <div className={styles.contentBlock}>
            <GeneralComponent item={componentBlock} />
            <div className={styles.accordionButtonWrap}>
              <div style={{ position: "relative" }}>
                <button className={styles.accordion}>{title}</button>
              </div>
              <div className={styles.accordionButtonArrowWrap}>
                {expanded ? (
                  <img
                    src={upArrow}
                    alt=""
                    className={styles.accordionButtonArrow}
                  />
                ) : (
                  <img
                    src={downArrow}
                    alt=""
                    className={styles.accordionButtonArrow}
                  />
                )}
              </div>
            </div>
            <div>
              {expanded && (
                <div>
                  {contentData.map((item) => (
                    <div>
                      <p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: createMarkup(item.item),
                          }}
                          className={styles.accordionDescription}
                        ></div>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default AlgorithmAccordion;
