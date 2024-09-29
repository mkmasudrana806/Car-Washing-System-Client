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
  Tag,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { DeleteFilled, EyeFilled, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useToggleUserRoleMutation,
  useToggleUserStatusMutation,
} from "../../redux/features/users/userApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearShowUserData,
  deleteUserFromStore,
  loadAllUsers,
  setShowUserData,
} from "../../redux/features/users/userSlice";
import LoadingComponent from "../../components/messages/LoadingComponent";
import ErrorComponent from "../../components/messages/ErrorComponent";
import {
  UserOutlined,
  SecurityScanOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { TUser } from "../../types/userType";
import ShowUserDetails from "./ShowUserDetails";

// Data type for the table
interface DataType {
  key: React.Key;
  name: string; // Full name: First and last name
  email: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  address: string;
}

type DataIndex = keyof DataType;

// ----------- user component page
const UsersManagement = () => {
  // ---------- redux
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const [toggleUserStatus] = useToggleUserStatusMutation();
  const [toggleUserRole] = useToggleUserRoleMutation();
  const { data, isLoading, isError } = useGetAllUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  // ------------ react
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  // ----------- open and close show user details
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
    dispatch(clearShowUserData());
  };

  // ---------- get the media query breakpoints
  const isMobileView = useMediaQuery({ query: "(max-width: 600px)" });

  // ---------- load all users
  useEffect(() => {
    if (data?.data && data?.data.length > 0) dispatch(loadAllUsers(data?.data));
  }, [dispatch, data?.data]);

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    return <ErrorComponent />;
  }

  // ------------ Data source for the table
  const dataSource = users
    ?.filter((user: TUser) => !user.isDeleted)
    .map((user: TUser) => ({
      key: user._id,
      name: `${user?.name?.firstName} ${user?.name?.lastName}`, // Combining first and last name
      email: user.email,
      role: user.role,
      status: user.status,
      address: user.address,
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

  // ------------- handle delete user
  const handleDeleteUser = async (_id: string) => {
    const result = await deleteUser(_id);
    if (result?.data?.success) {
      dispatch(deleteUserFromStore(_id));
      message.success("User deleted successfully");
    }
  };

  // ------------- handle show user details
  const handleShowUser = (user: TUser) => {
    setOpen(true);
    dispatch(setShowUserData(user));
  };

  // ------------ toggle user status
  const toggleUserStatusHandler = async (id: string, status: string) => {
    console.log(typeof id);
    const result: any = await toggleUserStatus({ id, status });
    if (result?.data) {
      message.success(result.data?.message);
    } else {
      message.error(result.error?.data?.message);
    }
  };

  // ------------ toggle user role
  const toggleUserRoleHandler = async (id: string, role: string) => {
    console.log(typeof id);
    const result: any = await toggleUserRole({ id, role });
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
        <h1 style={{ fontSize: "1.2rem" }}>Total users: {users?.length}</h1>
      </div>
      <Table
        style={{ transition: "0.3s", marginTop: "16px" }}
        dataSource={dataSource}
        size={isMobileView ? "small" : "large"}
        scroll={{ x: 576, y: 500 }}
        pagination={{ pageSize: 10 }}
      >
        {/* user name  */}
        <Table.Column
          title="Name"
          dataIndex="name"
          key="name"
          width={120}
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

        {/* user email */}
        <Table.Column
          title="Email"
          dataIndex="email"
          key="email"
          width={120}
          {...getColumnSearchProps("email")}
        />

        {/* user role  */}
        <Table.Column
          title="Role"
          dataIndex="role"
          key="role"
          width={60}
          render={(_, record) => (
            <Tooltip
              title={`Make ${record?.role === "user" ? "admin" : "user"}`}
            >
              <div
                onClick={() =>
                  toggleUserRoleHandler(
                    record.key,
                    record.role === "user" ? "admin" : "user"
                  )
                }
                style={{ cursor: "pointer" }}
              >
                {record?.role === "user" ? (
                  <UserOutlined />
                ) : (
                  <SecurityScanOutlined />
                )}{" "}
                {record?.role}
              </div>
            </Tooltip>
          )}
        />

        {/* user status  */}
        <Table.Column
          title="Status"
          dataIndex={"status"}
          key="status"
          width={60}
          render={(_, record) => (
            <Tooltip
              title={`make user ${
                record.status === "active" ? "blocked" : "active"
              }`}
            >
              <Tag
                style={{ cursor: "pointer" }}
                onClick={() =>
                  toggleUserStatusHandler(
                    record.key,
                    record.status === "active" ? "blocked" : "active"
                  )
                }
                color={record.status === "active" ? "success" : "error"}
              >
                {record.status}
              </Tag>
            </Tooltip>
          )}
        />

        {/* user address  */}
        <Table.Column
          title="Address"
          dataIndex="address"
          key="address"
          width={150}
          ellipsis={{
            showTitle: false,
          }}
          {...getColumnSearchProps("address")}
          render={(address) => (
            <Tooltip placement="topLeft" title={address}>
              <EnvironmentOutlined /> {address}
            </Tooltip>
          )}
        />

        {/* users actions button  */}
        <Table.Column
          title="Actions"
          key="actions"
          width={120}
          render={(_, record: TUser) => (
            <ActionButtons>
              <Tooltip title="Delete user">
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => handleDeleteUser(record.key)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Avatar
                    icon={<DeleteFilled />}
                    style={{ cursor: "pointer" }}
                  />
                </Popconfirm>
              </Tooltip>
              <Tooltip title="View user">
                <Avatar
                  icon={<EyeFilled />}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleShowUser(record)}
                />
              </Tooltip>
            </ActionButtons>
          )}
        />
      </Table>
      {/* show user details  */}
      <Drawer title="User Details" onClose={onClose} open={open}>
        <ShowUserDetails />
      </Drawer>
    </div>
  );
};

export default UsersManagement;

// users actions buttons
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
