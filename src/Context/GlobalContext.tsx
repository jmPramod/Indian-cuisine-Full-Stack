import { createContext, ReactNode, useEffect, useState } from 'react';
import { getCategory } from '../utils/API.services';
import { CategoryData, User } from '../types/foodTypes';
interface GlobalContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  category: CategoryData | null;
  setCategory: React.Dispatch<React.SetStateAction<CategoryData | null>>;
}

export const GlobalContext = createContext<GlobalContextType|null>(null);
interface GlobalProviderProps {
  children: ReactNode;
}
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
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
