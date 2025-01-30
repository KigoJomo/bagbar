import AuthPage from "@/app/components/auth/AuthPage";
import LoginForm from "@/app/components/auth/LoginForm";

export default function Login(){
  return(
    <>
      <AuthPage>
        <h3>log in to your account.</h3>
        <LoginForm />
      </AuthPage>
    </>
  )
}