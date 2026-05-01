export default function Header({title,description,imgUrl}) {
  return (
    <div className="py-3 px-5  m-3   text-white  rounded-4 header-bg">
      <div className=" container-fluid">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center ">
            <div>
              <h1 >{title}</h1>
              <p className="py-2 text-muted">
               {description}
              </p>
            </div>
          </div>
          <div className="col-md-4 text-end ">
            <img className=" w-75" src={imgUrl} alt="header-photo" />
          </div>
        </div>
      </div>
    </div>
  );
}
