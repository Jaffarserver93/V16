import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { access_token, guild_id } = await request.json()

    // Get user ID first
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userData = await userResponse.json()

    // Add user to guild
    const joinResponse = await fetch(`https://discord.com/api/guilds/${guild_id}/members/${userData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token,
      }),
    })

    if (joinResponse.ok || joinResponse.status === 204) {
      return NextResponse.json({ success: true })
    } else {
      const errorData = await joinResponse.json()
      throw new Error(errorData.message || "Failed to join server")
    }
  } catch (error) {
    console.error("Discord server join error:", error)
    return NextResponse.json({ error: "Failed to join Discord server" }, { status: 500 })
  }
}
