import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'
import { ca } from 'zod/v4/locales';

enum CallStatus{
    INACTIVE ="INACTIVE",
    ACTIVE = "ACTIVE",
    CONNECTING = "CONNECTING",
    FINISHED= "FINISHED",
}



const Agent = ({userName}:AgentProps) => {

    const callStatus= CallStatus.ACTIVE; // This can be a prop or state to control the call status

    const isSpeaking = true; // This can be a prop or state to control the speaking status
    
    const messages = [
        "What is your name?",
        "Hello, I am Krishna Kumar, an interviewee."
    ]

    const lastMessage = messages[messages.length - 1];

    
  return (

    <>

    <div className='call-view'>
      <div className='card-interviewer'>
        <div className='avatar'>
            <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className='object-cover' />

            {isSpeaking && <span className='animate-speak'></span>}
        </div>
            <h3>AI Interviewer</h3>
      </div>

            <div className='card-border'>
                <div className='card-content'>
                    <Image src="/user-avatar.png" alt="user" width={540} height={540} className='rounded-full object-cover size-[120px]' />
                    <h3 className='text-center'>{userName}</h3>
                </div>
            </div>
    </div>

    { messages.length > 0 &&(
        <div className='transcript-border'>
            <div className='transcript'>
                <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0', 
                    'animate-fadeIn opacity-100')}>{lastMessage}</p>

            </div>
        </div>
    )

    }






    <div className='w-full flex justify-center'>

        {callStatus !== 'ACTIVE' ?
        (
            <button className='relative btn-call'>
                <span className={cn('absolute animate-ping roudned-full opacity-75', callStatus!=="CONNECTING" && 'hidden')} />
                    
                <span>{callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '...'}</span>
            </button>
        )   : (
            <button className='btn-disconnect'>
                End
            </button>
        )}

        


    </div>
    
    
    
    </>


    
  )
}

export default Agent