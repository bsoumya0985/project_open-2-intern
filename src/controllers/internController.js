const internModel = require("../models/internModel")
const collegeModel = require('../models/collegeModel')


const isValid = function (value) {
     if (typeof (value) === "undefined" || typeof (value) === null) { return false }
     if (typeof (value).length == 0) { return false }
     if (typeof (value) === "string" && (value).length > 0){ return true }
 }


const internCreate = async (req, res)=> {
     try {
          let data = req.body
          if (Object.keys(data) == 0){return res.status(400).send({ status: false, msg: "Bad request, No data provided." })};

          const{ name, email, mobile, collegeId, isDeleted} = data

          // For name required true:
          if (!isValid(name)){ return res.status(400).send({ status: false, msg: "Intern name is required" }) }

          // For email required true:
          if (!isValid(email)){ return res.status(400).send({ status: false, msg: "email is required" })}

          // For a valid email:
          if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email))){
               return res.status(400).send({ status:false, msg: 'Not a valid email'})
          }

          // For email unique true:
          let duplicateEmail  = await internModel.findOne({email:data.email})
          if(duplicateEmail){return res.status(400).send({ status:false, msg: "email already exists"})}

          // For Mobile No. required true:
          if (!isValid(mobile)){ return res.status(400).send({ status: false, msg: "Mobile No. is required" })}

          // For a valid Mobile No.:
          if (!(/^([+]\d{2})?\d{10}$/.test(data.mobile))){
               return res.status(400).send({ status:false, msg: 'Not a valid mobile number'})
          }

          // For Mobile No. unique true:
          let duplicateMobile  = await internModel.findOne({mobile:data.mobile})
          if(duplicateMobile){return res.status(400).send({ status:false, msg: "Mobile number already exists"})}

          // Checking college id :
          let id = collegeId
          if(!id){ return res.status(404).send({status:false, msg:"Collegeid should be in the body."})}

          // Finding college according to college Id :
          let idMatch = await collegeModel.findById(id)
          if (!idMatch){return res.status(404).send({ status: false, msg: "No such college present in the database" })}

          // Creating Intern :
          const createIntern = await internModel.create(data);
          res.status(201).send({ status: true, message: "Intern is enrolled successfully", data: createIntern })
    }
    catch (error) {
         res.status(500).send({ status: false, msg: error.message })
    }
  };


 module.exports.internCreate = internCreate;