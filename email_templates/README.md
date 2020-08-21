# Adding Templates

In order to upload a template to AWS SES, call the following from the AWS CLI:

aws ses create-template --cli-input-json file://template.json

An example of a template is:

{
"Template": {
"TemplateName": "MyTemplate",
"SubjectPart": "Greetings, {{name}}!",
"HtmlPart": "<h1>Hello {{name}},</h1><p>Your favorite animal is {{favoriteanimal}}.</p>",
"TextPart": "Dear {{name}},\r\nYour favorite animal is {{favoriteanimal}}."
}
}

# Sending Template Emails

To send a personalised email, call the following from the AWS CLI:

aws ses send-templated-email --cli-input-json file://personalised.json

An example of the personalised JSON required is:

{
"Source":"Mary Major <mary.major@example.com>",
"Template": "MyTemplate",
"ConfigurationSetName": "ConfigSet",
"Destination": {
"ToAddresses": [ "alejandro.rosalez@example.com"
]
},
"TemplateData": "{ \"name\":\"Alejandro\", \"favoriteanimal\": \"alligator\" }"
}

## Sending Template Emails Via JS

Here's a link to the AWS Javascript SDK page on doing the above directly in JS rather than using the CLI.

[https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html)

# Notes

In order for these emails to be sent, the recipient domain has to be verified by AWS SES.

What this means is that our partner companies are going to have to edit their DNS settings in order for us to send these.
