import * as React from "react";
import {
  ToolbarButton,
 
  MenuTrigger,
  MenuList,
 
  Button,
} from "@fluentui/react-components";
import { styles } from "./styles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Drawer } from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { searchFood } from "../../utils/API.services";
import { Spinner } from "@fluentui/react-components";
import { GlobalContext } from "../../Context/GlobalContext";
import { User } from "../../types/foodTypes";
interface SearchResult {
  _id: string;
  name: string;
  img:string
}

const Navbar: React.FC = () => {
  
  const context = React.useContext(GlobalContext);
  const user = context?.user
  const setUser= context?.setUser
  const [loginOrLogout, setLoginOrLogout] = React.useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const[admin,setAdmin]=React.useState(false)
  const [searchText, setSearchText] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
const navigate=useNavigate()
const location=useLocation()

  React.useEffect(() => {
    if (searchText.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true); 
      try {
        const response = await searchFood({query:searchText})
        
        if(response?.status===200){

          setShowDropdown(true);
          setSearchResults(response.data.data);
          setIsLoading(false); 
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData()
  }, [searchText]);
React.useEffect(()=>{
  setSearchResults([]);
  setShowDropdown(false);
  setIsLoading(false);
  setSearchText("")
},[location])

const handleLogout=()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("user"); 
  localStorage.removeItem("userType"); 
  setUser&&setUser(null)

}
React.useEffect(()=>{
  console.log(user);
  localStorage.getItem("user");

  
  if(user&&(Object.keys(user).length>0 )){
    setLoginOrLogout(true)
  }
  else{
    setLoginOrLogout(false)
    
  }
},[user])
React.useEffect(() => {
  const token = localStorage.getItem("token");
  let user1 = localStorage.getItem("user");
  if(user1){
    let u: User | null =  JSON.parse(user1)

    console.log(u&&u.isAdmin);
    
    setAdmin(u&&u.isAdmin=="admin"?true:false)
  }
  console.log(token,user);
  
  if (token) {
    
    setLoginOrLogout(true)
  } else {
  
    setLoginOrLogout(false)
   }
}, [navigate]);



  return (
    <>
      <styles.ToolbarContainer aria-label="Navigation"  $isHomePage={location.pathname==="/"?true:false}>
  
        {/* Logo */}
        <styles.LogoButton  $isHomePage={location.pathname==="/"?true:false} onClick={()=>navigate("/")}>Food<styles.logo color={location.pathname==="/"?"white":" white"} /></styles.LogoButton>

        {/* Search Box */}
        <styles.field>
          <styles.searchBox
            placeholder="Search for a Recipe..."
            value={searchText}
            onChange={
              (_, data) =>{
              console.log(data.value);
              
               setSearchText(data.value)}
              
              }     
              contentAfter={isLoading ? <Spinner size="small" />:""}
              />
             
          {/* Search Results Dropdown */}
        
          {showDropdown && (
            <styles.searchDropdown>
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <styles.searchConatiner style={{}}onClick={()=>navigate(`/single-food/${item._id}`)}>


                    <styles.searchItem key={item._id}>{item.name}</styles.searchItem>
                  <styles.img src={item.img} alt="item.name"  width={50}/>
                  </styles.searchConatiner>
                ))
              ) : (
                <styles.searchItem>No results found</styles.searchItem>
              )}
            </styles.searchDropdown>
          )}
        </styles.field>

        {/* Desktop Menu Section */}
        <styles.menuContainer >
          <ToolbarButton aria-label="Home" appearance="primary" onClick={()=>navigate("/table")}>
         All Recipe
          </ToolbarButton>
     {loginOrLogout&& admin    &&<ToolbarButton aria-label="Home" appearance="primary" onClick={()=>navigate("/create-food")}>
    Create Food 
          </ToolbarButton>
}
          {!loginOrLogout ? (
            <ToolbarButton aria-label="Login/Logout" appearance="primary" onClick={()=>navigate("/login")}>
              {!loginOrLogout ? "Login" : "Logout"}
            </ToolbarButton>
          ) : (
            <styles.menuWrapper>
              <MenuTrigger>
              {user&&user.profileImage&&  <styles.profileImage src={user.profileImage.imageUrl} />}
              </MenuTrigger>

              <styles.MenuPopoverContainer>
                <MenuList>
                  <styles.menuItem onClick={()=>navigate("/profile")}>Profile</styles.menuItem>
                  <styles.menuItem onClick={()=>handleLogout()}>Logout</styles.menuItem>
                </MenuList>
              </styles.MenuPopoverContainer>
            </styles.menuWrapper>
          )}
        </styles.menuContainer>

        {/* Mobile Menu Button */}
        <styles.mobileMenuButton onClick={() => setIsDrawerOpen(true)}>
          ☰
        </styles.mobileMenuButton>
      </styles.ToolbarContainer>

      {/* Mobile Drawer */}
      <Drawer
        type="overlay"
        open={isDrawerOpen}
        onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
      >
        <styles.buttonWrapper style={{ }}>
          <Button
            icon={<Dismiss24Regular />}
            appearance="subtle"
            onClick={() => setIsDrawerOpen(false)}
          />
          
            {!loginOrLogout ? (
            <ToolbarButton aria-label="Login/Logout" appearance="primary" onClick={()=>navigate("/login")}>
              {!loginOrLogout ? "Login" : "Logout"}
            </ToolbarButton>
          ) : (

            <>
           {user&&(Object.keys(user).length>0 )&&user?.profileImage?.imageUrl&&   <styles.profileImage  onClick={()=>navigate("/profile")} src={user.profileImage.imageUrl} />
          }
            <ToolbarButton appearance="primary" onClick={()=>navigate("/")}>Home</ToolbarButton>
            <ToolbarButton appearance="primary" onClick={()=>handleLogout()}>Logout</ToolbarButton>
        
            {/* <styles.menuWrapper>
              <MenuTrigger>
                  </MenuTrigger>

              <styles.MenuPopoverContainer>
                <MenuList>
                  <styles.menuItem>Profile</styles.menuItem>
                  <styles.menuItem onClick={()=>handleLogout()}>Logout</styles.menuItem>
                </MenuList>
              </styles.MenuPopoverContainer>
            </styles.menuWrapper> */}
            </>
          )}
         
         
          {/* <ToolbarButton appearance="primary"   onClick={()=>handleLogout()}>
            {!loginOrLogout ? "Login" : "Logout"}
          </ToolbarButton> */}
        </styles.buttonWrapper>
      </Drawer>

      <Outlet />
    </>
  );
};

export default Navbar;
