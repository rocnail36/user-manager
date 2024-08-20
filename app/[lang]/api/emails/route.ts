import { VerificationEmail } from "@/components/emails/verificationEmail";
import { resend } from "@/lib/email/index";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("assdsdsssssssss")
  const body = await request.json();
  const { name, email } = body;
  console.log(body)
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Hello world!",
      react: VerificationEmail({verificationLink:"hola"}),
      text: "Email powered by Resend.",
    });
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    console.log(error,"aqui error")
    return NextResponse.json({ error });
  }
}
