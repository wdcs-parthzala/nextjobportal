'use client';

import CandidateList from "../candidate-list";
import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

export default function JobApplicants({showApplicantsDrawer,
    setShowApplicantDrawer, 
    showCurrentCandidateDetailsModel,
    setShowCurrentCandidateDetailsModel,
    currentCandidateDetails,
    setCurrentCandidateDetails,
    jobItem,
    jobApplications
}){
    return(
        <Drawer
            open={showApplicantsDrawer}
            onOpenChange={setShowApplicantDrawer}
        >
            <DrawerContent className="max-h-[50vh]">
                <ScrollArea className="h-auto overflow-y-auto">
                    <CandidateList
                        currentCandidateDetails={currentCandidateDetails}
                        setCurrentCandidateDetails={setCurrentCandidateDetails}
                        jobApplications={jobApplications}
                        showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
                        setShowCurrentCandidateDetailsModel={setShowCurrentCandidateDetailsModel}
                    />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}