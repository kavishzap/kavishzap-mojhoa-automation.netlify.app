import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Log the form submission (in production, you'd send this to your email service or database)
    console.log("[v0] Contact form submission:", {
      name,
      email,
      phone,
      company,
      service,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In production, you would:
    // 1. Send email via SendGrid, Resend, or similar
    // 2. Store in database
    // 3. Send to CRM
    // 4. Trigger notifications

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
