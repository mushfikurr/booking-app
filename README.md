# Bookal: A Booking App For Local Businesses

This is Bookal [(live here)](https://djmp5s7y24vjt.cloudfront.net/), a fully-featured modern booking web application that allows local businesses to create, manage, and share their business with customers.

###### Examples of usage

Creating a booking on a business' page:
![An example of booking with Bookal](https://i.imgur.com/eyUcGKg.gif)

Adding a service as a business:
![An example of adding a service as a business](https://i.imgur.com/lj68jYJ.gif)

Managing your business (dashboard):
![An example of managing your business, the dashboard view](https://i.imgur.com/R2I1tpN.gif)

...and much more!

## Why?
As a person who is always visiting local business' (thanks Jay!), I was surprised to see they were still operating through mobile phone and text. 

Though there are many services that offer this service, many:
- Fail to properly address the wants of a local business, often being hard to create.
- Overcharge for the service.
- Are built on older technologies.

This is what Bookal aims to solve.

## 🚀 Quick Start

Navigate to [https://djmp5s7y24vjt.cloudfront.net/](https://djmp5s7y24vjt.cloudfront.net/).
.

## Features
### As a user
- Create & manage bookings.
- Leave reviews on businesses.
- Get in touch with businesses.

### As a business
- Create and manage a profile. Set details such as your contact information and location.
- Create and manage offered services, setting price, description, and other details.
- Set your opening hours, so customers know when you are available.
- Manage bookings, cancel bookings you cannot attend, and get in touch with users.
- Showcase your work, by uploading images.
- Other useful insights you may need as a business.

## 🤝 Contributing

### Clone the repo

```bash
git clone https://github.com/mushfikurr/booking-app
cd booking-app
npm i
```

### Run in dev
As this is a serverless project, you will require these services:
- [PlanetScale (not exactly required, this can be adjusted in the .env file)](https://planetscale.com/)
- [UploadThing](https://uploadthing.com/)
- [SST](https://sst.dev/)

Please follow the respective documentation for each service. Most of the boilerplate is connected, you only need to attain credentials, which can be plugged in a .env file at the root of the project:

```
DATABASE_URL='YOUR_PRISMA_DB_URL'
NEXTAUTH_SECRET='YOUR_NEXTAUTH_SECRET'
UPLOADTHING_SECRET='YOUR_UPLOADTHING_SECRET'
UPLOADTHING_APP_ID='YOUR_UPLOADTHING_APP_ID'
```

```bash
npx sst dev
npm run dev
```

### Deploying
You should have an .env.production file at the root of your project:
```
NEXTAUTH_URL='THE_DOMAIN_YOUR_HOSTING_ON'
```

```bash
npx sst deploy --stage prod
```

### Submit a pull request

If you'd like to contribute, please fork the repository and open a pull request to the `main` branch.
