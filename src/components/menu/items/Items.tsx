import React from "react";
import { useState } from "react";
import { bgState, itemState } from "../../../store/store";
import { useRecoilState } from "recoil";
import { itemParts } from "../../../constants/itemParts";
import ItemToggleButton from "./ItemToggleButton";

const Items = () => {
  const [part, setPart] = useState("머리");
  const [items, setItems] = useRecoilState(itemState);
  const [bg, setBg] = useRecoilState(bgState);

  const changePartHandler = (changes: string) => {
    setPart(changes);
  };

  const toggleItemHandler = (item: string, itemUrl: string) => {
    if (items.find((i) => i.item === item)) {
      setItems((prev) => prev.filter((i) => i.item !== item));
    } else {
      setItems((prev) => [...prev, { item: item, itemUrl: itemUrl }]);
    }
  };
  return (
    <section className="flex w-full h-full border-t border-base-300">
      <ul className="flex h-full gap-1 p-2 border-r shrink-0 menu menu-vertical bg-base-100 ">
        {itemParts.map((itemPart) => (
          <li key={itemPart}>
            <a
              onClick={changePartHandler.bind(this, itemPart)}
              className={part == itemPart ? "px-10 active" : "px-10 "}
            >
              {itemPart}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap h-full gap-2 p-2 grow-0 ">
        <ItemToggleButton part={part} onClick={toggleItemHandler} />
      </div>
    </section>
  );
};

export default Items;
