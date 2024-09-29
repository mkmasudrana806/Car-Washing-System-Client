import React, { useRef, useState } from "react";
import {
  Button,
  Input,
  Space,
  Table,
  Tooltip,
  InputRef,
  TableColumnType,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

import { TBooking } from "../../types/bookingsType";
import { useLoadAllBookingsQuery } from "../../redux/features/bookings/bookingApi";

// data type for the table
interface DataType {
  key: React.Key;
  serviceName: string;
  servicePrice: number;
  slotStartTime: string;
  slotEndTime: string;
  userName: string;
  email: string;
  date: string;
}

type DataIndex = keyof DataType;

// ----------- bookings component
const UserBookings = () => {
  // redux
  const { data: bookings } = useLoadAllBookingsQuery({});
  // react
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  // get the media query breakpoints
  const isMobileView = useMediaQuery({ query: "(max-width: 600px)" });

  console.log("bookings: ", bookings?.data);
  // data sources
  const dataSource: DataType[] = bookings?.data?.map((booking: TBooking) => ({
    key: booking._id,
    serviceName: booking.service.name,
    servicePrice: booking.service.price,
    slotStartTime: booking.slot.startTime,
    slotEndTime: booking.slot.endTime,
    userName: `${booking.user.name.firstName} ${booking.user.name.middleName} ${booking.user.name.lastName}`,
    email: booking.user.email,
    date: new Date(booking.date).toLocaleString(),
  }));

  // ---------- handle search
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // ----------- handle reset search
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  // ----------- handle get column search props
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  return (
    <Table
      style={{ transition: "0.3s", marginTop: "16px" }}
      dataSource={dataSource}
      size={isMobileView ? "small" : "large"}
      scroll={{ x: 576, y: 500 }}
      pagination={{ pageSize: 10 }}
    >
      {/* service name  */}
      <Table.Column
        title="Service Name"
        dataIndex="serviceName"
        key="serviceName"
        width={80}
        ellipsis={{
          showTitle: false,
        }}
        {...getColumnSearchProps("serviceName")}
        render={(name) => (
          <Tooltip placement="topLeft" title={name}>
            {name}
          </Tooltip>
        )}
      />
      {/* service slot  */}
      <Table.Column
        title="Time Slot"
        key="slot"
        render={(_, record: DataType) =>
          `${record.slotStartTime}-${record.slotEndTime}`
        }
        width={70}
      />
      {/* service price  */}
      <Table.Column
        title="Service Price"
        dataIndex="servicePrice"
        key="servicePrice"
        width={50}
        sorter={(a, b) => a.price - b.price}
        sortDirections={["descend", "ascend"]}
        render={(price) => <p>${price}</p>}
      />
      {/* user email  */}
      <Table.Column
        title="Email"
        dataIndex="email"
        key="email"
        width={80}
        {...getColumnSearchProps("email")}
      />

      {/* booking date  */}
      <Table.Column title="Date" dataIndex="date" key="date" width={100} />
    </Table>
  );
};

export default UserBookings;
