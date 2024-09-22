import styled from "styled-components";
import { Slider, Checkbox, Input, Row, Col, Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  addCategoryFilters,
  removeCategoryFilters,
  resetFilters,
  setPriceFilterRange,
} from "../../redux/features/services/filterSlice";

import { useLoadAllServicesQuery } from "../../redux/features/services/serviceApi";
import { TService } from "../../types/serviceTypes";

const ServiceFiltersSidebar = () => {
  // redux
  const dispatch = useAppDispatch();
  const { priceRange, selectedCategories } = useAppSelector(
    (state: RootState) => state.filters
  );
  const { data: services } = useLoadAllServicesQuery({});
  // make unique categories string array
  const uniqueCategories = [
    ...new Set(services?.data?.map((service: TService) => service.category)),
  ] as string[];

  // Handle when input changes
  const handleInputChange = (type: "start" | "end", value: number) => {
    if (type === "start") {
      dispatch(
        setPriceFilterRange([Math.min(value, priceRange[1]), priceRange[1]])
      ); // Ensure start is less than end
    } else {
      dispatch(
        setPriceFilterRange([priceRange[0], Math.max(value, priceRange[0])])
      ); // Ensure end is greater than start
    }
  };

  // Handle input blur event (like pressing "Enter")
  const handleInputBlur = (type: "start" | "end", value: number) => {
    handleInputChange(type, value);
  };

  const handleSliderChange = (newRange: number[]) => {
    dispatch(setPriceFilterRange([newRange[0], newRange[1]]));
  };

  // Update category filter
  const handleCategoryChange = (category: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(addCategoryFilters(category));
    } else {
      dispatch(removeCategoryFilters(category));
    }
  };

  // handle clear all filters
  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <FiltersSide>
      <Button
        style={{ width: "100%" }}
        icon={<ClearOutlined />}
        iconPosition="end"
        onClick={handleClearFilters}
      >
        Clear Filters
      </Button>
      {/* price filter  */}
      <div className="price-filter">
        <h1 style={{ fontSize: "1.5rem", marginTop: "16px" }}>Price</h1>
        <hr />
        <Slider
          range
          value={priceRange}
          min={0}
          max={10000}
          onChange={handleSliderChange}
        />
        <Row gutter={16}>
          <Col span={12}>
            <Input
              type="number"
              min={0}
              value={priceRange[0]}
              onChange={(e) =>
                handleInputChange("start", Number(e.target.value))
              }
              onBlur={(e) => handleInputBlur("start", Number(e.target.value))}
            />
          </Col>
          <Col span={12}>
            <Input
              type="number"
              min={0}
              value={priceRange[1]}
              onChange={(e) => handleInputChange("end", Number(e.target.value))}
              onBlur={(e) => handleInputBlur("end", Number(e.target.value))}
            />
          </Col>
        </Row>
      </div>

      {/* category filters  */}
      <h1 style={{ fontSize: "1.5rem", marginTop: "32px" }}>Category</h1>
      <hr />
      <div className="category-filter">
        {uniqueCategories.map((category: string, index) => (
          <Checkbox
            key={index}
            checked={selectedCategories.includes(category)}
            onChange={(e) => handleCategoryChange(category, e.target.checked)}
          >
            {category}
          </Checkbox>
        ))}
      </div>
    </FiltersSide>
  );
};

export default ServiceFiltersSidebar;

const FiltersSide = styled.div`
  .category-filter {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  hr {
    margin: 8px 0px;
    height: 1px;
    background-color: #dbdbdbb3;
    border: none;
  }
`;
