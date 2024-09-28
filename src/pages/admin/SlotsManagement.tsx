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
  Tag,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { DeleteFilled, EyeFilled, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import {
  useDeleteSlotMutation,
  useLoadAllSlotsQuery,
  useToggleSlotStatusMutation,
} from "../../redux/features/slots/slotApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearEditSlotData,
  clearShowSlotData,
  deleteSlotFromStore,
  loadAllSlots,
  setShowSlotData,
} from "../../redux/features/slots/slotSlice";
import LoadingComponent from "../../components/messages/LoadingComponent";
import ErrorComponent from "../../components/messages/ErrorComponent";
import { TSlot } from "../../types/slotTypes";
import ShowSlotDetails from "./ShowSlotDetails";
import AddSlot from "./AddSlot";
import dayjs from "dayjs";

// data type for the table
interface DataType {
  key: React.Key;
  serviceName: string;
  slotStartTime: string;
  slotEndTime: string;
  date: string;
  status: string;
}

type DataIndex = keyof DataType;

// ----------- slot component page
const SlotsManagement = () => {
  const fields = "date,startTime,endTime,isBooked,service._id,service.name";

  // redux
  const dispatch = useAppDispatch();
  const slots = useAppSelector((state) => state.slots.items);
  const { data, isLoading, isError } = useLoadAllSlotsQuery({ fields });
  const [deleteSlot] = useDeleteSlotMutation();
  const [toggleSlotStatus] = useToggleSlotStatusMutation();
  const editSlotData = useAppSelector((state) => state.slots.editSlotData);

  // react
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // ----------- open and close show slot details
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
    dispatch(clearShowSlotData());
  };

  // ---------- get the media query breakpoints
  const isMobileView = useMediaQuery({ query: "(max-width: 600px)" });

  // ---------- load all slots
  useEffect(() => {
    if (data?.data && data?.data.length > 0) dispatch(loadAllSlots(data?.data));
  }, [dispatch, data?.data]);

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    return <ErrorComponent />;
  }

  // ----------- data sources for slots table
  const dataSource: DataType[] = slots.map((slot) => ({
    key: slot._id,
    serviceName: slot.service.name,
    slotStartTime: slot.startTime,
    slotEndTime: slot.endTime,
    status: slot.isBooked,
    date: dayjs(slot.date).format("YYYY-MM-DD"),
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

  // // ------------ handle update slot
  // const handleUpdateSlot = (slot: TSlot) => {
  //   if (slot.status === "booked") {
  //     showNotification(
  //       "error",
  //       "Slot updating not allowed",
  //       "As this slot is already booked, so you can not update this slot"
  //     );
  //   } else {
  //     dispatch(setEditSlotData(slot));
  //     setIsModalOpen(true);
  //   }
  // };

  // ------------- handle delete slot
  const handleDeleteSlot = async (slot: TSlot) => {
    if (slot.status === "booked") {
      message.error("Slot is booked, delete not allowed");
    } else {
      const result = await deleteSlot(slot.key);
      console.log("after delete slot", result);
      if (result?.data?.success) {
        dispatch(deleteSlotFromStore(slot.key));
        message.success("Slot deleted successfully");
      }
    }
  };

  // ------------- handle show slot details
  const handleShowSlot = (slot: TSlot) => {
    console.log("show slot: ", slot);
    setOpen(true);
    dispatch(setShowSlotData(slot));
  };

  // ------ handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearEditSlotData());
  };

  // ------------ toggle slot status
  const toggleSlotStatusHandler = async (id: string) => {
    const result: any = await toggleSlotStatus(id);
    if (result?.data) {
      message.success(result.data?.message);
    } else {
      message.error(result.error?.data?.message);
    }
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
          Create Slot
        </Button>
        <h1 style={{ fontSize: "1.2rem" }}>Total slots: {slots?.length}</h1>
      </div>
      <Table
        style={{ transition: "0.3s", marginTop: "16px" }}
        dataSource={dataSource}
        size={isMobileView ? "small" : "large"}
        scroll={{ x: 576, y: 380 }}
        pagination={{ pageSize: 10 }}
      >
        {/* service name  */}
        <Table.Column
          title="Service Name"
          dataIndex="serviceName"
          key="serviceName"
          width={200}
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
        {/* time slot  */}

        <Table.Column
          title="Time Slot"
          key="slot"
          render={(_, record: DataType) =>
            `${record.slotStartTime} - ${record.slotEndTime}`
          }
          width={70}
        />

        {/* date  */}
        <Table.Column
          title="Date"
          dataIndex={"date"}
          key="date"
          width={70}
          {...getColumnSearchProps("date")}
        />

        {/* slot status  */}
        <Table.Column
          title="Status"
          dataIndex={"status"}
          key="status"
          width={70}
          render={(_, record) => (
            <Tooltip
              title={`Make slot ${
                record?.status === "available"
                  ? "Canceled"
                  : record?.status === "booked"
                  ? "action not possible"
                  : "Available"
              }`}
            >
              <Tag
                onClick={
                  record?.status === "booked"
                    ? undefined
                    : () => toggleSlotStatusHandler(record.key)
                }
                style={{
                  cursor:
                    record?.status === "booked" ? "not-allowed" : "pointer",
                  opacity: record?.status === "booked" ? 0.5 : 1,
                }}
                color={
                  record?.status === "available"
                    ? "success"
                    : record?.status === "booked"
                    ? "processing"
                    : "error"
                }
              >
                {record?.status}
              </Tag>
            </Tooltip>
          )}
        />

        <Table.Column
          title="Actions"
          key="actions"
          width={120}
          render={(_, record: TSlot) => (
            <ActionButtons>
              {/* <Tooltip title="Update slot">
                <Avatar
                  icon={<EditFilled />}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleUpdateSlot(record)}
                />
              </Tooltip> */}

              <Tooltip title="Delete slot">
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => handleDeleteSlot(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Avatar
                    icon={<DeleteFilled />}
                    style={{ cursor: "pointer" }}
                  />
                </Popconfirm>
              </Tooltip>
              <Tooltip title="View slot">
                <Avatar
                  icon={<EyeFilled />}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleShowSlot(record)}
                />
              </Tooltip>
            </ActionButtons>
          )}
        />
      </Table>
      {/* show slot details  */}
      <Drawer title="Slot Details" onClose={onClose} open={open}>
        <ShowSlotDetails />
      </Drawer>

      {/* create slot modal  */}
      <Modal
        onCancel={handleCloseModal}
        footer={null}
        title={editSlotData ? "Update Slot Details" : "Create a new Slot "}
        open={isModalOpen}
      >
        <AddSlot handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default SlotsManagement;

// slots actions buttons
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
