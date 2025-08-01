import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import InterviewCard from '@/components/InterviewCard'
import { dummyInterviews } from '@/constants'
import { getCurrentUser, getInterviewById } from '@/lib/actions/auth.action'
import { getLatestInterviews } from '@/lib/actions/general.action'

const page = async() => {

  const user = await getCurrentUser();

  const [userInterviews, latestInterviews]= await Promise.all([
    await getInterviewById(user?.id!),
    getLatestInterviews({userId:user?.id!})
  ])


  // const userInterviews = await getInterviewById(user?.id!);
  // const latestInterviews = await getLatestInterviews({userId:user?.id!});

  const hasPastInterviews = userInterviews!.length > 0;
  const hasUpcomingInterviews = latestInterviews!.length > 0;


  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2> Get Interview-ready with AI-Powered Practice & Feedback</h2>
        <p className='text-lg'>Practice on Real Interview Questions and Get Instant Feedback</p>
        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href="/interview">Start my Interview</Link>
        </Button>
      </div>
      <Image src="/robot.png" alt="robot" width={400} height={400} className='max-sm:hidden' />

    </section>

    <section className='flex flex-col gap-6 mt-8'>

      <h2> Your Interviews</h2>

      <div className='interviews-section'>
        {hasPastInterviews ?(
          userInterviews?.map((interview) => (
            <InterviewCard {... interview} key={interview.id}/>
          ))):
          (
            <p> You haven&apos;t taken any interviews yet.</p>)}
      </div>
      </section>

     <section className='flex flex-col gap-6 mt-8'>

      <h2> Take an Interview</h2>

      <div className='interviews-section'>
        {hasUpcomingInterviews ?(
          latestInterviews?.map((interview) => (
            <InterviewCard {... interview} key={interview.id}/>
          ))):
          (
            <p> There are no Interviews available.</p>)}
      </div>
      </section>




    </>
  )
}

export default page