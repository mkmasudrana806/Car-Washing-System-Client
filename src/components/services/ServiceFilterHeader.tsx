import { Button, Input, Select, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { TInputChangeEvent, TOnClick } from "../../types/reactTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  searchServices,
  setLimit,
  setSort,
} from "../../redux/features/services/filterSlice";

type TProps = {
  showDrawer: TOnClick;
};

const ServiceFiltersHeader = ({ showDrawer }: TProps) => {
  // redux
  const dispatch = useAppDispatch();
  const { sort, limit } = useAppSelector((state: RootState) => state.filters);

  // -------- handle Service show limits
  const handleShowServicesLimit = (value: number) => {
    dispatch(setLimit(value));
  };

  // --------- handle sort Services
  const handleSortServices = (event: string) => {
    dispatch(setSort(event));
  };

  // -------- handle search Service
  let debounceTimeout: ReturnType<typeof setTimeout>;
  const handleSearchRroduct = (event: TInputChangeEvent) => {
    const query = event.target.value;
    // Clear previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    // Set new timeout
    debounceTimeout = setTimeout(() => {
      dispatch(searchServices(query));
    }, 500); // Adjust the delay as needed
  };

  return (
    <div className="service-fitlers">
      {/* filter button  */}
      <Tooltip title="Filter Services">
        <FilterButton onClick={showDrawer} icon={<FilterOutlined />} />
      </Tooltip>
      <Input onChange={handleSearchRroduct} placeholder="Search..." />
      <Select
        defaultValue={Number(limit)}
        style={{ width: 120 }}
        onChange={handleShowServicesLimit}
        options={[
          { value: "10", label: "10" },
          { value: "20", label: "20" },
          { value: "50", label: "50" },
        ]}
      />
      <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
        <p>Sort: </p>
        <Select
          defaultValue={sort}
          value={sort}
          style={{ width: "auto" }}
          onChange={handleSortServices}
          popupMatchSelectWidth={false}
          options={[
            { value: "name", label: "Ascending(name)" },
            { value: "-name", label: "Descending(name)" },
          ]}
        />
      </div>
    </div>
  );
};

export default ServiceFiltersHeader;

// filter button show when mobile devices
const FilterButton = styled(Button)`
  min-width: 32px;
  display: none;
  @media screen and (max-width: 1000px) {
    display: inline-block;
  }
`;
