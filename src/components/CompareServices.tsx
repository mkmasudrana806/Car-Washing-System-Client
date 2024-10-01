import { useAppSelector } from "../redux/hooks";
import { Table, Image, message } from "antd";

const CompareServices = () => {
  const compareList = useAppSelector((state) => state.services.compareList);

  // Only show the table if exactly two services are selected
  if (compareList.length === 0) {
    return <p>No services selected for comparison.</p>;
  }

  if (compareList.length > 3) {
    message.warning("Max three services allowed for comparison.");
    return null;
  }

  // Create table data for each attribute
  const data = [
    {
      key: "name",
      attribute: "Name",
      service1: compareList[0]?.name || "N/A",
      service2: compareList[1]?.name || "N/A",
    },
    {
      key: "description",
      attribute: "Description",
      service1: compareList[0]?.description || "N/A",
      service2: compareList[1]?.description || "N/A",
    },
    {
      key: "price",
      attribute: "Price",
      service1: `$${compareList[0]?.price || "N/A"}`,
      service2: `$${compareList[1]?.price || "N/A"}`,
    },
    {
      key: "duration",
      attribute: "Duration",
      service1: `${compareList[0]?.duration || "N/A"} minutes`,
      service2: `${compareList[1]?.duration || "N/A"} minutes`,
    },
    {
      key: "featured",
      attribute: "Featured",
      service1: compareList[0]?.featured ? "Yes" : "No",
      service2: compareList[1]?.featured ? "Yes" : "No",
    },
    {
      key: "serviceImgUrl",
      attribute: "Image",
      service1: compareList[0]?.serviceImgUrl ? (
        <Image src={compareList[0].serviceImgUrl} width={100} />
      ) : (
        "N/A"
      ),
      service2: compareList[1]?.serviceImgUrl ? (
        <Image src={compareList[1].serviceImgUrl} width={100} />
      ) : (
        "N/A"
      ),
    },
  ];

  const columns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
    },
    {
      title: compareList[0]?.name || "Service 1",
      dataIndex: "service1",
      key: "service1",
    },
    {
      title: compareList[1]?.name || "Service 2",
      dataIndex: "service2",
      key: "service2",
    },
  ];

  return (
    <Table dataSource={data} columns={columns} pagination={false} bordered />
  );
};

export default CompareServices;
