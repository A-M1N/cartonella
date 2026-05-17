import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, uploadAvatar } from "../../../store/slices/authSlice";
import styles from "../Settings/AccountDetails.module.css";
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";

export default function AccountDetails() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  // hidden file input ref
  const fileInputRef = useRef(null);

  const startEdit = (field) => {
    setEditingField(field);
    setEditValue(field === "name" ? user?.name || "" : user?.phone || "");
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  const saveEdit = async () => {
    if (!editingField) return;
    const payload =
      editingField === "name" ? { name: editValue } : { phone: editValue };

    try {
      await dispatch(updateProfile(payload)).unwrap();
      toast.success("Profile updated");
      setEditingField(null);
    } catch (err) {
      toast.error(err || "Update failed");
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) dispatch(uploadAvatar(file));
  };

  return (
    <div className={styles.container}>
      {/* Name */}
      <div className={styles.row}>
        <div className={styles.vertical}>
          <span className={styles.label}>Full Name</span>
          {editingField === "name" ? (
            <input
              className={styles.editInput}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
            />
          ) : (
            <span className={styles.data}>{user?.name || "Not Set"}</span>
          )}
        </div>
        <div className={styles.btnContainer}>
          {editingField === "name" ? (
            <>
              <button className={styles.btn} onClick={saveEdit}>
                <FaCheck />
              </button>
              <button className={styles.btn} onClick={cancelEdit}>
                <FaTimes />
              </button>
            </>
          ) : (
            <button className={styles.btn} onClick={() => startEdit("name")}>
              <FaRegEdit className={styles.editIcon} /> Edit
            </button>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className={styles.row}>
        <div className={styles.vertical}>
          <span className={styles.label}>Mobile Number</span>
          {editingField === "phone" ? (
            <input
              className={styles.editInput}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
            />
          ) : (
            <span className={styles.data}>
              {user?.phone || (
                <span className={styles.addPhone}>Add a phone number</span>
              )}
            </span>
          )}
        </div>
        <div className={styles.btnContainer}>
          {editingField === "phone" ? (
            <>
              <button className={styles.btn} onClick={saveEdit}>
                <FaCheck />
              </button>
              <button className={styles.btn} onClick={cancelEdit}>
                <FaTimes />
              </button>
            </>
          ) : (
            <button className={styles.btn} onClick={() => startEdit("phone")}>
              <FaRegEdit className={styles.editIcon} />{" "}
              {user?.phone ? "Edit" : "Add"}
            </button>
          )}
        </div>
      </div>

      {/* Email – not editable */}
      <div className={styles.row}>
        <div className={styles.vertical}>
          <span className={styles.label}>Email Address</span>
          <span className={styles.data}>{user?.email || "Not Set"}</span>
        </div>
      </div>

      {/* Avatar upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        style={{ display: "none" }}
      />
      <button
        className={styles.btn}
        onClick={handleUploadClick}
        disabled={isLoading}
      >
        <CgProfile className={styles.photoIcon} />{" "}
        {isLoading ? "Uploading..." : "Upload A Profile Photo"}
      </button>
    </div>
  );
}
