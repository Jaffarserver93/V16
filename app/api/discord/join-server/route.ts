import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { accessToken, userId, guildId } = await request.json()

  if (!accessToken || !userId || !guildId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  try {
    const botToken = process.env.DISCORD_BOT_TOKEN
    if (!botToken) {
      throw new Error("Discord bot token not configured.")
    }

    // Add user to guild
    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    })

    if (response.ok) {
      return NextResponse.json({ message: "User added to guild successfully" })
    } else {
      const errorData = await response.json()
      console.error("Failed to add user to guild:", errorData)
      return NextResponse.json(
        { error: "Failed to add user to guild", details: errorData },
        { status: response.status },
      )
    }
  } catch (error) {
    console.error("Error joining Discord server:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
