<!DOCTYPE html>
<html>
<head>
    <title>Password Reset</title>
</head>
<body>
    <h1>Password Reset Request</h1>
    <p>Hello {{ $user->name }},</p>
    <p>We received a request to reset your password. Click the button below to reset it:</p>
    <a href="{{ $resetUrl }}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>If you didn't request a password reset, please ignore this email.</p>
    <p>Thank you!</p>
    <p>Regards,<br>FTO</p>
</body>
</html>
