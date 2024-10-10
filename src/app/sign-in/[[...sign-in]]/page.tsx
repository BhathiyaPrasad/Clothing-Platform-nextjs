import { SignIn } from "@clerk/nextjs";

export async function generateStaticParams() {
  return [
    { 'sign-in': [] } // default parameter for the root "/sign-up" route
  ];
}


export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col gap-10">
      <h1 className="text-4xl font-bod mt-20"></h1>
      <SignIn afterSignInUrl="/product/cart" />
    </div>
  )
}