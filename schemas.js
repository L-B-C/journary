const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: { 'string.escapeHTML': '{{#label}} must not include HTML!' },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.error('string.escapeHTML', { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.journeySchema = Joi.object({
  date: Joi.date().iso().required(),
  transport: Joi.string().required().escapeHTML(),
});

module.exports.waypointsSchema = Joi.array()
  .items(Joi.string().required().escapeHTML())
  .single()
  .options({ stripUnknown: { arrays: true } });
