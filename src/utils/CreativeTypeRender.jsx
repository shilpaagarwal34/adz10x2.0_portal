import { base_url } from "../config/api.js";

export default function CreativeTypeRender({ type, data }) {
  return type === "image" ? (
    <img
      src={`${base_url}/${data?.upload_societies_images_path}`}
      alt="Advertisement"
      loading="lazy" // <-- lazy load
      style={{
        width: "100%",
        height: "250px",
        objectFit: "contain",
        marginTop: "1rem",
      }}
    />
  ) : type === "video" ? (
    <video
      src={`${base_url}/${data?.upload_societies_images_path}`}
      className="img-fluid"
      controls
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "6px",
      }}
    />
  ) : type === "text" ? (
    <div
      style={{
        width: "100%",
        minHeight: "350px",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "6px",
        marginTop: "1rem",
      }}
    >
      <p
        className="hide-scrollbar"
        style={{
          whiteSpace: "pre-wrap",
          height: "300px",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {data?.societies_text}
      </p>
    </div>
  ) : null;
}
