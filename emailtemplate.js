
const getEmailTemplate = (name) =>{
    return `

    <html>
      <body>
        <h1>Hello, ${name}!</h1>
        <p>Welcome to our newsletter. We're excited to have you here!</p>
      </body>
    </html>
  `;
}

module.exports = { getEmailTemplate };