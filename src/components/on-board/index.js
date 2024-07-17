"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import CommonForm from "../common-form"
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils"
import { useUser } from "@clerk/nextjs"
import { createProfileAction } from "@/action"
import { createClient } from "@supabase/supabase-js"

const supabaseClient = createClient('https://dewbdyxhnummnzjzaydb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRld2JkeXhobnVtbW56anpheWRiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDUwNzcyNywiZXhwIjoyMDM2MDgzNzI3fQ.z7Rzj9OPtD4fg9IQxsR2Kdcz81jjcntm0sjB9AfzcZI')

export default function OnBoard() {
    const [currentTab, setCurrentTab] = useState('candidate')
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData)
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData)
    
    const [file, setFile] = useState(null)
    const currentAuthUser = useUser()
    const {user} = currentAuthUser;

    function handleFileChange(event){
        event.preventDefault()
        setFile(event.target.files[0])
    }

    async function handleUploadPdfToSupabase(){
        const {data,error} = await supabaseClient.storage.from('job-bpard-public').upload(`/public/${file.name}`, file,{
            cacheControl: "3600",
            upsert: false
        })
        console.log(data,error)
        if(data){
            setCandidateFormData({
                ...candidateFormData,
                resume: data.path
            })
        }
    }

    useEffect(()=>{
        if(file) handleUploadPdfToSupabase()
    },[file])
    function handleTabChange(value) {
        setCurrentTab(value)
    }

    function handleRecruiterFormValie() {
        return (recruiterFormData && recruiterFormData.name.trim() !== '' &&
            recruiterFormData.companyName.trim() !== '' && recruiterFormData.companyRole.trim() !== ''
        )
    }

    function handleCandidateFormValie(){
        return Object.keys(candidateFormData).every((key)=>candidateFormData[key].trim() !== "")
    }

    async function createProfile(){
        const data = currentTab === 'candidate' ? {
            candidateInfo: candidateFormData,
            role:'candidate',
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
        } :{
            recruiterInfo : recruiterFormData,
            role: 'recruiter',
            isPremiumUser:false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
        }
        await createProfileAction(data,'/onboard')
    }

    return (
        <div className="bg-white">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome</h1>
                        <TabsList>
                            <TabsTrigger value="candidate">Candidate</TabsTrigger>
                            <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value="candidate">
                    <CommonForm
                        action={createProfile}
                        formControls={candidateOnboardFormControls}
                        buttonText={'Onboard as candidate'}
                        formData={candidateFormData}
                        setFormData={setCandidateFormData}
                        handleFileChange={handleFileChange}
                        isBtnDisabled={!handleCandidateFormValie()}

                    />
                </TabsContent>
                <TabsContent value="recruiter">
                    <CommonForm
                        formControls={recruiterOnboardFormControls}
                        buttonText={'Onboard as recruiter'}
                        formData={recruiterFormData}
                        setFormData={setRecruiterFormData}
                        isBtnDisabled={!handleRecruiterFormValie()}
                        action={createProfile}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}