import { useState } from 'react';
import {createContext} from 'react'

export const postContext = createContext(null)


function Post({children}){
    const [postdetail,setpostDetail] = useState()
    return(

        <postContext.Provider value={{postdetail,setpostDetail}}>
            {children}
        </postContext.Provider>
    )
}
export default Post