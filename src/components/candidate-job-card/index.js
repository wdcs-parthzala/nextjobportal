"use client"

import { Fragment, useState } from "react"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { createJobApplicationAction } from "@/action"
import { useToast } from "../ui/use-toast"


export default function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {
    const {toast} = useToast()
    const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false)
    async function handleJobApply(){
        if(!profileInfo?.isPremiumUser && jobApplications.length >=2 ){
            setShowJobDetailsDrawer(false)
            toast({
                variant: 'destructive',
                title: "You can max 2 jobs. Please take a membership",
                description: "Purchase membership",
              })
            return 
        }
        await createJobApplicationAction({
            recruiterUserId: jobItem?.recruiterId,
            name: profileInfo?.candidateInfo?.name,
            email: profileInfo?.email,
            candidateUserId: profileInfo?.userId,
            status:['Applied'],
            jobId: jobItem._id,
            jobAppliedDate: new Date().toLocaleDateString()
        },'/jobs')
        setShowJobDetailsDrawer(false)
    }
    return (
        <Fragment>
            <Drawer
                open={showJobDetailsDrawer}
                onOpenChange={setShowJobDetailsDrawer}
            >
                <CommonCard icon={<JobIcon />}
                    title={jobItem?.title}
                    description={jobItem?.companyName}
                    footerContent={
                        <Button
                            onClick={() => setShowJobDetailsDrawer(true)}
                            className="flex h-11 items-center justify-center px-5">
                            View details
                        </Button>
                    }
                />
                <DrawerContent className="p-6">
                    <DrawerHeader className="px-0">
                        <div className="flex justify-between">
                            <DrawerTitle className="text-4xl font-extrabold text-gray-800">{jobItem?.title}</DrawerTitle>
                            <div className="flex gap-3">
                                <Button
                                    className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
                                    onClick={handleJobApply}
                                    disabled={
                                        jobApplications.findIndex(
                                            (item) => item.jobId === jobItem?._id
                                        ) > -1 
                                        ? true 
                                        : false
                                    }
                                >
                                {
                                    jobApplications.findIndex(item=>item.jobId ===jobItem?._id) > -1 ? 'Applied' : "Apply"
                                }
                                </Button>
                                <Button
                                    className="flex h-11 items-center justify-center px-5"
                                    onClick={() => setShowJobDetailsDrawer(false)}>Cancel</Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerDescription className="text-2xl font-medium text-gray-600">
                        {jobItem?.description}
                        <span className="text-xl ml-4 font-normal text-gray-500">{jobItem?.location}</span>
                    </DrawerDescription>
                    <div className="w-[150px] mt-6 flex justify-center items-center h-[40px] bg-black rounded-[4px]">
                        <h2 className="text-xl font-bold text-white">{jobItem?.type} Time</h2>
                    </div>
                    <h3 className="text-2xl font-medium text-black mt-3">Experience: {jobItem?.experience}</h3>
                    <div className="flex gap-4 mt-4">
                        {
                            jobItem?.skills.split(",").map((skillItem)=>(
                                <div key={skillItem} className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                    <h2 className="text-[13px] font-medium text-white">{skillItem}</h2>
                                </div>
                            ))
                        }
                    </div>
                </DrawerContent>
            </Drawer>
        </Fragment>
    )
}