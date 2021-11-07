import React, { useState } from "react";
import { Modal, Button, Input, Typography, AutoComplete, Select } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/helpers/useStore";
import { ECondition, EMatchType } from "../../interfaces/algorithms";

const { Title } = Typography;

const LogicDialog = observer(() => {
  const {
    data: {
      algorithms: { AlgorithmBlocks, lables, getElementById },
    },
    ui: {
      dialogStore: {
        LogicDialog: { visible, show, currentIndex },
      },
    },
  } = useStore();

  const [values, setValues] = useState([]);

  if (!(currentIndex === null)) {
    const currentAlgorithm = AlgorithmBlocks[currentIndex];
    const logicBlocks = currentAlgorithm.logicBlock;
    const conditions = Object.keys(ECondition)
      .map((type) => ({
        value: type,
      }))
      .filter((condition) => !/[0-9]/gi.test(condition.value));

    return (
      <Modal
        title="Редактирование логики"
        visible={visible}
        okText="Сохранить"
        cancelText="Отмена"
        onOk={() => show(false, null)}
        onCancel={() => show(false, null)}
      >
        <Title level={5}>Логические блоки</Title>
        {logicBlocks.map((logicBlock) => (
          <>
            <Title
              level={4}
              style={{ cursor: "pointer" }}
              onClick={() => logicBlock.addRule("match", "test", "")}
            >
              +
            </Title>
            <Title level={5}>Правила</Title>
            {logicBlock.rules.map((rule, ruleIndex) => {
              const currentElement = getElementById(rule.elementId);
              const currentValue = currentElement?.content.value.find(
                (value) => value.key === rule.valueId
              );

              return (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <AutoComplete
                    dataSource={lables}
                    onSelect={(value, option) => rule.updateElementId(value)}
                    value={currentElement?.content.title}
                    placeholder="Элемент"
                    style={{ minWidth: "30%" }}
                  />
                  <Select
                    options={conditions}
                    value={rule.condition}
                    style={{ minWidth: 150 }}
                    onChange={(value): void => {
                      rule.updateCondition(value as keyof typeof ECondition);
                    }}
                  />
                  <AutoComplete
                    options={currentElement?.content.value.map((value) => ({
                      value: value.item,
                      text: value.key,
                    }))}
                    style={{ minWidth: "30%" }}
                    placeholder="Значение"
                    onChange={(value) => {
                      rule.updateValueId(value);
                      currentValue && rule.updateText(currentValue?.item);
                    }}
                    value={currentValue?.item}
                  />
                  <Title
                    level={4}
                    style={{ cursor: "pointer", margin: "0 20px" }}
                    onClick={() => logicBlock.deleteRule(ruleIndex)}
                  >
                    -
                  </Title>
                </div>
              );
            })}
          </>
        ))}
      </Modal>
    );
  } else {
    return <></>;
  }
});

export default LogicDialog;
