'use server';

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";


const ONE_WEEK = 60 * 60 * 24 * 7; // 1 week in seconds
export async function signUp(params: SignUpParams){
    const { uid, name, email } = params;

    try {

        const userRecord = await db.collection('users').doc(uid).get();
        if (userRecord.exists) {
            return {
                success: false,
                error: 'User already exists. Please sign in instead.'
            };
        }

        await db.collection('users').doc(uid).set({
            name,
            email
        });

        return {
            success: true,
            message: 'User created successfully. Please sign in to continue.'
        }
        
    } catch (error: any) {
        console.error('Error in setting up the account:', error);
        if(error.code === 'auth/email-already-in-use') {
            return{
                success: false,
                error: 'Email already in use.'
            }
        }
        return {
            success: false,
            error: 'An error occurred while setting up the account.'
        }

        
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
    try {

        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success: false,
                error: 'User not found. Please sign up first.'
            };
        }

        await setSessionCookies(idToken);


        
    } catch (error) {

        console.error('Error signing in:', error);
        return {
            success: false,
            error: 'An error occurred while signing in.'
        }
        
    }



}


export async function setSessionCookies(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK*1000 });
    cookieStore.set({
        name: 'session',
        value: sessionCookie,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: ONE_WEEK,
        path: '/'
    });


};


export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        console.log('Attempting to verify session cookie...');
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        console.log('Session cookie decoded. UID:', decodedClaims.uid);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();
        console.log('User record exists:', userRecord.exists);
        if (!userRecord.exists) {
            console.log('User record does not exist for UID:', decodedClaims.uid);
            return null;
        }

        console.log('User data retrieved:', userRecord.data());
        return{
            ...userRecord.data(),
            id: userRecord.id,
        }as User;
       
    } catch (error) {
        console.error('Error verifying session cookie or fetching user record:', error);
        return null;
    }
}


export async function isAuthenticated(){
    const user = await getCurrentUser();
    // if user exists, it returns true, otherwise false
    return !!user; 
}


export async function getInterviewById(userId: string): Promise<Interview[] | null> {
    const interview = await db.collection("interviews").where("userId", "==", userId).orderBy("createdAt", "desc").get();

    return interview.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))as Interview[];
    
}


export async function getlatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {

    const {userId, limit=20} = params;
    const interview = await db.collection("interviews")
                                .orderBy("createdAt", "desc")
                                .where("finalized", "==", true)
                                .where("userId", "!=", userId)
                                .limit(limit).get();

    return interview.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))as Interview[];
    
}