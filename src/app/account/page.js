import { fetchProfileAction } from "@/action";
import AccountInfo from "@/components/account-info";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function AccountPage(){
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)
    if(!profileInfo) redirect("/onboard")
    return(
        <div>
            <AccountInfo profileInfo={profileInfo}/>
        </div>
    )

}
export default AccountPage;
