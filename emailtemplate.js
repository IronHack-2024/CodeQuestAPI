// const example = (questionRandom) => {
//     console.log("🚀 ~ example ~ questionRandom:", questionRandom)
   

//     const [{ question, answerOptions }] = questionRandom;
//     const [{ answer, isCorrect }] = answerOptions; 
//     console.log("🚀 ~ example ~ question:", question);
//     console.log("🚀 ~ example ~ answer:", questionRandom[0].answerOptions[1].answer)

   
   
// }


const getEmailTemplate = (name, questionRandom) =>{
   const { question, answerOptions } = questionRandom;
   const [{ answer, isCorrect }] = answerOptions; 
   console.log("🚀 Opcion 1", questionRandom[0].answerOptions[0].answer);
   console.log("🚀 Opcion 2", questionRandom[0].answerOptions[1].answer)

   // Encontrar el índice donde `isCorrect` es true
   const correctAnswerIndex = answerOptions.findIndex(option => option.isCorrect === true);
   const correctAnswer = questionRandom[0].answerOptions[correctAnswerIndex].answer

   // console.log("Descructed Answer", question, answer, isCorrect);
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Weekly Question</title>
        
        <!-- Reset style para compatibilidad con email -->
        <style type="text/css">
            /* PReviene gaps entre imagenes en Outlook */
            img {
                display: block;
                border: 0;
                line-height: 100%;
                text-decoration: none;
                -ms-interpolation-mode: bicubic; /* para el escalado de imagenes suave en Outlook */
            }
            /* Reset general para clientes email */
            body, table, td, a {
                text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%; /* Previene escalado de fuentes con cleintes con WebKit */
            }
            table, td {
                border-collapse: collapse; /* Asegura bordes de table con comportamiento predecible */
            }
        </style>
    </head>
    
    <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <!-- Main Container -->
                    <table width="640" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; font-family: Arial, sans-serif; border-collapse: collapse; text-align: center;">
                        <!-- Header -->
                        
                        <tr>
                            <td width="50%" style="padding: 8px; background-color: #003407;">
                                <h1 style=" color: #FFFFFF; font-size: 24px; margin: 0;">Code Quest API Subscription</h1>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%" style="background-color: #003407; padding: 20px;">
                                <img src="https://mcusercontent.com/950aade7ef40ce13abf1178e1/images/910f2a3f-a945-ad20-7944-b850eb069a21.png" alt="Space Invader Logo" style="display: block; margin: 0 auto 8px; width: 80px; max-width: 100%; height: auto;">
                            </td>
                        </tr>                    
                        
                        <!-- Title Section -->
                        <tr>
                            <td style="background-color: #003407; padding: 20px; text-align: center;">
                                <h1 style="font-family: 'Press Start 2P', Arial, sans-serif; font-size: 20px; color: #41FD5B; margin: 0;">Welcome to the Quest!</h1>
                            </td>
                        </tr>
                        
                        <!-- Body Section - Welcome message -->
                        <tr>
                            <td style="padding: 20px 80px; font-size: 16px; color: #333333; line-height: 1.5;">
                                <p style="margin: 0;">Hello Space Quester, ${name}!.</p>
                                <p style="margin: 0;">Here is your weekly subscription to our <strong>Code Quest</strong>! with a random coding question from our API.</p>
                            </td>
                        </tr>
                                <!-- Content Section -->
                            <tr>
                                <td style="padding: 10px; font-size: 16px; color: #333; text-align: center; line-height: 1.5;">
                                    <p style="margin: 0; font-family: 'Oxygen', Arial, sans-serif;">You are now part of an amazing coding challenge.</p>
                                    <p style="margin: 0; font-family: 'Oxygen', Arial, sans-serif;">Let’s conquer the next level!</p>
                                </td>
                            </tr>
                        <!-- Question Section -->
                        <tr>
                            <td style="padding: 40px 80px; background-color: #003407; color: #FFFFFF; font-size: 18px;">
                                <p style="margin: 0; font-weight: bold;">The question of the week is:</p>
                                <p style="margin: 20px 0; color: #41FD5B;">${question}</p>
                                <table width="100%" border="0" cellspacing="0" cellpadding="10">
                                    <tr>
                                        <td style="color: #41FD5B;">
                                            <div style="border: #41FD5B solid 4px; border-radius: 4px;background-color: #007410; padding: 4px 0px">A: ${questionRandom[0].answerOptions[0].answer} </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="color: #41FD5B;">
                                            <div style="border: #41FD5B solid 4px; border-radius: 4px;background-color: #007410; padding: 4px 0px">B: 443</div></td>
                                    </tr>
                                    <tr>
                                        <td style="color: #41FD5B;">
                                            <div style="border: #41FD5B solid 4px; border-radius: 4px;background-color: #007410; padding: 4px 0px">C: 21
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="color: #41FD5B;">
                                            <div style="border: #41FD5B solid 4px; border-radius: 4px;background-color: #007410; padding: 4px 0px">D: 25
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; font-size: 16px; background-color: #003407; color: #FFFFFF; line-height: 1.5;">
                                <p style="margin: 0;">Do you know it already or would you prefer to have a little help?</p>
                                <p style="margin: 0;">Here is the answer so you can check your success.</p>
                            </td>
                        </tr>
                        <!-- Answer Section -->
                        <tr>
                            <td style="padding: 10px; text-align: center; font-size: 16px; background-color: #003407; color: #FFF;">
    
                                <!-- Details Element -->
                                <details style="font-family: 'Oxygen', Arial, sans-serif; padding-bottom: 40px;">
                                    <summary style="cursor: pointer; color: #41FD5B; font-weight: bold; ">Show the correct answer</summary>
                                    <p style="margin: 10px 0 0; color: #FFF;">The correct answer is <span style="color: #41FD5B;"><strong> ${correctAnswer}</strong></span>.</p>
                                </details>
    
                                <!-- Alternative Text for Unsupported Clients -->
                                <noscript>
                                    <p style="color: #333;">The correct answer is <span style="color: #41FD5B;"><strong> 80</strong></span>.</p>
                                </noscript>
                            </td>
                        </tr>
    
                        <!-- Learn More message  -->
                        <tr>
                            <td style="padding: 20px 80px; font-size: 16px; color: #003407; line-height: 1.5;">
                                <p style="margin: 0;">If you enjoyed it and want to Know more about us and our project, click the link below.</p>
                                
                            </td>
                        </tr>
                        <!-- Learn More Button -->
    
                        <tr>
                            <td style="padding: 20px;">
                                <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #41FD5B; color: #003407; border: 4px solid #003407; text-decoration: none; border-radius: 4px; font-weight: bold;">Learn More</a>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px; font-size: 12px; color: #666666; text-align: center;">
                                <p style="margin: 0;">
                                    <a href="#" style="color: #666666; text-decoration: none;">View email in browser</a> | 
                                    <a href="#" style="color: #666666; text-decoration: none;">Update your preferences</a> | 
                                    <a href="https://gmail.us22.list-manage.com/unsubscribe?u=950aade7ef40ce13abf1178e1&id=58371aa183&t=1" style="color: #666666; text-decoration: none;">Unsubscribe</a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    
`        
}

module.exports = {  getEmailTemplate }