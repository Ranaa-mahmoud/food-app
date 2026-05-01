import Header from "../../../Shared/components/Header/Header";
import photo from '/src/assets/images/header.png'

export default function UsersList() {
  return (
    <Header
            title={"Users List"}
            description={
            
"You can now add your items that any user can order it from the Application and you can edit"
            }
            imgUrl={photo}
          />
  )
}
