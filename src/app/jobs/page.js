import { fetchJobsForRecruiter,fetchJobsForCandidate, fetchProfileAction, fetchJobAppliationsForRecruiter, fetchJobAppliationsForCandidate, createFilterCategoryAction } from "@/action";
import JobListing from "@/components/jon-listing";
import { currentUser } from '@clerk/nextjs/server';

export default async function JobsPage({searchParams}){
    console.log("searchParams = ",searchParams)
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id)

    const jobList = profileInfo.role === 'candidate' ? 
    await fetchJobsForCandidate(searchParams) 
    : await fetchJobsForRecruiter(user?.id)

    const getJobApplciationList = profileInfo.role === 'candidate' ? 
        await fetchJobAppliationsForCandidate(user?.id):
        await fetchJobAppliationsForRecruiter(user?.id)

    const fetchFilterCategories = await createFilterCategoryAction()
    return(
        <JobListing
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
            jobList={jobList}
            jobApplications={getJobApplciationList}
            filterCategories={fetchFilterCategories}
        />
    )
}