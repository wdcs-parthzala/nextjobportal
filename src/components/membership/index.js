'use client'

import { membershipPlans } from "@/utils"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import { createPriceIdAction, createStripePaymentAction, updateProfileAction } from "@/action"
import { loadStripe } from "@stripe/stripe-js"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const stripePromise = loadStripe('pk_test_51PazNE2M8ZRJ0U26kikx4Pnt5INLa7L5xNSZTEDAaaNcAhpxuvL1gY6E4XVA1J6VGFTTS4kVKoEoEgz83XenNtWS00cgs0xfgv')

export default function Membership({profileInfo}) {
    const pathName = useSearchParams()
    async function handlePayment(getCurrentPlan){
        const stripe = await stripePromise
        const extractPriceId = await createPriceIdAction({
            amount: Number(getCurrentPlan?.price)
        })

        if(extractPriceId){
            sessionStorage.setItem('currentPlan',JSON.stringify(getCurrentPlan))
            const result = await createStripePaymentAction({
                lineItems: [
                    {
                        price: extractPriceId?.id,
                        quantity: 1
                    }
                ]
            })
            console.log("result = ",result)
            await stripe.redirectToCheckout({
                sessionId: result?.id
            })
        }
    }

    async function updateProfile(){
        const fetchCurrentPlanFromStorage = JSON.parse(sessionStorage.getItem('currentPlan'))
        await updateProfileAction({
            ...profileInfo,
            isPremiumUser: true,
            memberShipType: fetchCurrentPlanFromStorage?.type,
            memberShipStartDate: new Date().toString(),
            memberShipEndDate: new Date(
                new Date().getFullYear() + fetchCurrentPlanFromStorage?.type === 'basic' ?1 :
                fetchCurrentPlanFromStorage?.plan === 'teams' ? 2 :5,
                new Date().getMonth(),
                new Date().getDay()

            )
        }, '/membership')
    }
    useEffect(()=>{
        if(pathName.get('status') === "success") updateProfile()
    },[pathName])


    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-950">
                   {
                    profileInfo?.isPremiumUser ? "You are a premium user" : ' Choose your plan'
                   }
                </h1>
                <div>
                    {
                        profileInfo?.isPremiumUser ?
                        <Button>
                            {membershipPlans.find(planItem => planItem.type === profileInfo?.memberShipType).heading}
                        </Button> : null
                    }
                </div>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                        {
                            membershipPlans.map((plan,index) =>
                                <CommonCard        
                                    key={plan.heading}                        
                                    icon={<JobIcon />}
                                    title={`${plan.price} /yr`}
                                    description={plan.type}
                                    footerContent={
                                        profileInfo?.memberShipType === 'enterprise' || (
                                            profileInfo?.memberShipType === 'basic' && index === 0
                                        ) || (profileInfo?.memberShipType === 'teams' && index >=0 && index < 2 ? null :  <Button
                                            onClick={()=> handlePayment(plan)}
                                            className="flex h-11 items-center justify-center px-5"
                                        >{
                                            profileInfo?.memberShipType === 'basic' ||
                                            profileInfo?.memberShipType === 'teams' ? 'Update Plan' :'Get Premium'
                                        }</Button>)
                                       
                                    }
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}