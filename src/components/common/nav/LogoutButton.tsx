import { Button } from "@chakra-ui/core"
import { Router } from "next/router"
import { CgLogOut } from "react-icons/cg"

export default function LogoutButton() {
  return (
    <Button
      onClick={() => location.replace("/api/auth/signout")}
      rightIcon={<CgLogOut />}
      colorScheme="blue"
      variant="outline"
      maxW="300px"
    >
      Logout
    </Button>
  )
}
