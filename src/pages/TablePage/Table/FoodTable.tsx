import * as React from "react";
import {
  DataGridBody,
  DataGridHeader,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Option,
  Title3,
} from "@fluentui/react-components";
import { useSearchParams } from "react-router-dom";
import { GlobalContext } from "../../../Context/GlobalContext";
import { filterFood } from "../../../utils/API.services";
import { styles } from "./styles";
import { MultiselectWithTags } from "../InputSerach/InputSearch";
import { useNavigate } from "react-router-dom";

interface Dish {
  name: string;
  _id:string;
  ingredients: string[];
  diet: string;
  prep_time: number;
  cook_time: number;
  flavor_profile: string;
  course: string;
  state: string;
  region: string;
  img: string;
  createdBy: string | null;
}

const FoodTable: React.FC = () => {
  const [searchParams] = useSearchParams();
  const context = React.useContext(GlobalContext);
     const category=context?.category
   const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const [region, setRegion] = React.useState("");
  const [state, setState] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [flavorProfile, setFlavorProfile] = React.useState("");
  const [diet, setDiet] = React.useState("");
  const [apiDishes, setApiDishes] = React.useState<Dish[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
const navigate=useNavigate()
 
  const [sortColumn, setSortColumn] = React.useState<string>("");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  React.useEffect(() => {
    const queryString = `region=${region}&state=${state}&course=${course}&flavor_profile=${flavorProfile}&diet=${diet}&limit=10&page=${currentPage}&ingredients=${selectedOptions.toString()}`;

    const fetchData = async () => {
      try {
        const result = await filterFood({ query: queryString });
        if (result?.status === 200) {
          setApiDishes(result.data.data);
          setTotalPages(result.data.info.totalPages); 
      
        } else {
          setApiDishes([]);
          setTotalPages(1)
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchData();
  }, [region, state, course, flavorProfile, diet, selectedOptions,currentPage]);
React.useEffect(()=>{
if(searchParams.get("region")){
setRegion(searchParams.get("region")||"")
}
if(searchParams.get("state")){
  setState(searchParams.get("state")||"")
}
},[searchParams])
  const handleSort = (columnId: keyof Dish) => {
    const direction = sortColumn === columnId && sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);
    setSortColumn(columnId);
  
    const sortedData = [...apiDishes].sort((a, b) => {
      let valueA: any = a[columnId];
      let valueB: any = b[columnId];
  
        if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
  
      if (valueA < valueB) {
        return direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  
    setApiDishes(sortedData);
  };
  
  const columns: TableColumnDefinition<Dish>[] = [
    createTableColumn<Dish>({
      columnId: "name",
      renderHeaderCell: () => (
        <styles.spanTag onClick={() => handleSort("name")}>Dish Name {sortColumn === "name" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</styles.spanTag>
      ),
      renderCell: (item: Dish) => <TableCellLayout>{item.name}</TableCellLayout>,
    }),
    createTableColumn<Dish>({
      columnId: "ingredients",
      renderHeaderCell: () => (
        <styles.spanTag onClick={() => handleSort("ingredients")}>Ingredients {sortColumn === "ingredients" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</styles.spanTag>
      ),
      renderCell: (item: Dish) => <TableCellLayout>{item.ingredients?.join(", ") || "N/A"}</TableCellLayout>,
    }),
    createTableColumn<Dish>({
      columnId: "diet",
      renderHeaderCell: () => (
        <styles.spanTag onClick={() => handleSort("diet")}>Diet {sortColumn === "diet" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</styles.spanTag>
      ),
      renderCell: (item: Dish) => <TableCellLayout>{item.diet}</TableCellLayout>,
    }),
    createTableColumn<Dish>({
      columnId: "prep_time",
      renderHeaderCell: () => (
        <styles.spanTag onClick={() => handleSort("prep_time")}>Preparation Time (min) {sortColumn === "prep_time" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</styles.spanTag>
      ),
      renderCell: (item: Dish) => <TableCellLayout>{item.prep_time}</TableCellLayout>,
    }),
    createTableColumn<Dish>({
      columnId: "cook_time",
      renderHeaderCell: () => (
        <styles.spanTag onClick={() => handleSort("cook_time")}>Cooking Time (min) {sortColumn === "cook_time" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</styles.spanTag>
      ),
      renderCell: (item: Dish) => <TableCellLayout>{item.cook_time}</TableCellLayout>,
    }),
    createTableColumn<Dish>({
      columnId: "flavor_profile",
      renderHeaderCell: () => (
        <styles.spanTag onClick={() => handleSort("flavor_profile")}>Flavor Profile {sortColumn === "flavor_profile" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</styles.spanTag>
      ),
      renderCell: (item: Dish) => <TableCellLayout>{item.flavor_profile}</TableCellLayout>,
    }),
    createTableColumn<Dish>({
      columnId: "course",
      renderHeaderCell: () => (
        <styles.spanTag onClick={() => handleSort("course")}>Course {sortColumn === "course" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</styles.spanTag>
      ),
      renderCell: (item: Dish) => <TableCellLayout>{item.course}</TableCellLayout>,
    }),
    createTableColumn<Dish>({
      columnId: "state",
      renderHeaderCell: () => (
        <styles.spanTag onClick={() => handleSort("state")}>State {sortColumn === "state" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</styles.spanTag>
      ),
      renderCell: (item: Dish) => <TableCellLayout>{item.state}</TableCellLayout>,
    }),
    createTableColumn<Dish>({
      columnId: "region",
      renderHeaderCell: () => (
        <styles.spanTag onClick={() => handleSort("region")}>Region {sortColumn === "region" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</styles.spanTag>
      ),
      renderCell: (item: Dish) => <TableCellLayout>{item.region}</TableCellLayout>,
    }),
    createTableColumn<Dish>({
      columnId: "createdBy",
      renderHeaderCell: () => (
        <styles.spanTag onClick={() => handleSort("createdBy")}>Created By {sortColumn === "createdBy" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</styles.spanTag>
      ),
      renderCell: (item: Dish) => <TableCellLayout>{item.createdBy ?? "N/A"}</TableCellLayout>,
    }),
    createTableColumn<Dish>({
      columnId: "img",
      renderHeaderCell: () => "Image",
      renderCell: (item: Dish) => (
        <TableCellLayout>
          <img height={50} width={50} src={item.img} alt={item.name} />
        </TableCellLayout>
      ),
    }),
  ];
  // Pagination buttons
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <styles.outerContainer>
      <styles.leftContainer>
        <Title3>Filter Option</Title3>
             <styles.Dropdown 
        value={region}
        onOptionSelect={(_, data) => setRegion(data.optionValue as string)} placeholder="Select Region">
          <Option value="">All</Option>
          {category?.region?.map((option: string) => (
            <Option key={option} value={option}>{option}</Option>
          ))}
        </styles.Dropdown>

        <styles.Dropdown onOptionSelect={(_, data) => setState(data.optionValue as string)} placeholder="Select State">
          <Option value="">All</Option>
          {category?.state?.map((option: string) => (
            <Option key={option} value={option}>{option}</Option>
          ))}
        </styles.Dropdown>

        <styles.Dropdown onOptionSelect={(_, data) => setCourse(data.optionValue as string)} placeholder="Select Course">
          <Option value="">All</Option>
          {category?.course?.map((option: string) => (
            <Option key={option} value={option}>{option}</Option>
          ))}
        </styles.Dropdown>

        <styles.Dropdown onOptionSelect={(_, data) => setFlavorProfile(data.optionValue as string)} placeholder="Select Flavor">
          <Option value="">All</Option>
          {category?.flavor_profile?.map((option: string) => (
            <Option key={option} value={option}>{option}</Option>
          ))}
        </styles.Dropdown>

        <styles.Dropdown onOptionSelect={(_, data) => setDiet(data.optionValue as string)} placeholder="Select Diet">
          <Option value="">All</Option>
          {category?.diet?.map((option: string) => (
            <Option key={option} value={option}>{option}</Option>
          ))}
        </styles.Dropdown>

        <MultiselectWithTags setSelectedOptions={setSelectedOptions} selectedOptions={selectedOptions && selectedOptions} />
      </styles.leftContainer>

      {/* DataGrid Table Section */}
      <styles.righContainer>
        {loading ? (
          <styles.loadingComp />
        ) : apiDishes.length === 0 ? (
          <styles.noDataContainer>
            <p>No data found for the selected combination</p>
          </styles.noDataContainer>
        ) : (
          <styles.dataGrid items={apiDishes} columns={columns} getRowId={(item) => item.name} focusMode="composite">
            <DataGridHeader>
              <styles.dataGridRow>
                {({ renderHeaderCell }) => (
                  <styles.tableHeaderCell>{renderHeaderCell()}</styles.tableHeaderCell>
                )}
              </styles.dataGridRow>
            </DataGridHeader>
            <DataGridBody<Dish>>
              {({ item, rowId }) => (
                <styles.tableRow key={rowId} onClick={() => navigate(`/single-food/${item._id}`)}>
                  {({ renderCell }) => <styles.tableCell>{renderCell(item)}</styles.tableCell>}
                </styles.tableRow>
              )}
            </DataGridBody>
          </styles.dataGrid>
        )}
        {apiDishes.length !== 0 && (
          <styles.paginationContainer>
            <styles.paginationButton onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </styles.paginationButton>
            <styles.pageInfo>{`Page ${totalPages == 1 ? 1 : currentPage} of ${totalPages}`}</styles.pageInfo>
            <styles.paginationButton onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next
            </styles.paginationButton>
          </styles.paginationContainer>
        )}
      </styles.righContainer>
    </styles.outerContainer>
  );
};
export default FoodTable;
