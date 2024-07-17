import { fetchProfileAction } from "@/action";
import OnBoard from "@/components/on-board";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import { currentUser } from '@clerk/nextjs/server';


async function OnBoardPage(){

    //get the auth user from clerk
    const user = await currentUser();

    //fetch the profile info
    const profileInfo = await fetchProfileAction(user?.id)
    if(profileInfo?._id){
        if(profileInfo?.role === 'recruiter' && 
        !profileInfo.isPremiumUser) redirect('/membership')
        else redirect("/")
    } else return <OnBoard />
    return (
        <OnBoard />
    )
}

export default OnBoardPage;