const Joi = require('joi');

module.exports.listingSchema = Joi.object({

        title : Joi.string().required(),
        desc : Joi.string().required(),
        address : Joi.string().required(),
        city : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.string().allow("",null)
  
})

module.exports.reviewSchema = Joi.object({
 
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required()
   
})