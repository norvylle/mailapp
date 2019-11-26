const axios = require('axios');
const secrets = require('./secrets.json')

exports.getList = (req,res,next) => {
  axios.get(secrets["LISTS"],
    {
      params:{
        apikey: secrets["API_KEY"]
      }
    }
  ).then((response) => {
    res.send(response.data)
  })
}

exports.postList = (req,res,next) => {
  axios.post(secrets["LISTS"],
    {
      name: req.body.name,
      contact: {
        company: req.body.company,
        address1: req.body.address1,
        state: req.body.state,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country
      },
      permission_reminder: req.body.permission_reminder,
      campaign_defaults: {
        from_name: req.body.from_name,
        from_email: req.body.from_email,
        subject: req.body.subject,
        language: req.body.language
      },
      email_type_option: false
    },
    {
      auth:{
        username: "john",
        password: secrets["API_KEY"]
      }
    }
  ).then((response) => {
    res.send(response.data)
  }).catch((error) => {
    console.log(error.response)
  })
}

exports.deleteList = (req,res,next) => {
  axios.delete(secrets["LISTS"]+`/${req.query.list_id}`,
    {
      auth:{
        username: "ada",
        password: secrets["API_KEY"]
      }
    }
  ).then((response) => {
    res.send(response.data)
  }).catch((error) => {
    console.log(error.response)
  })
}


exports.getListMembers = (req,res,next) => {
  axios.get(secrets["LISTS"]+`/${req.query.list_id}/members`,
    {
      params:{
        apikey: secrets["API_KEY"]
      }
    }
  ).then((response) => {
    res.send(response.data)
  }).catch((error) => {
    console.log(error.response)
  })
}

exports.postListMember = (req,res,next) => {
  axios.post(secrets["LISTS"]+`/${req.query.list_id}/members`,
    {
      email_address: req.body.email_address,
      status: req.body.status
    },
    {
      auth:{
        username: "ada",
        password: secrets["API_KEY"]
      }
    }
  ).then((response) => {
    res.send(response.data)
  }).catch((error) => {
    console.log(error.response)
  })
}

exports.postCampaign = (req,res,next) => {
  axios.post(secrets["CAMPAIGNS"],
    {
      type: req.body.type,
      recipients: {
        list_id: req.body.list_id
      }
    },
    {
      auth:{
        username: "ada",
        password: secrets["API_KEY"]
      }
    }
  ).then((response) => {
    res.send(response.data)
  }).catch((error) => {
    console.log(error.response)
  })
}