import AuthPage from "@/app/components/auth/AuthPage";
import SignupForm from "@/app/components/auth/SignupForm";

export default function SignUp(){
  return(
    <>
      <AuthPage>
        <h3>let&apos;s create your account.</h3>
        <SignupForm />
      </AuthPage>
    </>
  )
}