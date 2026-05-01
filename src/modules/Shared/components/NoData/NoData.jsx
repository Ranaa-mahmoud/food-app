import photo from "/src/assets/images/no-data.png";
export default function NoData() {
  return (
   <div className="text-center py-5">
  <img src={photo} alt="nodata" style={{ width: "200px" }} />
  <h4 className="mt-3">No Data Found</h4>
  <p className="text-muted">
    There is no data to display right now.
  </p>
</div>
  );
}
