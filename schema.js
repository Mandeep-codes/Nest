const joi = require('joi');

module.exports.listingSchema = joi.object({
  listing: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    location: joi.string().required(),
    country: joi.string().required(),
    price: joi.number().required().min(0),
    image: joi.object({
      url: joi.string().allow("", null)
    }).allow(null),
    category: joi.string().valid(
      'iconic-cities', 'trending', 'rooms',
      'mountains', 'castles', 'amazing-pools',
      'camping', 'farms', 'arctic', 'domes', 'boats'
    ).required()

  })
});

module.exports.reviewSchema = joi.object({
  review:joi.object({
    rating:joi.number().required().min(1).max(5),
    comment:joi.string().required()

  }).required(),
});
