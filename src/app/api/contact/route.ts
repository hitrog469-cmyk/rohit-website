import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const name = String(body.name ?? "").trim().slice(0, 100);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: "hitrog469@gmail.com",
    replyTo: email,
    subject: `New message from ${escape(name)} — rohitacharya.com`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#F59E0B;margin-bottom:4px">New contact form submission</h2>
        <p style="color:#888;font-size:13px;margin-top:0">rohitacharya.com</p>
        <hr style="border:none;border-top:1px solid #222;margin:20px 0"/>
        <p><strong>Name:</strong> ${escape(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escape(email)}">${escape(email)}</a></p>
        <p><strong>Message:</strong></p>
        <pre style="background:#111;padding:16px;border-radius:8px;border-left:3px solid #F59E0B;white-space:pre-wrap;font-family:sans-serif">${escape(message)}</pre>
        <hr style="border:none;border-top:1px solid #222;margin:20px 0"/>
        <p style="color:#555;font-size:12px">Hit reply to respond directly to ${escape(name)}.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
