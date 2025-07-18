import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { userId, accessToken } = await request.json()

  if (!userId || !accessToken) {
    return NextResponse.json({ error: "Missing userId or accessToken" }, { status: 400 })
  }

  const botToken = process.env.DISCORD_BOT_TOKEN
  const guildId = process.env.DISCORD_GUILD_ID

  if (!botToken || !guildId) {
    return NextResponse.json({ error: "Server not configured for Discord bot" }, { status: 500 })
  }

  try {
    // Add user to guild
    const addMemberResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    })

    if (!addMemberResponse.ok) {
      const errorData = await addMemberResponse.json()
      console.error("Failed to add member to guild:", errorData)
      return NextResponse.json(
        { error: "Failed to add user to Discord server", details: errorData },
        { status: addMemberResponse.status },
      )
    }

    return NextResponse.json({ message: "User successfully added to Discord server" })
  } catch (error) {
    console.error("Error joining Discord server:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
