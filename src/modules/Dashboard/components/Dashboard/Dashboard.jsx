import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header-girl.png";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import FillRecipe from "../../../Shared/components/componenttitle/FillRecipe";

export default function Dashboard() {
  const { loginData } = useContext(AuthContext);
  return (
    <>
      <Header
        title={"Welcome"}
        subtitle={`${loginData?.userName || ""} !`}
        description={
          "This is a welcoming screen for the entry of the application, you can now see the options"
        }
        imgUrl={photo}
      />
      <FillRecipe />
    </>
  );
}
