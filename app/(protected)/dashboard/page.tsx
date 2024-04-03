import Logout from "@/_actions/LogoutAction";
import { auth } from "@/auth";

const Page = async () => {
    const session = await auth()
    const handleLogout = async() => {
        await Logout()
    }
    return (
        <>
            <h1>
                <button></button>
            </h1>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
            Hello Wolrd
        </>
    );
}

export default Page;