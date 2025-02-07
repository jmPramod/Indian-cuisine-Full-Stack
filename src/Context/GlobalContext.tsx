import { createContext, useEffect, useState } from 'react';
import { getCategory } from '../utils/API.services';
import { CategoryData } from '../types/foodTypes';

export const GlobalContext = createContext<any>(null);
export const GlobalProvider = ({ children }: any) => {
   const [user,setUser]=useState([])
   const [category, setCategory] = useState<CategoryData | null>(null);

   const fetchcategory=async()=>{
    try {
        let res=await getCategory()

        if(res?.status==200){
            setCategory(res.data)
        }

    } catch (error) {
        
    }
   }
   const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
       setUser(JSON.parse(storedUser));
    }
 };
   useEffect(() => {
    loadUserFromLocalStorage();
    fetchcategory();
  }, []);
    return (
    <GlobalContext.Provider
    value={{user, setUser, category, setCategory}}
  >
    {children}
  </GlobalContext.Provider>)
}
