export default function Header({ title, subtitle, description, imgUrl }) {
  return (
    <>
      <div className=" py-3 px-5  m-3   text-white  rounded  header-bg">
        <div className=" container-fluid">
          <div className="row">
            <div className="col-md-8 d-flex align-items-center ">
              <div>
                <h2 className=" fw-bolder">
                  {title}
                  <span className="fw-light px-1  fw-lighter text-muted">
                    {subtitle}
                  </span>
                </h2>
                <p className="fw-normal w-75 my-3">{description}</p>
              </div>
            </div>
            <div className="col-md-4 text-end ">
              <img className=" w-75" src={imgUrl} alt="header-photo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
