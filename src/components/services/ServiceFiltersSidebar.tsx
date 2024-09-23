import styled from "styled-components";
import { Slider, Input, Row, Col, Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  resetFilters,
  setPriceFilterRange,
} from "../../redux/features/services/filterSlice";

const ServiceFiltersSidebar = () => {
  // redux
  const dispatch = useAppDispatch();
  const { priceRange } = useAppSelector((state: RootState) => state.filters);

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
