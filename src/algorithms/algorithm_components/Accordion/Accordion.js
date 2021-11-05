import React from "react";
import classnames from "classnames";
import styles from "./Accordion.module.css";
import downArrow from "../../../assets/image/down-arrow.png";
import upArrow from "../../../assets/image/up-arrow.png";
import { GeneralComponent } from "../../algorithmsSettings/algorithmsSettings";

class AlgorithmAccordion extends React.Component {
  state = {
    expanded: false,
  };

  createMarkup = (text) => {
    return text;
  };

  render() {
    const { componentBlock, title, contentData } = this.props;
    let _title = title.replace("<b>", "");
    _title = _title.replace("</b>", "");
    return (
      <div
        className={classnames({
          [styles.wrap]: true,
          [styles.visibleWrap]: componentBlock.visibility,
          [styles.invisibleWrap]: !componentBlock.visibility,
        })}
        onClick={() => this.setState({ expanded: !this.state.expanded })}
      >
        <GeneralComponent item={componentBlock} />
        <div className={styles.accordionButtonWrap}>
          <div style={{ position: "relative" }}>
            <button className={styles.accordion}>{_title}</button>
          </div>
          <div className={styles.accordionButtonArrowWrap}>
            {this.state.expanded ? (
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
          {this.state.expanded && (
            <div>
              {contentData.map((item) => (
                <div>
                  <p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.createMarkup(item.item),
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
    );
  }
}

export default AlgorithmAccordion;
