'use client'

import { Fragment } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog"
import { getCandidateDetailsByIDAction, updateJobApplicationAction } from "@/action"
import { createClient } from "@supabase/supabase-js"
const supabaseClient = createClient('https://dewbdyxhnummnzjzaydb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRld2JkeXhobnVtbW56anpheWRiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDUwNzcyNywiZXhwIjoyMDM2MDgzNzI3fQ.z7Rzj9OPtD4fg9IQxsR2Kdcz81jjcntm0sjB9AfzcZI')

export default function CandidateList({
    currentCandidateDetails, 
    setCurrentCandidateDetails, 
    jobApplications, 
    showCurrentCandidateDetailsModel, 
    setShowCurrentCandidateDetailsModel
}){

    async function handleFetchCandidateDetails(getCurrentCandidateUserId){
        const data = await getCandidateDetailsByIDAction(getCurrentCandidateUserId)
        if(data){
            setCurrentCandidateDetails(data)
            setShowCurrentCandidateDetailsModel(true)
        }
    }
    function handlePreviewResume(){
        const {data} = supabaseClient.storage
            .from('job-bpard-public')
            .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume)
        console.log("Data = ",data)
        const a = document.createElement('a')
        a.href = data?.publicUrl;
        a.setAttribute('download', 'Resume.pdf');
        a.setAttribute('target',"_blank");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a)
    }

    async function handleUpdateJobStatus(getCurrnetStatus){
        let copyJobApplicants = [...jobApplications];
        const indexOfCurrnetJobApplicant = copyJobApplicants.findIndex(item=> item.candidateUserId === currentCandidateDetails?.userId);
        const jobApplicantToUpdate = {
            ...copyJobApplicants [indexOfCurrnetJobApplicant],
            status: copyJobApplicants[indexOfCurrnetJobApplicant].status.concat(getCurrnetStatus)
        }
        console.log("v = ",jobApplicantToUpdate)
        await updateJobApplicationAction(jobApplicantToUpdate,"/jobs")
    }

    console.log("jobApplicant = ", jobApplications)
    return(
        <Fragment>
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {
                    jobApplications && jobApplications.length > 0 ?
                        jobApplications.map(jobApplicantItem => 
                        <div key={jobApplicantItem?.name} className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                            <div className="px-4 my-6 flex justify-between items-center">
                                <h3 className="text-lg font-bold">{jobApplicantItem?.name}</h3>
                                <Button
                                    onClick={()=> handleFetchCandidateDetails(jobApplicantItem?.candidateUserId)}
                                    className="flex h-11 items-center justify-center px-5"
                                >View Details</Button>
                            </div>
                        </div>)
                    : null
                }
            </div>
            <Dialog 
                open={showCurrentCandidateDetailsModel}
                onOpenChange={()=>{
                    setCurrentCandidateDetails(null)
                    setShowCurrentCandidateDetailsModel(false)
                }}
            >
                
                <DialogContent>
                    <div>
                        <h1 className="text-2xl font-bold text-black">{currentCandidateDetails?.candidateInfo?.name}, {currentCandidateDetails?.email}</h1>
                        <p className="text-xl font-medium text-black">
                            {currentCandidateDetails?.candidateInfo?.currentCompany}
                        </p>
                        <p className="text-sm font-normal text-black">
                            {currentCandidateDetails?.candidateInfo?.currentJobLocation}
                        </p>
                        <p>
                            Total Experience: {currentCandidateDetails?.candidateInfo?.totalExperience}
                        </p>
                        <p>
                            Salary: {currentCandidateDetails?.candidateInfo?.currentSalary} LPA
                        </p>
                        <p>
                            Notice Period: {currentCandidateDetails?.candidateInfo?.noticePeriod} Days
                        </p>
                        <div className="flex flex-wrap gap-4 mt-6">
                        <h1>Skills</h1>
                        {
                            currentCandidateDetails?.candidateInfo?.skills.split(",").map((skillItem)=>(
                                <div key={skillItem} className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                    <h2 className="text-[13px] font-medium text-white">{skillItem}</h2>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                        <h1>Previous Companies</h1>
                        <div className="flex flex-wrap items-center gap-4 mt-6">

                        {
                            currentCandidateDetails?.candidateInfo?.previousCompanies.split(",").map((skillItem)=>(
                                <div key={skillItem} className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                    <h2 className="text-[13px] font-medium text-white">{skillItem}</h2>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    </div>
                    <div className="flex gap-3">
                    
                    <Button onClick={handlePreviewResume} className="flex h-11 items-center justify-center px-5">Resume</Button>
                        <Button onClick={()=> handleUpdateJobStatus('selected')} 
                        className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
                        disabled = {
                            jobApplications.
                                find((item) => 
                                    item.candidateUserId === currentCandidateDetails?.userId
                            )
                            ?.status.includes('selected') || 
                            jobApplications.
                                find((item) => 
                                    item.candidateUserId === currentCandidateDetails?.userId
                            )
                            ?.status.includes('rejected')
                            ? true : false
                        }
                        >
                            {
                                jobApplications
                                    .find((item) => item.candidateUserId === currentCandidateDetails?.userId
                                )
                                ?.status.includes('selected')
                                ? 'Selected'
                                : 'Select'
                            }
                        </Button>
                        <Button
                        disabled = {
                            jobApplications
                            .find(
                                (item) => 
                                    item.candidateUserId === currentCandidateDetails?.userId
                            )
                            ?.status.includes('selected') || jobApplications
                            .find(
                                (item) => 
                                    item.candidateUserId === currentCandidateDetails?.userId)
                                ?.status?.includes('rejected')
                            ? true
                            : false
                            
                        }
                        onClick={()=> handleUpdateJobStatus('rejected')} className=" disabled:opacity-65 flex h-11 items-center justify-center px-5">
                            {
                                jobApplications
                                .find((item) => item.candidateUserId === currentCandidateDetails?.userId
                            )
                            ?.status.includes('rejected') 
                                ? 'Rejected'
                                : 'Reject'
                            }
                        </Button>
                    </div>

                </DialogContent>
                
            </Dialog>
        </Fragment>
    )
}