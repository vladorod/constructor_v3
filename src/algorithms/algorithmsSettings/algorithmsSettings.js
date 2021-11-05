import React, { useState } from "react";
import { useStore } from "../../stores/helpers/useStore";

import {
  AlgorithmButton,
  InputField,
  RadioButton,
  TextBox,
  AlgorithmCheckbox,
  MultiSelect,
  AlgorithmAccordion,
} from "../algorithm_components";

import style from "./algorithmsSettings.module.css";

const Popover = ({
  children,
  content,
  top,
  zIndex = 10,
  visibility,
  onClickChildren,
}) => {
  const [visible, setVisible] = useState(false);

  const switchVisible = (e) => {
    e.stopPropagation();
    setVisible((visible) => !visible);
  };

  const active = typeof visibility === "undefined" ? visible : visibility;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <div
          className={active ? style.active : "undefined"}
          style={{
            position: "absolute",
            top: `${top ?? "-10"}px`,
            zIndex: 10,
            opacity: 0,
            transform: "translateY(100px)",
            transition: ".2s ease-in-out",
            right: "-20px",
          }}
        >
          <div
            onClick={switchVisible}
            style={{
              // transform: "translateY(-40px) translateX(-50px)",
              right: "10px",
              bottom: "-2px",
              position: "absolute",
              zIndex: zIndex,
              backgroundColor: "#D72F2A",
              padding: "5px 10px",
              borderRadius: "43px",
            }}
          >
            {content}
          </div>
          <div
            style={{
              width: 0,
              height: 0,
              position: "absolute",
              bottom: 14,
              top: "-1px",
              right: "18px",
              borderWidth: 8,
              borderStyle: "solid",
              borderColor: "#D72F2A transparent transparent transparent",
            }}
          ></div>
        </div>
        <div onClick={onClickChildren ?? switchVisible}>{children}</div>
      </div>
    </div>
  );
};

const imgStyle = {
  padding: "3px 5px",
  width: 15,
  height: 15,
};

const iconWrapper = {
  cursor: "pointer",
  display: "flex",
};

const Icon = ({ name = "Add", onElementClick, ...props }) => {
  const click = (e) => {
    console.log("onElementClick", onElementClick && "hi");
    onElementClick && e.stopPropagation();
    onElementClick && onElementClick();
  };

  const img = require(`../../assets/svg/${name}.svg`);

  return (
    <div onClick={click} style={iconWrapper} {...props}>
      <img style={imgStyle} src={img.default} />
    </div>
  );
};

export const GeneralComponent = ({ item }) => {
  const store = useStore();

  const [addedPopperVisible, setAddedPopperVisible] = useState(false);
  const [editPopperVisible, setEditPopperVisible] = useState(false);
  const [blockType, setBlockType] = useState("multiSelect");

  const onEdit = () => {
    console.log("onEdit");
  };
  const onDelete = () => {
    console.log("onDelete");
  };
  const onEditLogic = () => {
    console.log("onEditLogic");
  };
  const onAdd = (type = "Top") => {
    console.log({
      type: blockType,
      position: type.toLowerCase(),
      id: item.id,
    });
    store.data.algorithms.createElement({
      type: blockType,
      position: type.toLowerCase(),
      id: item.id,
    });
    hideAll();
  };

  const hideAll = () => {
    setAddedPopperVisible(false);
    setEditPopperVisible(false);
  };

  return (
    <div
      style={{
        width: "100%",
        justifyContent: "end",
        display: "flex",
        marginTop: 8,
      }}
    >
      <Popover
        visible
        zIndex={10}
        visibility={editPopperVisible}
        onClickChildren={() => {
          setEditPopperVisible((visible) => !visible);
        }}
        content={
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Icon name="Delete" onClick={onDelete} />
              <Icon name="Logic" onClick={onEditLogic} />
              <Icon name="Edit" onClick={onEdit} />
            </div>
            <Popover
              zIndex={11}
              visibility={addedPopperVisible}
              onClickChildren={() => {
                setAddedPopperVisible((visible) => !visible);
              }}
              content={
                <div style={{ display: "flex" }}>
                  <select
                    onChange={(e) => setBlockType(e.target.value)}
                    defaultValue={blockType}
                    style={{
                      background: "none",
                      border: 0,
                      borderRadius: 0,
                    }}
                  >
                    <option value="multiSelect">Мультивыбор</option>
                    <option value="checkbox">Чекбокс</option>
                    <option value="text">Текст</option>
                    <option value="accordion">Акардион</option>
                    <option value="button">Кнопка</option>
                  </select>
                  <Icon name="Up" onClick={() => onAdd("Top")} />
                  <Icon name="Down" onClick={() => onAdd("Bottom")} />
                </div>
              }
              top="-15"
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Icon name="Add" />
              </div>
            </Popover>
          </div>
        }
        overlay={() => <div></div>}
      >
        <Icon
          name="settings"
          onElementClick={() => setEditPopperVisible((visible) => !visible)}
        />
      </Popover>
    </div>
  );
};

export const GetComponent = ({
  item,
  changeData,
  onClickMultiSelectButton,
  navigation,
}) => {
  switch (item.type) {
    case "text":
      return (
        <TextBox
          componentBlock={item}
          contentData={item.content.value}
          title={item.content.title.replace("<a", '<a target="_blank" ')}
          navigation={navigation}
        />
      );

    case "input":
      return (
        <InputField
          componentBlock={item}
          placeholder={item.content.title.replace(/(\<(\/?[^>]+)>)/g, "")}
          navigation={navigation}
        />
      );

    case "radiobutton":
      return (
        <RadioButton
          componentBlock={item}
          contentData={item.content.value}
          id={item.id}
          changeData={changeData}
          title={item.content.title.replace(/(\<(\/?[^>]+)>)/g, "")}
          navigation={navigation}
        />
      );

    case "button":
      return (
        <AlgorithmButton
          contentData={item.content.value}
          id={item.id}
          changeData={changeData}
          componentBlock={item}
          title={item.content.title.replace(/(\<(\/?[^>]+)>)/g, "")}
          navigation={navigation}
        />
      );

    case "checkbox":
      return (
        <AlgorithmCheckbox
          componentBlock={item}
          contentData={item.content.value}
          id={item.id}
          changeData={changeData}
          title={item.content.title.replace(/(\<(\/?[^>]+)>)/g, "")}
          navigation={navigation}
        />
      );
    case "multiSelect":
      return (
        <MultiSelect
          componentBlock={item}
          contentData={item.content.value}
          onClickMultiSelectButton={onClickMultiSelectButton}
          id={item.id}
          changeData={changeData}
          title={item.content.title.replace(/(\<(\/?[^>]+)>)/g, "")}
          navigation={navigation}
        />
      );
    case "accordion":
      return (
        <AlgorithmAccordion
          componentBlock={item}
          contentData={item.content.value}
          id={item.id}
          changeData={changeData}
          title={item.content.title.replace("<a", '<a target="_blank" ')}
          navigation={navigation}
        />
      );
    default:
      return <div>ОШИБКА</div>;
  }
};
