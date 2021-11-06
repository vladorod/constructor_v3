import React from "react";
import { GetComponent } from "../algorithmsSettings/algorithmsSettings";
import { Spin, Space } from "antd";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/helpers/useStore";

class AlgorithmsDetails extends React.Component {
  state = {
    data: [],
    algorithmId: "",
    map: [],
    tempDataResult: [],
    elementArray: [],
  };

  changeData = (elementId, value, valueId, item, componentBlock) => {
    let data = this.props.data;
    let tempDataResult = this.state.tempDataResult;

    tempDataResult = this.tempDataResultHandler(elementId);

    data = this.changeCheckedData(
      elementId,
      value,
      valueId,
      item,
      componentBlock,
      data
    );

    data = this.hideElements(this.getIndex(elementId), data);
    data = this.changeStatusData(
      data,
      item,
      this.state.tempDataResult,
      valueId,
      elementId,
      componentBlock
    );
    data = this.checkElementsRulesStatus(this.getIndex(elementId), data);
    data = this.checkRules(
      data,
      item,
      this.state.tempDataResult,
      valueId,
      elementId
    );
    data = this.changeLogicBlockStatus(data, this.state.tempDataResult);
    this.setState({ tempDataResult });

    // this.props.updateAllDataArray(data);
  };

  getMap = (arr = []) => {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].logicBlock.length; j++) {
        for (let k = 0; k < arr[i].logicBlock[j].rules.length; k++) {
          result.push({
            index: i,
            elem: [arr[i].logicBlock[j].rules[k].elementId],
          });
        }
      }
    }
    for (let i = 0; i < result.length - 1; i++) {
      if (result[i].index === result[i + 1].index) {
        result[i].elem = [result[i].elem[0], result[i + 1].elem[0]];
        result.splice(i + 1, 1);
      }
    }
    this.setState({ map: result });
  };

  componentDidMount() {
    this.getMap(this.props.data);
  }

  refresh() {
    this.getMap(this.props.data);
  }

  tempDataResultHandler = (elementId) => {
    let tempData = this.state.map.map((item) => {
      for (let i = 0; i < item.elem.length; i++) {
        if (item.elem[i] === elementId || item.elem[i] === 0) {
          return item.index;
        }
      }
    });
    let tempDataResult = [];
    for (let i = 0; i < tempData.length; i++) {
      if (tempData[i] !== undefined && tempData[i + 1] !== tempData[i]) {
        tempDataResult.push(tempData[i]);
      }
    }
    return tempDataResult;
  };

  changeCheckedData = (
    elementId,
    value,
    valueId,
    item,
    componentBlock,
    data
  ) => {
    const changeData = [];
    const c_data = _.cloneDeep(data);

    if (componentBlock.type === "radiobutton") {
      c_data.forEach((component) => {
        if (component.id === elementId) {
          component.content.value.forEach((itemValue) => {
            if (itemValue.key === valueId && itemValue.checked !== true) {
              itemValue.checked = value;
            } else if (itemValue.checked !== false) {
              itemValue.checked = !value;
            }
          });
        }
      });
    } else {
      c_data.forEach((component) => {
        if (component.id === elementId) {
          for (let i = 0; i < component.content.value.length; i++) {
            if (component.content.value[i].key === valueId) {
              component.content.value[i].checked = value;
            }
          }
        }
      });
    }
    return c_data;
  };

  getIndex = (elementID) => {
    for (let i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i].id === elementID) {
        return i;
      }
    }
  };

  getValue = (index, valueId, moreOrLessValue, moreOrLess) => {
    if (moreOrLess === null) {
      let val = this.props.data[index].content.value;
      let result = false;
      for (let i = 0; i < val.length; i++) {
        // eslint-disable-next-line no-unused-expressions
        val[i].key === valueId ? (result = val[i].checked === true) : false;
      }
      return result;
    } else if (moreOrLess === "more") {
      let val = this.props.data[index].content.value;
      let result = false;
      for (let i = 0; i < val.length; i++) {
        // eslint-disable-next-line no-unused-expressions
        parseInt(val[i].item) >= parseInt(moreOrLessValue) && val[i].checked
          ? (result = true)
          : false;
      }
      return result;
    } else {
      let val = this.props.data[index].content.value;
      let result = false;
      for (let i = 0; i < val.length; i++) {
        // eslint-disable-next-line no-unused-expressions
        parseInt(val[i].item) <= parseInt(moreOrLessValue) && val[i].checked
          ? (result = true)
          : false;
      }
      return result;
    }
  };

  checkBlockRules = (rule) => {
    let status = null;
    switch (rule.condition) {
      case "match":
        status = this.getValue(
          this.getIndex(rule.elementId),
          rule.valueId,
          null,
          null
        );
        return status;
      case "does not match":
        status = !this.getValue(
          this.getIndex(rule.elementId),
          rule.valueId,
          null,
          null
        );
        return status;
      case "match or more":
        status = this.getValue(
          this.getIndex(rule.elementId),
          rule.valueId,
          rule.text,
          "more"
        );
        return status;
      case "match or less":
        status = this.getValue(
          this.getIndex(rule.elementId),
          rule.valueId,
          rule.text,
          "less"
        );

        return status;
    }
  };

  changeStatusData = (data, item, tempDataResult, valueId, elementId) => {
    for (let j = 0; j < tempDataResult.length; j++) {
      for (let i = 0; i < data[tempDataResult[j]].logicBlock.length; i++) {
        if (data[tempDataResult[j]].logicBlock[i].rules.length > 0) {
          for (
            let k = 0;
            k < data[tempDataResult[j]].logicBlock[i].rules.length;
            k++
          ) {
            const status = this.checkBlockRules(
              data[tempDataResult[j]].logicBlock[i].rules[k]
            );
            data[tempDataResult[j]].logicBlock[i].rules[k].status = status;
          }
        }
      }
    }
    return data;
  };

  switchRulesMatchType = (block, item) => {
    let status = null;
    switch (block.matchType) {
      case "all":
        status = block.rules.every((item) => item.status === true);
        return status;
      case "any":
        status = block.rules.some((item) => item.status === true);
        return status;
      case "none":
        status = block.rules.every((item) => item.status === false);
        return status;
    }
  };

  checkRules = (data, item, tempDataResult, valueId, elementId) => {
    for (let i = 0; i < tempDataResult.length; i++) {
      for (let j = 0; j < data[tempDataResult[i]].logicBlock.length; j++) {
        for (
          let z = 0;
          z < data[tempDataResult[i]].logicBlock[j].rules.length;
          z++
        ) {
          if (
            data[tempDataResult[i]].logicBlock[j].rules[z].elementId ===
            elementId
          ) {
            data[tempDataResult[i]].logicBlock[j].status =
              this.switchRulesMatchType(
                data[tempDataResult[i]].logicBlock[j],
                item
              );
          }
        }
      }
    }
    return data;
  };

  changeLogicBlockStatus = (data, tempDataResult) => {
    for (let j = 0; j < tempDataResult.length; j++) {
      data[tempDataResult[j]].status = this.checkLogicBlock(tempDataResult[j]);
      data[tempDataResult[j]].visibility = data[tempDataResult[j]].status;
    }
    return data;
  };

  checkLogicBlock = (element) => {
    const tData = this.props.data;
    const and = [],
      or = [];

    if (tData[element].logicBlock.length > 1) {
      for (let i = 0; i < tData[element].logicBlock.length; i++) {
        switch (tData[element].logicBlock[i].behavior) {
          case "and":
            and.push(
              tData[element].logicBlock[+i].status === true &&
                tData[element].logicBlock[+i + 1].status === true
            );
            break;
          case "or":
            if (and.length > 0 && and.includes(true)) {
              or.push(true);
            } else {
              or.push(tData[element].logicBlock[i].status);
              or.push(tData[element].logicBlock[i + 1].status);
            }
        }
      }
      return or.find((item) => item === true);

      for (let s = 0; s < and.length; s++) {
        if (and[s] !== true) return false;
      }
      return true;
    } else {
      return tData[element].logicBlock[0].status;
    }
  };

  hiddenElementsStatusHandler = (tData, index) => {
    if (tData[index + 2] !== undefined) {
      for (let j = 0; j < tData[index + 2].logicBlock.length; j++) {
        for (let k = 0; k < tData[index + 2].logicBlock[j].rules.length; k++) {
          tData[index + 2].logicBlock[j].rules[k].status = false;
        }
      }
    }
    if (tData[index + 3] !== undefined) {
      for (let j = 0; j < tData[index + 3].logicBlock.length; j++) {
        tData[index + 3].logicBlock[j].status = false;
      }
    }
    return tData;
  };

  hideElements = (index, data) => {
    let tData = data;
    for (let i = index + 1; i < tData.length; i++) {
      for (let j = 0; j < tData[i].logicBlock.length; j++) {
        this.switchElementsRules(tData[i].logicBlock[j]);
      }
      tData[i].visibility = false;
      tData[i].status = false;
      if (tData[i].content.value !== undefined) {
        for (let j = 0; j < tData[i].content.value.length; j++) {
          tData[i].content.value[j].checked = false;
        }
      }
    }
    return this.hiddenElementsStatusHandler(tData, index);
  };

  switchElementsRules = (logicBlock) => {
    switch (logicBlock.matchType) {
      case "all":
        logicBlock.status = logicBlock.rules.every(
          (item) => item.status === true
        );
        break;
      case "any":
        logicBlock.status = logicBlock.rules.some(
          (item) => item.status === true
        );
        break;
      case "none":
        logicBlock.status = logicBlock.rules.every(
          (item) => item.status === false
        );
        break;
    }
    return logicBlock;
  };

  checkElementsRulesStatus = (element, data) => {
    let tData = data;
    let elemArr = this.state.map[element]
      ? this.state.map[element].elem
      : this.state.map[this.state.map.length - 1].elem;
    let elArr = [];

    for (let i = 0; i < elemArr.length; i++) {
      (elemArr[i] !== undefined) & (elemArr[i] !== 0) &&
        elArr.push(this.getIndex(elemArr[i]));
    }

    this.state.map
      .filter((el) => el.elem[0] === 0)
      .map((el) => elArr.push(el.index));
    for (let j = 0; j < elArr.length; j++) {
      for (let k = 0; k < tData[elArr[j]].logicBlock.length; k++) {
        tData[elArr[j]].logicBlock[k] = this.switchElementsRules(
          tData[elArr[j]].logicBlock[k]
        );
      }
    }

    return tData;
  };

  onClickMultiSelectButton = (
    elementId,
    checkedValue,
    valueId,
    item,
    componentBlock
  ) => {
    this.changeData(elementId, checkedValue, valueId, item, componentBlock);
  };

  render() {
    const { data } = this.props;

    return (
      <div>
        <div>
          {data.map((item) => (
            <div key={item.id}>
              {
                <GetComponent
                  item={item}
                  onClickMultiSelectButton={this.onClickMultiSelectButton}
                  changeData={this.changeData}
                />
              }
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const AlgorithmsRender = observer(() => {
  const {
    data: {
      algorithms: { AlgorithmBlocks, createElement },
    },
  } = useStore();

  return (
    <div>
      <div onClick={() => createElement({ type: "checkbox" })}>add ===> </div>
      <div>
        {AlgorithmBlocks.map((item, index) => (
          <div key={item.id}>
            {
              <GetComponent
                item={item}
                index={index}
                onClickMultiSelectButton={() => {}}
                changeData={() => {}}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
});

export default AlgorithmsRender;
