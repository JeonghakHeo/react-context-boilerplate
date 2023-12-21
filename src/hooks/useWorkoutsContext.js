import { UsersContext } from "../context/UsersContext"
import { useContext } from "react"

export const useWorkoutsContext = () => {
  const context = useContext(UsersContext)

  if(!context) {
    throw Error('useUsersContext must be used inside a UsersContextProvider')
  }

  return context
}