export const emailTemplate = ({ resetLink }: { resetLink: string }) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset Verification</title>
<style type="text/css">
/* General Email Styles */
body {
    width: 100% !important;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    margin: 0;
    padding: 0;
}
img {
    outline: none;
    text-decoration: none;
    -ms-interpolation-mode: bicubic;
}
a img {
    border: none;
}
table {
    border-collapse: collapse;
}
</style>
</head>

<body bgcolor="#ffffff" text="#26081A" link="#d06224" yahoo="fix" style="background-color: #ffffff;">
  <table cellspacing="0" cellpadding="0" border="0" role="presentation" class="nl2go-body-table" width="100%" style="background-color: #ffffff; width: 100%;">
    <tr><td align="center" class="r1-i" style="background-color: #ffffff;">
      <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" align="center" class="r0-o" style="table-layout: fixed; width: 600px;">
        <tr><td valign="top" class="r3-i" style="background-color: #ffffff; padding-top: 14px;">
          <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
            <tr><th width="100%" valign="top" class="r4-c" style="font-weight: normal;">
              <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" align="center" class="r0-o" style="table-layout: fixed;">
                <tr><td class="r6-i" style="padding-top: 14px;">
                  <h2 style="color: #4F1337; font-family: Arial, Helvetica, sans-serif; font-size: 24px; text-align: center;">Password Reset Request</h2>
                  <p style="color: #26081A; font-family: Arial, Helvetica, sans-serif; font-size: 16px; text-align: center; line-height: 1.5;">
                    Hi, <br/> You requested to reset your password. Please click the link below to complete the process:
                  </p>
                  <p style="color: #4FA68F; font-size: 16px; text-align: center;">
                    <a href="${resetLink}" target="_blank" style="color: #d06224; text-decoration: none;">Reset Your Password</a>
                  </p>
                  <p style="color: #26081A; font-family: Arial, Helvetica, sans-serif; font-size: 16px; text-align: center;">
                    If you did not request a password reset, please ignore this email.
                  </p>
                  <p style="color: #26081A; font-family: Arial, Helvetica, sans-serif; font-size: 14px; text-align: center;">
                    Need help? Contact us at <a href="mailto:support@shamayim.com" style="color: #d06224;">support@shamayim.com</a>
                  </p>
                </td></tr>
              </table>
            </th></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`;
