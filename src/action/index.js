"use server"

import connectToDB from "@/database"
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

const stripe = require('stripe')('sk_test_51PazNE2M8ZRJ0U26KYnFDi9qVWZhfxwAcmu7kSX9UXKkTxNC2WZ9FMW83LJDhFstV20ShaJnnfqGdAIvZVOKssrR003L0bOzbB')

//create profile action
export async function createProfileAction(formData, pathToRevalidate){
    await connectToDB();
    let test = await Profile.create(formData);
    revalidatePath(pathToRevalidate)
}

//fetch profile info
export async function fetchProfileAction(id){
    await connectToDB();
    const result = await Profile.findOne({userId: id})
    return JSON.parse(JSON.stringify(result))
}

//Create job action
export async function postNewJobAction(formData, pathToRevalidate){
    await connectToDB();
    await Job.create(formData)
    revalidatePath(pathToRevalidate)
}

//fetch job action
//recruiter
export async function fetchJobsForRecruiter(id){
    await connectToDB()
    const result = await Job.find({recruiterId: id});
    return JSON.parse(JSON.stringify(result))
}

//candidate
export async function fetchJobsForCandidate(filterParams={}){
    await connectToDB();
    let updatedParams = {};
    Object.keys(filterParams).forEach(filterKey =>(
        updatedParams[filterKey] = {$in: filterParams[filterKey].split(",")}
    ))
    console.log("updatedParams = ",updatedParams)
    const result = await Job.find(filterParams && Object.keys(filterParams).length>0 ? updatedParams : {}
);
    return JSON.parse(JSON.stringify(result))
}

//Create job application
export async function createJobApplicationAction(data, pathToRevalidate){
    await connectToDB();
    await Application.create(data)
    revalidatePath(pathToRevalidate)
}


//fetch job application
//candidate
export async function fetchJobAppliationsForCandidate(candidateID){
    await connectToDB();
    const result = await Application.find({candidateUserId: candidateID})
    return JSON.parse(JSON.stringify(result))
}
//recruiter
export async function fetchJobAppliationsForRecruiter(recruiterID){
    await connectToDB();
    const result = await Application.find({recruiterUserId: recruiterID})
    return JSON.parse(JSON.stringify(result))
}
//update job application
export async function updateJobApplicationAction(data, pathToRevalidate){
    await connectToDB()
    const {recruiterUserId, name, email, candidateUserId, status, jobId, _id, jobAppliedDate} = data
    await Application.findOneAndUpdate({
        _id: _id
    },{
        recruiterUserId, name, email, candidateUserId, status, jobId, jobAppliedDate
    },
    {
        new: true
    });
    revalidatePath(pathToRevalidate)
}

//get candidate details by candidate id
export async function getCandidateDetailsByIDAction(currentCandidateID){
    await connectToDB();
    const result = await Profile.findOne({userId: currentCandidateID})

    return JSON.parse(JSON.stringify(result))
}

//create filter categories
export async function createFilterCategoryAction(){
    await connectToDB();
    const result = await Job.find({})
    return JSON.parse(JSON.stringify(result))
}

//update profile action
export async function updateProfileAction(data, pathToRevalidate){
    await connectToDB();
    
    const {
        userId,
        role, email, isPremiumUser,
        memberShipType, memberShipStartDate ,memberShipEndDate, 
        recruiterInfo, candidateInfo, _id
    } = data

    console.log(" userId", userId,
        role, email, isPremiumUser,
        memberShipType, memberShipStartDate ,memberShipEndDate, 
        recruiterInfo, candidateInfo, _id)

    let data1 = await Profile.findOneAndUpdate({
        _id: _id
    },{
        userId,
        role, email, isPremiumUser,
        memberShipType, memberShipStartDate ,memberShipEndDate, 
        recruiterInfo, candidateInfo
    }, {new: true})
    revalidatePath(pathToRevalidate)
}

//create stripe price id based on tier selection
export async function createPriceIdAction(data){
    const session = await stripe.prices.create({
        currency:'inr',
        unit_amount: data?.amount * 100,
        recurring:{
            interval: 'year'
        },
        product_data:{
            name: 'Premium Plan'
        }
    })

    return{
        success: true,
        id: session?.id
    }
}

//create payment logic
export async function createStripePaymentAction(data){
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: data?.lineItems,
        mode: 'subscription',
        success_url:'http://localhost:3000/membership' + "?status=success",
        cancel_url:'http://localhost:3000/membership' + "?status=cancel",
    })

    return{
        success: true,
        id: session?.id
    }
}