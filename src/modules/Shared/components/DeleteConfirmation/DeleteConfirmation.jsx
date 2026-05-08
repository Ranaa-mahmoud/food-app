
















export default function DeleteConfirmation({ itemName }) {
  return (
    <div className="text-center p-3">

      {/* ICON */}
      <div className="mb-3">
        <i
          className="fa fa-trash text-danger"
          style={{ fontSize: "60px" }}
        ></i>
      </div>

      {/* TITLE */}
      <h4 className="fw-bold mb-2">
        Delete this {itemName}?
      </h4>

      {/* DESCRIPTION */}
      <p className="text-muted mb-0">
        Are you sure you want to delete this item?
        <br />
        This action cannot be undone.
      </p>

    </div>
  );
}