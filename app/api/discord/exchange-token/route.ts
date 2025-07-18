import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { code } = await request.json()

  if (!code) {
    return NextResponse.json({ error: "Missing code parameter" }, { status: 400 })
  }

  const clientId = process.env.DISCORD_CLIENT_ID
  const clientSecret = process.env.DISCORD_CLIENT_SECRET
  const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI

  if (!clientId || !clientSecret || !redirectUri) {
    console.error("Missing Discord environment variables!")
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
  })

  try {
    const tokenResponse = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error("Discord token exchange failed:", errorData)
      return NextResponse.json(
        { error: "Failed to exchange code for token", details: errorData },
        { status: tokenResponse.status },
      )
    }

    const { access_token, token_type, expires_in, refresh_token, scope } = await tokenResponse.json()

    // Use the access token to fetch user data
    const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    })

    if (!userResponse.ok) {
      const errorData = await userResponse.json()
      console.error("Discord user fetch failed:", errorData)
      return NextResponse.json(
        { error: "Failed to fetch user data", details: errorData },
        { status: userResponse.status },
      )
    }

    const userData = await userResponse.json()

    // Fetch user's email if the 'email' scope was granted
    let userEmail = null
    if (scope.includes("email")) {
      const emailResponse = await fetch("https://discord.com/api/v10/users/@me", {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      })
      if (emailResponse.ok) {
        const emailData = await emailResponse.json()
        userEmail = emailData.email
      } else {
        console.warn("Could not fetch user email from Discord.")
      }
    }

    return NextResponse.json({
      access_token,
      token_type,
      expires_in,
      refresh_token,
      scope,
      user: {
        id: userData.id,
        username: userData.username,
        discriminator: userData.discriminator,
        avatar: userData.avatar,
        email: userEmail, // Include email if fetched
      },
    })
  } catch (error) {
    console.error("Error during Discord OAuth process:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
