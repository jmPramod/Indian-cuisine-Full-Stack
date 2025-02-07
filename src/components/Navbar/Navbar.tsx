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
interface SearchResult {
  _id: string;
  name: string;
  img:string
}

const Navbar: React.FC = () => {
  const { user,setUser } = React.useContext(GlobalContext);
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
  setUser([])

}
React.useEffect(()=>{
  console.log(user);
  localStorage.getItem("user");

  
  if(user.length>0){
    setLoginOrLogout(true)
  }
  else{
    setLoginOrLogout(false)
    
  }
},[user])
React.useEffect(() => {
  const token = localStorage.getItem("token");
  let u:any = localStorage.getItem("user");
  if(u){

    u=JSON.parse(u)
    console.log(u.isAdmin);
    
    setAdmin(u.isAdmin=="admin"?true:false)
  }
  console.log(token,user,u);
  
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
                <styles.profileImage src={user.profileImage.imageUrl} />
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
          <ToolbarButton appearance="primary">Home</ToolbarButton>
          <ToolbarButton appearance="primary"   onClick={()=>handleLogout()}>
            {!loginOrLogout ? "Login" : "Logout"}
          </ToolbarButton>
        </styles.buttonWrapper>
      </Drawer>

      <Outlet />
    </>
  );
};

export default Navbar;
