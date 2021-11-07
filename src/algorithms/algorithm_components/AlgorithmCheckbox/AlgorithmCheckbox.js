import React from "react";
import classnames from "classnames";
import styles from "./AlgorithmCheckbox.module.css";
import { GeneralComponent } from "../../algorithmsSettings/algorithmsSettings";

const createMarkup = (text) => {
  return { __html: text.replace(/\n/g, "<br>") };
};

const AlgorithmCheckbox = ({
  componentBlock,
  contentData,
  id,
  changeData,
  index,
  title,
}) => (
  <div
    className={classnames({
      [styles.wrap]: componentBlock.visibility,
      [styles.visibility]: !componentBlock.visibility,
    })}
  >
    <GeneralComponent item={componentBlock} index={index} />
    <div>
      {contentData.map((item) => (
        <div key={item.key}>
          <input type="checkbox" id={title} />
          <label htmlFor={title}>
            <div dangerouslySetInnerHTML={createMarkup(title)} />
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default AlgorithmCheckbox;
