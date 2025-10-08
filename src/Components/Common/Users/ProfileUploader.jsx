import React from "react";
import { Form, Image } from "react-bootstrap";

const ProfileUploader = ({ profileImage, onUpload }) => (
  <div className="d-flex flex-column align-items-start align-items-sm-center mb-3">
    <input
      type="file"
      accept="image/*"
      className="d-none"
      id="profile-upload"
      onChange={onUpload}
    />
    <label htmlFor="profile-upload" className="cursor-pointer">
      {profileImage ? (
        <Image src={profileImage} roundedCircle width={80} height={80} />
      ) : (
        <div
          className="border rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: 80,
            height: 80,
            background: "#f8f9fa",
            cursor:"pointer"
          }}
        >
          <span>+</span>
        </div>
      )}
    </label>
    <Form.Label className="custom-label text-muted mt-2">
      Upload Your Profile Photo
    </Form.Label>
  </div>
);

export default ProfileUploader;
