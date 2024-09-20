import { useRef, useState } from "react";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { Button, Divider, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

// initial form value
const initialFormValues = {
  name: {
    firstName: "",
    middleName: "",
    lastName: "",
  },
  email: "",
  password: "",
  age: "",
  gender: "male",
  contact: "",
  address: "",
  profileImg: "",
};

const Register = () => {
  // redux
  const [registerUser] = useRegisterUserMutation();
  // react
  const data = new FormData();
  const labelRef = useRef<HTMLLabelElement>(null);
  const [formData, setFormData] = useState(initialFormValues);

  // ------------- handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Check if the input belongs to the "name" object
    if (name === "firstName" || name === "middleName" || name === "lastName") {
      setFormData((prevState: any) => ({
        ...prevState,
        name: { ...prevState.name, [name]: value },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // ---------- handle register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { ...formData, age: Number(formData.age) };
    data.append("data", JSON.stringify(userData));
    try {
      await registerUser(data).unwrap();
      message.success("Registration successfull!");
      setFormData(initialFormValues);
      if (labelRef.current) {
        labelRef.current?.click();
      }
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  // Function to handle file change
  const handleFileChange = (event: any) => {
    data.append("file", event.file);
  };

  return (
    <div className="signup-form">
      <div className="title">Signup</div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="input-boxes">
          <div className="flex">
            <div className="input-box">
              <i className="fas fa-user"></i>
              <input
                name="firstName"
                value={formData.name!.firstName}
                onChange={handleChange}
                type="text"
                placeholder="First name"
                required
              />
            </div>
            <div className="input-box">
              <input
                name="middleName"
                value={formData.name!.middleName}
                onChange={handleChange}
                type="text"
                placeholder="Middle name"
              />
            </div>
            <div className="input-box">
              <input
                name="lastName"
                value={formData.name!.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Last name"
                required
              />
            </div>
          </div>
          <div className="input-box">
            <i className="fas fa-envelope"></i>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Your email"
              required
            />
          </div>
          <div className="input-box">
            <i className="fas fa-lock"></i>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Your password"
              required
            />
          </div>
          <div className="flex">
            <div className="input-box">
              <i className="fas fa-phone"></i>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                type="number"
                placeholder="Your contact no"
                required
              />
            </div>
            <div className="input-box">
              <i className="fas fa-solid fa-user"></i>
              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
                type="number"
                placeholder="Your age"
                required
              />
            </div>
          </div>
          <div className="input-box">
            <i className="fas fa-solid fa-location-arrow"></i>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              type="text"
              placeholder="Your address"
              required
            />
          </div>
          <div className="select-box">
            <i className="fas fa-solid fa-mars"></i>
            <select
              name="gender"
              id=""
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="input-box">
            <i className="fas fa-solid fa-image"></i>
            <input
              name="profileImg"
              value={formData.profileImg}
              onChange={handleChange}
              type="text"
              placeholder="Your profile image link"
            />
          </div>
          <Divider style={{ marginBottom: "0px" }} plain>
            Or
          </Divider>
          <div className="input-box file-upload">
            <Upload
              name="file"
              className="upload-wrapper"
              beforeUpload={() => false}
              onChange={handleFileChange}
            >
              <Button block className="upload-btn" icon={<UploadOutlined />}>
                Upload a profile image
              </Button>
            </Upload>
          </div>
          <div className="button input-box">
            <input type="submit" value="Sumbit" />
          </div>
          <div className="text sign-up-text">
            Already have an account?{" "}
            <label ref={labelRef} htmlFor="flip">
              Login now
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
