const Joi = require('joi')

const messages = {
	"any.required": "{{#label}} is required!!",
	"string.empty": "{{#label}} can't be empty!!",
	"string.min": "{{#label}} must have minimum {{#limit}} characters",
	'string.alphanum': '{{#label}} must only contain alpha-numeric characters',
	'string.base': '{{#label}} must be a string',
	'string.base64': '{{#label}} must be a valid base64 string',
	'string.creditCard': '{{#label}} must be a credit card',
	'string.dataUri': '{{#label}} must be a valid dataUri string',
	'string.domain': '{{#label}} must contain a valid domain name',
	'string.email': '{{#label}} must be a valid email',
	'string.empty': '{{#label}} is not allowed to be empty',
	'string.guid': '{{#label}} must be a valid GUID',
	'string.hex': '{{#label}} must only contain hexadecimal characters',
	'string.hexAlign': '{{#label}} hex decoded representation must be byte aligned',
	'string.hostname': '{{#label}} must be a valid hostname',
	'string.ip': '{{#label}} must be a valid ip address with a {{#cidr}} CIDR',
	'string.ipVersion': '{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR',
	'string.isoDate': '{{#label}} must be in iso format',
	'string.isoDuration': '{{#label}} must be a valid ISO 8601 duration',
	'string.length': '{{#label}} must be {{#limit}} characters long',
	'string.lowercase': '{{#label}} must only contain lowercase characters',
	'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
	'string.min': '{{#label}} must be at least {{#limit}} characters long',
	'string.normalize': '{{#label}} must be unicode normalized in the {{#form}} form',
	'string.token': '{{#label}} must only contain alpha-numeric and underscore characters',
	'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}',
	'string.pattern.name': '{{#label}} with value {:[.]} fails to match the {{#name}} pattern',
	'string.pattern.invert.base': '{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}',
	'string.pattern.invert.name': '{{#label}} with value {:[.]} matches the inverted {{#name}} pattern',
	'string.trim': '{{#label}} must not have leading or trailing whitespace',
	'string.uri': '{{#label}} must be a valid uri',
	'string.uriCustomScheme': '{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern',
	'string.uriRelativeOnly': '{{#label}} must be a valid relative uri',
	'string.uppercase': '{{#label}} must only contain uppercase characters'
}

const schema = Joi.object({
	name: Joi.string().required().min(3).messages(messages),
	age: Joi.number().required().integer().min(20).messages(messages),
	city: Joi.string().min(3).messages(messages),
	pincode: Joi.number().required().min(5).messages(messages),
	githubURL: Joi.string().uri().required().messages(messages)
})

const data = {
	name: 'Bhoomit',
	age: 21,
	city: 'Ahmedabad',
	pincode: 382445,
	githubURL: 'https://github.com',
	'afddf': 'ad'
}

const handleJoiErrorMessages = messages => {
	return messages.details.map(({ message }) => message).join(', ')
}


const validateResult = schema.validate(data, {
	abortEarly: false,
	stripUnknown: true,
})

if (validateResult.error) {
	console.log(handleJoiErrorMessages(validateResult.error))
} else {
	console.log(validateResult.value)
}