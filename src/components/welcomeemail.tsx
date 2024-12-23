export const emailTemplate = (params: { name: string }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Shamayim</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            color: #333333;
            line-height: 1.6;
        }
        h2 {
            color: #4FA68F;
        }
        p {
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div style="padding: 20px;">
        <h2>Welcome to Shamayim, ${params.name}!</h2>
        <p>We are thrilled to have you as part of our community. Feel free to explore our platform and let us know if you need any assistance.</p>
        <p>Best regards,</p>
        <p><strong>The Shamayim Team</strong></p>
    </div>
</body>
</html>
`;
