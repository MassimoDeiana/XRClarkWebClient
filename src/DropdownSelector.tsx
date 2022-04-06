import React, { useState, ChangeEvent } from "react";

const DropdownSelector = (props: any) => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // console.log(event);
    props.onChange(event.target.value);
  };

  // console.log(props.items);

  return (
    <div>
      <select
        className="ui search dropdown"
        onChange={handleChange}
        defaultValue={"DEFAULT"}
        // value={selectedItem}
      >
        <option value="DEFAULT" disabled hidden>
          {props.placeholder}
        </option>
        {props.items.map((item: string, index: number) => (
          <option id="item" value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelector;
