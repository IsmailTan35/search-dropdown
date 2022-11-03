import React, { useState, useRef, useEffect } from "react";
import "../../assets/style/searchabledropdown.css";

interface ISeacrhadbleDropDown {
  data?: IDataOptions[];
  other?: boolean;
  otherChange?: any;
}

interface IDataOptions {
  text: string | number;
}

const Dropdown = (props: ISeacrhadbleDropDown) => {
  const { data, other } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [show, setShow] = useState<boolean>(true);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<any>([]);
  const [otherValue, setOtherValue] = useState<any>(null);

  const handleFocus = () => {
    setShow(true);
  };

  const handleBlur = () => {
    setShow(false);
  };

  const handleClickDown = (e: any, selected?: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selected) return;
    setInputText(selected.text);
    setOtherValue(null);
    setShow(false);
    inputRef.current?.blur();
  };

  const handleClickUp = () => {
    setShow(false);
    inputRef.current?.blur();
  };

  const handleOtherClickDown = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOtherValue("");
    setShow(false);
    setInputText("Diğer");
    inputRef.current?.blur();
  };

  const handleOtherClickUp = () => {
    setShow(false);
    inputRef.current?.blur();
  };

  const handleChange = (e: any) => {
    setInputText(e.target.value);
    setSearchText(e.target.value);
  };

  const handleOtherChange = (e: any) => {
    setOtherValue(e.target.value);
  };
  useEffect(() => {
    if (inputText === "") {
      setResult(data);
    } else {
      setResult(
        data?.filter(item =>
          item.text.toString().toLocaleLowerCase("TR").includes(searchText)
        )
      );
    }
  }, [searchText, data, inputText]);

  return (
    <>
      <div className="searchableDropdown-wrapper">
        <div
          className="searchableDropdown-container"
          style={{
            position: "relative",
          }}
        >
          <div className="searchableDropdown-input-wrapper">
            <div className="searchableDropdown-input-container">
              <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
                onChange={e => {
                  handleChange(e);
                }}
                value={inputText}
              />
              <div className="searchableDropdown-input-icon">icon</div>
            </div>
          </div>
          <div
            className={`searchableDropdown-dropdown-wrapper${
              show ? " show" : ""
            }`}
          >
            <div className="searchableDropdown-dropdown-container">
              {result ? (
                result.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="searchableDropdown-dropdown-item"
                    onMouseDown={e => {
                      handleClickDown(e, item);
                    }}
                    onMouseUp={handleClickUp}
                  >
                    {item.text}
                  </div>
                ))
              ) : (
                <div className="searchableDropdown-empty-wrapper">
                  <div className="searchableDropdown-empty-container">Boş</div>
                </div>
              )}
              {other && (
                <div
                  className="searchableDropdown-dropdown-item"
                  onMouseDown={e => {
                    handleOtherClickDown(e);
                  }}
                  onMouseUp={handleOtherClickUp}
                >
                  Diğer
                </div>
              )}
            </div>
          </div>
        </div>
        {otherValue !== null && (
          <div className="searchableDropdown-other-input-wrapper">
            <div className="searchableDropdown-other-input-container">
              <input
                onChange={e => {
                  setOtherValue(e.target.value);
                  otherChange(e);
                }}
                value={otherValue}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
function otherChange(e: React.ChangeEvent<HTMLInputElement>) {
  throw new Error("Function not implemented.");
}
