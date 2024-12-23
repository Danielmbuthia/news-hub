import { createContext } from "react";
import { userProps } from '../types';


const UserContext = createContext<userProps | null>(null)

export default UserContext