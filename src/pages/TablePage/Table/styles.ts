import styled from "@emotion/styled";
import { DataGrid, DataGridCell, DataGridRow, Dropdown, Spinner, TableHeaderCell, Title3 } from "@fluentui/react-components";

export const styles = {
  outerContainer: styled("div")`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 70px);
    width: 100%;
    gap: 1.5rem;
    padding: 1rem;
    background-color: #F4F1EA;

    @media (min-width: 768px) {
      flex-direction: row;
      padding: 2rem;
    }
  `,

  noDataContainer: styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    font-size: 1.2rem;
    color: #64748b;
  `,

  loadingComp: styled(Spinner)`
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  leftContainer: styled("div")`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    
    @media (min-width: 768px) {
      width: 300px;
      min-width: 300px;
      height: fit-content;
      position: sticky;
      top: 2rem;
    }
  `,

  righContainer: styled("div")`
    flex: 1;
    width: 100%;
    overflow-x: auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    padding: 1.5rem;
  `,

  Dropdown: styled(Dropdown)`
    width: 100%;
    .fui-Input__wrapper {
      border-radius: 8px;
      transition: all 0.2s;
      
      &:hover {
        box-shadow: 0 0 0 2px #e2e8f0;
      }
    }
  `,

  spanTag: styled("span")`
    cursor: pointer;
    font-weight: bold;
    color: #3b82f6;
    font-size: large;
    display: flex;
    align-items: center;
     display: flex;
    gap: 0.5rem;
    border: none;
    &:hover {
      color: #2563eb;
    }
  `,

  dataGrid: styled(DataGrid)`
    min-width: 1000px;
    --grid-header-color: #f1f5f9;
    --grid-row-hover: #f8fafc;
    --grid-border: 1px solid #e2e8f0;

    .fui-TableHeaderCell {
      background-color: var(--grid-header-color);
    }

    .fui-TableRow:hover {
      background-color: var(--grid-row-hover);
    }
  `,
dataGridRow:styled(DataGridRow)`

background-color: var(--grid-header-color);`,
  paginationContainer: styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1.5rem 0;
    margin-top: 1rem;
    border-top: 1px solid #e2e8f0;
  `,

  paginationButton: styled("button")`
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background-color: #2563eb;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    &:disabled {
      background-color: #cbd5e1;
      cursor: not-allowed;
      box-shadow: none;
    }
  `,

  pageInfo: styled("span")`
    font-size: 0.9rem;
    color: #64748b;
    min-width: 120px;
    text-align: center;
  `,

  tableHeaderCell: styled(TableHeaderCell)`
    font-weight: 600;
    color: #1e293b;
    padding: 1rem;
   `,

  tableRow: styled(DataGridRow)`
    transition: background-color 0.2s;
    cursor: pointer;
    
    &:nth-of-type(even) {
      background-color: #f8fafc;
    }
    
    &:hover {
      background-color: #f1f5f9;
    }
  `,

  tableCell: styled(DataGridCell)`
    padding: 1rem;
    color: #475569;
    font-size: 0.9rem;
  `,

  filterTitle: styled(Title3)`
    color: #1e293b;
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  `,

  image: styled("img")`
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
    border: 1px solid #e2e8f0;
  `,
};  