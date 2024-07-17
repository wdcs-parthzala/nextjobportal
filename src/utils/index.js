import queryString from "query-string"

export const recruiterOnboardFormControls = [{
    label: 'name',
    name: 'name',
    placeholder: 'Enter your name',
    componentType: 'input'
},
{
    label: 'Company Name',
    name: 'companyName',
    placeholder: 'Enter your Company Name',
    componentType: 'input'
},
{
    label: 'Company Role',
    name: 'companyRole',
    placeholder: 'Enter your Company Name',
    componentType: 'input'
}
]

export const initialRecruiterFormData = {
    name: '',
    companyName: '',
    companyRole: '',
}

export const candidateOnboardFormControls = [{
    label: 'resume',
    name: 'Resume',
    componentType: 'file'
},{
    label: 'name',
    name: 'name',
    placeholder: 'Enter your name',
    componentType: 'input'
},
{
    label: 'Current Company',
    name: 'currentCompany',
    placeholder: 'Enter your current company',
    componentType: 'input'
},
{
    label: 'Current Job Location',
    name: 'currentJobLocation',
    placeholder: 'Enter your job location',
    componentType: 'input'
},
{
    label: 'Preferred Job Location',
    name: 'preferredJobLocation',
    placeholder: 'Enter your preferred job location',
    componentType: 'input'
},
{
    label: 'Current Salary',
    name: 'currentSalary',
    placeholder: 'Enter your current salary',
    componentType: 'input'
},
{
    label: 'Notice Period',
    name: 'noticeperiod',
    placeholder: 'Enter your current salary',
    componentType: 'input'
},
{
    label: 'Skills',
    name: 'skills',
    placeholder: 'Enter your Skills',
    componentType: 'input'
},
{
    label: 'Previous Companies',
    name: 'previousCompanies',
    placeholder: 'Enter your previous Companies',
    componentType: 'input'
},
{
    label: 'Total Experience',
    name: 'totalExperience',
    placeholder: 'Enter your total experience',
    componentType: 'input'
},
{
    label: 'College',
    name: 'college',
    placeholder: 'Enter your college',
    componentType: 'input'
},
{
    label: 'College Location',
    name: 'collegeLocation',
    placeholder: 'Enter your college location',
    componentType: 'input'
},
{
    label: 'Graduated Year',
    name: 'graduatedYear',
    placeholder: 'Enter your graduated year',
    componentType: 'input'
},
{
    label: 'Linkedin Profile',
    name: 'linkedinProfile',
    placeholder: 'Enter your linkeding profile',
    componentType: 'input'
},
{
    label: 'Github Profile',
    name: 'githubProfile',
    placeholder: 'Enter your github profile',
    componentType: 'input'
}
]

export const initialCandidateFormData = {
    resume:'',
    name:'',
    currentJobLocation:'',
    preferredJobLocation:'',
    currentSalary:'',
    // noticePeriod:'',
    skills:'',
    currentCompany:'',
    previousCompanies:'',
    totalExperience:'',
    college:'',
    collegeLocation:'',
    graduatedYear:'',
    linkedinProfile:'',
    githubProfile:'',
}

export const initialCandidateAccountFormData = {
    name:'',
    currentJobLocation:'',
    preferredJobLocation:'',
    currentSalary:'',
    // noticePeriod:'',
    skills:'',
    currentCompany:'',
    previousCompanies:'',
    totalExperience:'',
    college:'',
    collegeLocation:'',
    graduatedYear:'',
    linkedinProfile:'',
    githubProfile:'',
}

export const postNewJobFormControls = [
    {
        label: 'Company Name',
        name: 'companyName',
        placeholder: 'Company Name',
        componentType: 'input',
        disabled: true
    },
    {
        label: 'Title',
        name: 'title',
        placeholder: 'Job title',
        componentType: 'input'
    },
    {
        label: 'Type',
        name: 'type',
        placeholder: 'Job type',
        componentType: 'input'
    },
    {
        label: 'Location',
        name: 'location',
        placeholder: 'Job Location',
        componentType: 'input'
    },
    {
        label: 'Experience',
        name: 'experience',
        placeholder: 'Experience',
        componentType: 'input'
    },
    {
        label: 'Description',
        name: 'description',
        placeholder: 'Description',
        componentType: 'input'
    },
    {
        label: 'Skills',
        name: 'skills',
        placeholder: 'Skills',
        componentType: 'input'
    },
]

export const initialPostNewJobFormData = {
    companyName:'',
    title:'',
    type:'',
    location:'',
    experience:'',
    description:'',
    skills:''
}

export const filterMenuDataArray = [
    {
        _id:'companyName',
        label: 'Company Name'
    },
    {
        _id:'title',
        label: 'Title'
    },
    {
        _id:'type',
        label: 'Type'
    },
    {
        _id:'location',
        label: 'Location'
    }
]

export function formUrlQuery({params, dataToAdd}){
    let currentUrl = queryString.parse(params)

    if(Object.keys(dataToAdd).length > 0){
        Object.keys(dataToAdd).map(key=> {
            if(dataToAdd[key].length === 0) delete currentUrl[key]
            else currentUrl[key] = dataToAdd[key].join(',')
        })
    }
    return queryString.stringifyUrl({
        url: window.location.pathname,
        query: currentUrl
    },{
        skipNull: true
    })
}

export const membershipPlans=[
    {
        heading:'Tier 1',
        price: 100,
        type: 'basic'
    },
    {
        heading:'Tier 2',
        price: 250,
        type: 'teams'
    },
    {
        heading:'Tier 3',
        price: 1000,
        type: 'enterprise'
    }
]