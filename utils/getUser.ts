import { UserTypes } from "@/pages"


const getUser = (friend: any, userLogged: UserTypes["userData"]) => {
	return friend?.filter((user: any) => user !== userLogged?.uid)[0]
}

export { getUser }