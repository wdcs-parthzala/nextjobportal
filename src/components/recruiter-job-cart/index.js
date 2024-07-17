'use client'

import { useState } from "react"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import JobApplicants from "../job-applicants"

export default function RecruiterJobCart({jobItem,jobApplications}){
    const [showApplicantsDrawer, setShowApplicantDrawer] = useState(false);
    const [currentCandidateDetails, setCurrentCandidateDetails]=useState(null)
    const [showCurrentCandidateDetailsModel, setShowCurrentCandidateDetailsModel]=useState(false)

    return(
        <div>
            <CommonCard
                icon={<JobIcon/>}
                title={jobItem?.title}
                footerContent={
                    <Button
                    onClick={()=> setShowApplicantDrawer(true)}
                    className="flex h-11 items-center justify-center px-5"
                    >
                        {
                            jobApplications.filter(item=> item.jobId === jobItem?._id).length
                        } Applicants
                    </Button>
                }
                description={jobItem?.description}
            />
            <JobApplicants 
                showApplicantsDrawer={showApplicantsDrawer}
                setShowApplicantDrawer={setShowApplicantDrawer}
                showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
                setShowCurrentCandidateDetailsModel={setShowCurrentCandidateDetailsModel}
                currentCandidateDetails={currentCandidateDetails}
                setCurrentCandidateDetails={setCurrentCandidateDetails}
                jobItem={jobItem}
                jobApplications={jobApplications.filter(
                    (jobApplicantItem) => jobApplicantItem.jobId === jobItem?._id
                )}
            />
        </div>
    )
}