const puppeteer = require("puppeteer");

async function generatePDF() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const userInfo = {
      firstName: "Jane",
      lastName: "Doe",
      relationName: "Jane Doe",
      relation: "Father",
      email: "john.doe@example.com",
      phone: "+1234567890",
      CNIC: "12345-6789012-3",
    };

    const dealInfo = {
      productType: "Appartment",
      measuringUnit: "Unit",
      unitPrice: "PKR 13,000",
      totalPrice: "PKR 1,300,000",
      discountPercentage: "10%",
      dealType: "Sale",
      duration: "1 year",
      rentPercentage: "3%",
      createdAt: "January 1, 2023",
    };

    const installmentData = [
      { month: "January", date: "2024-01-15", amount: "$500", type: "Type A" },
      { month: "February", date: "2024-02-15", amount: "$500", type: "Type B" },
      { month: "March", date: "2024-03-15", amount: "$500", type: "Type C" },
      { month: "January", date: "2024-01-15", amount: "$500", type: "Type A" },
      { month: "February", date: "2024-02-15", amount: "$500", type: "Type B" },
      { month: "March", date: "2024-03-15", amount: "$500", type: "Type C" },
      { month: "January", date: "2024-01-15", amount: "$500", type: "Type A" },
      { month: "February", date: "2024-02-15", amount: "$500", type: "Type B" },
      { month: "March", date: "2024-03-15", amount: "$500", type: "Type C" },
      { month: "January", date: "2024-01-15", amount: "$500", type: "Type A" },
      { month: "February", date: "2024-02-15", amount: "$500", type: "Type B" },
      { month: "March", date: "2024-03-15", amount: "$500", type: "Type C" },
      // Add more installment data as needed
    ];

    const userInfoLabels = {
      firstName: "First Name",
      lastName: "Last Name",
      relationName: "Relation Name",
      relation: "Relation",
      email: "Email",
      phone: "Phone",
      CNIC: "CNIC",
    };

    const dealInfoLabels = {
      productType: "Product Type",
      measuringUnit: "Measuring Unit",
      unitPrice: "Unit Price",
      totalPrice: "Total Price",
      discountPercentage: "Discount Percentage",
      dealType: "Deal Type",
      duration: "Duration",
      rentPercentage: "Rent Percentage",
      createdAt: "Booked At",
    };

    // Populate user info
    let userInfoHTML = "";
    userInfoHTML += '<div class="info">';
    Object.keys(userInfo).forEach((key) => {
      userInfoHTML += `<p><strong>${userInfoLabels[key]}:</strong> ${userInfo[key]}</p>`;
    });
    userInfoHTML += "</div>";

    // Populate deal info
    let dealInfoHTML = "";
    dealInfoHTML += '<div class="info">';
    Object.keys(dealInfo).forEach((key) => {
      dealInfoHTML += `<p><strong>${dealInfoLabels[key]}:</strong> ${dealInfo[key]}</p>`;
    });
    dealInfoHTML += "</div>";

    // Populate installment info
    let installmentTableHTML = `<table id="installmentTable">
                                  <thead>
                                    <tr>
                                      <th>Month</th>
                                      <th>Date</th>
                                      <th>Amount</th>
                                      <th>Type</th>
                                    </tr>
                                  </thead>
                                  <tbody>`;
    installmentData.forEach((installment) => {
      installmentTableHTML += `<tr>
                                  <td>${installment.month}</td>
                                  <td>${installment.date}</td>
                                  <td>${installment.amount}</td>
                                  <td>${installment.type}</td>
                                </tr>`;
    });
    installmentTableHTML += `</tbody></table>`;

    // Load HTML content into the page
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          
          .container {
            max-width: 800px;
            -webkit-print-color-adjust: exact;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
           margin-bottom: 50px;
          }
          
          .header {
            position  : fixed ;
            top : 0 ;
            width : 100% ;
            text-align: center;
            padding: 10px;
            margin-bottom : 10px;
            background-color: #0e1a4e;
          }
          
          .header img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 3px solid #ffffff;
          }
          
          .section {
            padding: 20px;
            background-color: #ffffff;
            margin-left: 20px;
            margin-right : 20px;
          }
          
          h2 {
            color: #0e1a4e;
            font-size: 24px;
            margin-bottom: 10px;
            text-align: center;
          }
          
          .info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            margin-bottom: 20px;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            background-color: #f9f9f9;
            color: #333;
            font-size: 14px;
          }
          .info p {
            margin: 5px 0;
          }
          
          .info strong {
            color: #0e1a4e;
            font-weight: bold;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            overflow-x: auto;
          }
          
          th,
          td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #dddddd;
          }
          
          th {
            background-color: #0e1a4e;
            color: #ffffff;
            font-size: 18px;
          }
          
          td {
            font-size: 16px;
          }
          
          .closing {
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: #0e1a4e;
            color: #ffffff;
            padding: 7px;
            text-align: center;
          }   
          .content{
            margin-top : 100px ;
            margin-bottom : 100px ;
            padding-bottom : 100px ;
          }
          @media (max-width: 600px) {
            .section {
              display: flex;
              flex-direction: column;
            }
          
            .info {
              grid-template-columns: repeat(1, 1fr);
            }
          
            th,
            td {
              min-width: auto;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://via.placeholder.com/150" alt="Logo">
          </div>
  <div class = 'content'>
  <div class="section">
  <h2>${userInfo.firstName} ${userInfo.lastName} </h2>
  <div id="userInfo">${userInfoHTML}</div>
</div>

<div class="section">
  <h2>${dealInfo.productType} | ${dealInfo.totalPrice}</h2>
  <div id="dealInfo">${dealInfoHTML}</div>
</div>

<div class="section">
  <h2>Installment Information</h2>
  ${installmentTableHTML}
</div>
  </div>

          <div class="closing">
            <p>All rights reserved by CMS © 2024</p>
          </div>
        </div>
      </body>
      </html>
    `);

    // Generate PDF
    await page.pdf({
      path: `${userInfo.firstName}.pdf`,
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      margin: {
        top: "0px",
        bottom: "0px",
        left: "0px",
        right: "0px",
      },
    });

    // Close the browser
    await browser.close();
  } catch (error) {
    console.log("Error generating PDF:", error);
  }
}

generatePDF();
