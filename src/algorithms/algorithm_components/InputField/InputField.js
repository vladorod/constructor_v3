import React from "react";
import classnames from "classnames";
import styles from "./InputField.module.css";
import { GeneralComponent } from "../../algorithmsSettings/algorithmsSettings";

const InputField = ({ componentBlock, placeholder }) => (
  <div
    className={classnames({
      [styles.wrap]: componentBlock.visibility,
      [styles.visibility]: !componentBlock.visibility,
    })}
  >
    <GeneralComponent item={componentBlock} />
    {/*<TextInput*/}
    {/*  placeholder={placeholder}*/}
    {/*/>*/}
  </div>
);

// const styles = StyleSheet.create({
//   blockWrap: {
//     backgroundColor: '#f1f1f1',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 20,
//   },
// });

export default InputField;
