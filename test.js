const axios = require('axios');
const emails = require('./secrets.json')["EMAILS"]

async function main(){
  
  console.log("STEP 1: Create a new list")
  console.log("\tEnsure there's no new list (Free tier limits to only one list)")

  await axios.get('http://localhost:3001/list')
    .then(async (response) => {
      if(response.data.total_items > 0){ //there's an existing list
        await axios.delete(`http://localhost:3001/list?list_id=${response.data.lists[0].id}`)
        .then((response) => {
          console.log("\tCleared lists!")
        })
        .catch((error)=>{
          console.log(error)
        })
      }else{
        console.log("\tWe now create a list.")
      }
    })
    .catch((error)=>{
      console.log(error)
    })

    let list_id = await axios.post('http://localhost:3001/list',
      {
        name: "Brand X",
        company: "MyCompany",
        address1: "4026 Oak Way",
        state: "Nebraska",
        city: "Lincoln",
        zip: "68501",
        country: "US",
        permission_reminder: "You are receiving this email because you opted in via our website.",
        from_name: "Austin Uy",
        from_email: "norvylle@gmail.com",
        subject: "MyCompany!!",
        language: "en"
      }
    ).then((response)=>{
      console.log("\List Added! (id: "+response.data.id+")")
      return response.data.id
    }).catch((error)=>{
      console.log(error)
    })

  console.log("STEP 2: Add your email to the list")
  console.log("\tGive me a moment as I add my email ("+emails[0]+")")
  await axios.post(`http://localhost:3001/list-members?list_id=${list_id}`,
    {
      email_address: emails[0],
      status: "subscribed"
    }
  ).then((response)=>{
    console.log("\tEmail Added! (id: "+response.data.id+")")
  }).catch((error)=>{
    console.log(error)
  })

  console.log("STEP 3: Add a few other valid emails")
  console.log("\tLet's add another ("+emails[1]+")")
  await axios.post(`http://localhost:3001/list-members?list_id=${list_id}`,
    {
      email_address: emails[1],
      status: "subscribed"
    }
  ).then((response)=>{
    console.log("\tEmail Added! (id: "+response.data.id+")")
  }).catch((error)=>{
    console.log(error)
  })

  console.log("\tAnd another ("+emails[2]+")")
  await axios.post(`http://localhost:3001/list-members?list_id=${list_id}`,
    {
      email_address: emails[2],
      status: "subscribed"
    }
  ).then((response)=>{
    console.log("\tEmail Added! (id: "+response.data.id+")")
  }).catch((error)=>{
    console.log(error)
  })

  console.log("STEP 4: Send out a campaign from Mailchimp to everyone in the list")
  console.log("\tLet's finish by sending a campaign to the list members.")
  await axios.post('http://localhost:3001/campaign',
    {
      type: "regular",
      list_id: list_id, 
    }
  ).then((response)=>{
    console.log("\Campaign Created! (url: "+response.data.archive_url+")")
  }).catch((error)=>{
    console.log(error)
  })

  process.exit();
}

main()