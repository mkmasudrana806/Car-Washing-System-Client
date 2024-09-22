import { Divider, Empty } from "antd";

// TODO: implement comment service FAQ
// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;

// const items: CollapseProps["items"] = [
//   {
//     key: "1",
//     label: "This is panel header 1",
//     children: <p>{text}</p>,
//   },
//   {
//     key: "2",
//     label: "This is panel header 2",
//     children: <p>{text}</p>,
//   },
//   {
//     key: "3",
//     label: "This is panel header 3",
//     children: <p>{text}</p>,
//   },
// ];

const ServiceFAQ = () => {
  return (
    <div>
      <p>Gets some commons answer about this service people search for it</p>
      <Divider />
      {/* when no reviews, show empty message  */}
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      {/* show reviews when it has  */}
      {/*TODO:  <Collapse accordion items={items} defaultActiveKey={["1"]} /> */}
    </div>
  );
};

export default ServiceFAQ;
