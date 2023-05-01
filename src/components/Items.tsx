import React from "react";
import { useState } from "react";
import { itemState } from "../store/store";
import { useRecoilState } from "recoil";

const Items = () => {
  const [menu, setMenu] = useState("머리");
  const [items, setItems] = useRecoilState(itemState);

  const changeMenuHandler = (changes: string) => {
    setMenu(changes);
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
      <ul className="h-full gap-1 p-2 menu menu-vertical bg-base-100 rounded-box ">
        <li>
          <a
            onClick={changeMenuHandler.bind(this, "머리")}
            className={menu == "머리" ? "px-10 active" : "px-10 "}
          >
            머리
          </a>
        </li>
        <li>
          <a
            onClick={changeMenuHandler.bind(this, "얼굴")}
            className={menu == "얼굴" ? "px-10 active" : "px-10 "}
          >
            얼굴
          </a>
        </li>
        <li>
          <a
            onClick={changeMenuHandler.bind(this, "손")}
            className={menu == "손" ? "px-10 active" : "px-10 "}
          >
            손
          </a>
        </li>
        <li>
          <a
            onClick={changeMenuHandler.bind(this, "몸")}
            className={menu == "몸" ? "px-10 active" : "px-10 "}
          >
            몸
          </a>
        </li>
      </ul>
      <div className="border-r"></div>
      <div className="flex gap-2 p-2">
        <button
          onClick={toggleItemHandler.bind(
            this,
            "선글라스",
            "/suya_glasses.png"
          )}
          className={
            items.find((i) => i.item === "선글라스")
              ? "btn  btn-outline btn-active"
              : "btn hover:btn-ghost btn-outline"
          }
        >
          선글라스
        </button>
      </div>
    </section>
  );
};

export default Items;
