import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  Input,
  Space,
  Table,
  Tooltip,
  message,
  Popconfirm,
  InputRef,
  TableColumnType,
  Modal,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import {
  EditFilled,
  DeleteFilled,
  EyeFilled,
  SearchOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import {
  useDeleteServiceMutation,
  useLoadAllServicesQuery,
} from "../../redux/features/services/serviceApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearEditServiceData,
  clearShowServiceData,
  deleteServiceFromStore,
  loadAllServices,
  setEditServiceData,
  setShowServiceData,
} from "../../redux/features/services/ServiceSlice";
import LoadingComponent from "../../components/messages/LoadingComponent";
import ErrorComponent from "../../components/messages/ErrorComponent";

import { TService } from "../../types/serviceTypes";
import ShowServiceDetails from "./ShowServiceDetails";
import AddService from "./AddService";

// data type for the table
interface DataType {
  key: React.Key;
  name: string;
  price: number;
  duration: string;
}
type DataIndex = keyof DataType;

// ----------- service component page
const ServiceManagement = () => {
  // redux
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.services.items);
  const { data, isLoading, isError } = useLoadAllServicesQuery({});
  const [deleteService] = useDeleteServiceMutation();
  const editServiceData = useAppSelector(
    (state) => state.services.editServiceData
  );

  // react
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // ----------- open and close show service details
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
    dispatch(clearShowServiceData());
  };

  // ---------- get the media query breakpoints
  const isMobileView = useMediaQuery({ query: "(max-width: 600px)" });

  // ---------- load all services
  useEffect(() => {
    if (data?.data && data?.data.length > 0)
      dispatch(loadAllServices(data?.data));
  }, [dispatch, data?.data]);

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    return <ErrorComponent />;
  }

  // -------------- data sources for the table
  const dataSource = services
    ?.filter((service: TService) => !service.isDeleted)
    .map((service: TService) => ({
      key: service._id,
      ...service,
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

  // ------------ handle update service
  const handleUpdateService = (service: TService) => {
    dispatch(setEditServiceData(service));
    setIsModalOpen(true);
  };

  // ------------- handle delete service
  const handleDeleteService = async (_id: string) => {
    const result = await deleteService(_id);
    if (result?.data?.success) {
      dispatch(deleteServiceFromStore(_id));
      message.success("Service deleted successfully");
    }
  };

  // ------------- handle show service details
  const handleShowService = (service: TService) => {
    setOpen(true);
    dispatch(setShowServiceData(service));
  };

  // ------ handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearEditServiceData());
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={showModal}
          style={{ background: "#fa7760ce" }}
          type="primary"
        >
          Create Service
        </Button>
        <h1 style={{ fontSize: "1.2rem" }}>
          Total services: {services?.length}
        </h1>
      </div>
      <Table
        style={{ transition: "0.3s", marginTop: "16px" }}
        dataSource={dataSource}
        size={isMobileView ? "small" : "large"}
        scroll={{ x: 576, y: 500 }}
        pagination={{ pageSize: 10 }}
      >
        <Table.Column
          title="Name"
          dataIndex="name"
          key="name"
          width={200}
          ellipsis={{
            showTitle: false,
          }}
          {...getColumnSearchProps("name")}
          render={(name) => (
            <Tooltip placement="topLeft" title={name}>
              {name}
            </Tooltip>
          )}
        />
        <Table.Column
          title="Price"
          dataIndex="price"
          key="price"
          width={80}
          sorter={(a, b) => a.price - b.price}
          sortDirections={["descend", "ascend"]}
          render={(price) => <p>${price} </p>}
        />
        <Table.Column
          title="Duration"
          dataIndex="duration"
          key="duration"
          width={100}
          ellipsis={{
            showTitle: false,
          }}
          sorter={(a, b) => Number(a.duration) - Number(b.duration)}
          sortDirections={["descend", "ascend"]}
          render={(duration) => (
            <Tooltip placement="topLeft" title={duration}>
              {duration} min
            </Tooltip>
          )}
        />
        <Table.Column
          title="Actions"
          key="actions"
          width={120}
          render={(_, record: TService) => (
            <ActionButtons>
              <Tooltip title="Update service">
                <Avatar
                  icon={<EditFilled />}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleUpdateService(record)}
                />
              </Tooltip>

              <Tooltip title="Delete service">
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => handleDeleteService(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Avatar
                    icon={<DeleteFilled />}
                    style={{ cursor: "pointer" }}
                  />
                </Popconfirm>
              </Tooltip>
              <Tooltip title="View service">
                <Avatar
                  icon={<EyeFilled />}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleShowService(record)}
                />
              </Tooltip>
            </ActionButtons>
          )}
        />
      </Table>
      {/* show service details  */}
      <Drawer
        size="large"
        title="Service Details"
        onClose={onClose}
        open={open}
      >
        <ShowServiceDetails />
      </Drawer>  

      {/* create service modal  */}
      <Modal
        onCancel={handleCloseModal}
        footer={null}
        title={
          editServiceData ? "Update Service Details" : "Create a new Service "
        }
        open={isModalOpen}
      >
        <AddService handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default ServiceManagement;

// services actions buttons
const ActionButtons = styled(Space)`
  .ant-avatar {
    cursor: pointer;
    min-width: 32px;
    background-color: #ff917d;
    &:hover {
      background-color: #fa7760;
    }
  }
`;
