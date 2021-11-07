import React from "react";
import classnames from "classnames";
import styles from "./MultiSelect.module.css";
import { GeneralComponent } from "../../algorithmsSettings/algorithmsSettings";

class MultiSelect extends React.Component {
  state = {
    selected: new Map(),
  };

  onSelect = (valueId, item) => {
    const newSelected = new Map(this.state.selected);
    newSelected.set(valueId, !this.state.selected.get(valueId));
    this.setState({ selected: newSelected });

    this.props.onClickMultiSelectButton(
      this.props.id,
      !this.state.selected.get(item.key),
      valueId,
      item,
      this.props.componentBlock
    );
    // this.props.changeData(this.props.id, !this.state.selected.get(item.key), valueId, item, this.props.componentBlock)
  };

  render() {
    const { componentBlock, contentData, id, changeData, title, index } =
      this.props;

    return (
      <div
        className={classnames({
          [styles.wrap]: true,
          [styles.visibleWrap]: componentBlock.visibility,
          [styles.invisibleWrap]: !componentBlock.visibility,
        })}
      >
        <GeneralComponent index={index} item={componentBlock} />
        <p style={styles.itemTitle}>{title}</p>

        {contentData.map((item) => (
          <div
            key={item.key}
            className={classnames({
              [styles.radioButtonWrap]: true,
              [styles.radioButtonWrapChecked]: !!this.state.selected.get(
                item.key
              ),
              [styles.radioButtonWrapUnChecked]: this.state.selected.get(
                item.key
              ),
            })}
            onClick={() => this.onSelect(item.key, item)}
          >
            <label
              htmlFor={item.item}
              className={
                styles.radioButtonText
                // classnames({
                // [styles.radioButtonText]:!!this.state.selected.get(item.key),
                // [styles.notSelectedRadioButtonText]:this.state.selected.get(item.key)
                // })
              }
            >
              {item.item}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

// const styles = StyleSheet.create({
//   blockWrap: {
//     backgroundColor: '#f1f1f1',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 20,
//   },
//   itemWrap: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#ececec',
//     borderRadius: 20,
//     padding: 15,
//     margin: 5,
//   },
//   selectedItemWrap: {
//     backgroundColor: '#d72f2a'
//   },
//   notSelectedItemWrap: {
//     backgroundColor:'#fff'
//   },
//   itemTitle: {
//     textAlign: 'center',
//     fontFamily: 'Helvetica_Neue_Bold',
//     fontSize: 12,
//     fontWeight: '400',
//     lineHeight: 16,
//   },
//   itemText: {
//     textAlign: 'center',
//     fontFamily: 'Helvetica_Neue_Light',
//     fontSize: 12,
//     fontWeight: '400',
//     lineHeight: 16,
//   },
//   selectedItemText: {
//     color: 'white'
//   },
//   notSelectedItemText: {
//     color:'#000'
//   },
//
//
// });

export default MultiSelect;
