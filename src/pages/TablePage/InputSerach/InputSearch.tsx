import * as React from "react";
import {
  Button,
  Combobox,
  makeStyles,
  Option,
  tokens,
  useId,
} from "@fluentui/react-components";
import type { ComboboxProps } from "@fluentui/react-components";
import { Dismiss12Regular } from "@fluentui/react-icons";
import { GlobalContext } from "../../../Context/GlobalContext";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "2px",
    maxWidth: "400px",
  },
  tagsList: {
    listStyleType: "none",
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: "flex",
    gridGap: tokens.spacingHorizontalXXS,
    flexWrap:"wrap"
  },
  Combobox:{
    minWidth:"100%",
    flexWrap:"wrap",
  }
});

interface PropsType {
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<any>>;
}

export const MultiselectWithTags = (props: PropsType) => {
  const { selectedOptions, setSelectedOptions } = props;
  const { category } = React.useContext(GlobalContext);
  const comboId = useId("combo-multi");
  const selectedListId = `${comboId}-selection`;

  const selectedListRef = React.useRef<HTMLUListElement>(null);
  const comboboxInputRef = React.useRef<HTMLInputElement>(null);

  const options = category && category.ingredients;
  const styles = useStyles();

  // Track the input text for filtering
  const [filterText, setFilterText] = React.useState("");

  const onSelect: ComboboxProps["onOptionSelect"] = (_, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  const onTagClick = (option: string, index: number) => {
    setSelectedOptions(selectedOptions.filter((o) => o !== option));

    const indexToFocus = index === 0 ? 1 : index - 1;
    const optionToFocus = selectedListRef.current?.querySelector(
      `#${comboId}-remove-${indexToFocus}`
    );
    if (optionToFocus) {
      (optionToFocus as HTMLButtonElement).focus();
    } else {
      comboboxInputRef.current?.focus();
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filteredOptions = options&&options.filter((option: string) =>
    option.toLowerCase().includes(filterText.toLowerCase())
  );

  const labelledBy = selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;

  return (
    <div className={styles.root}>
      {selectedOptions.length ? (
        <ul id={selectedListId} className={styles.tagsList} ref={selectedListRef}>
          <span id={`${comboId}-remove`} hidden>
            Remove
          </span>
          {selectedOptions.map((option, i) => (
            <li key={option}>
              <Button
                size="small"
                shape="circular"
                appearance="primary"
                icon={<Dismiss12Regular />}
                iconPosition="after"
                onClick={() => onTagClick(option, i)}
                id={`${comboId}-remove-${i}`}
                aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
              >
                {option}
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
      <Combobox
      className={styles.Combobox}
        aria-labelledby={labelledBy}
        multiselect={true}
        placeholder="Select ingredients"
        selectedOptions={selectedOptions} 
        onOptionSelect={onSelect}
        ref={comboboxInputRef}
        onChange={handleFilterChange}
      >
        {filteredOptions&&filteredOptions.map((option: string) => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </div>
  );
};
