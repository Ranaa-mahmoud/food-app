import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header-girl.png";

export default function Dashboard({ loginData }) {
  return (
    <Header
      title={`Welcomen ${loginData?.userName}`}
      description="This is a welcoming screen for the entry of the application, you can now see the options"
      imgUrl={photo}
    />
  );
}