const MFeedsBU =
  "http://mwfeedlatestbackend-env.eba-pqmncwtd.eu-north-1.elasticbeanstalk.com";
const DynamicDate = "https://4snhs6aoe5.execute-api.us-east-1.amazonaws.com";

const apiList = [
  {
    categoryname: "NSW Print PDF",
    subAPIs: [
      {
        subcategoryname: "Mediac PDF files",
        url: "http://ec2-54-213-186-130.us-west-2.compute.amazonaws.com/?id=64903ebd64349b00138fe5c7&&company_id=5ba032caa7ec810cbae9b674&&date=1717022435",
      },
      {
        subcategoryname: "NL distribution list",
        url: "https://app.meltwater.com/api/newsletters/newsletter/distribution/643d370c422edc001618f5cf/distributions",
      },
      {
        subcategoryname: "Distribution code",
        url: "https://app.meltwater.com/api/public/newsletters/6597ec7e0d090600119cc1d3/newsletter/distribution",
      },
      {
        subcategoryname: "Support admin",
        url: "https://app.meltwater.com/api/newsletters/newsletter/distribution/6639dcd65f65cc0014b52079",
      },
      {
        subcategoryname: "Code Check",
        url: "http://localhost:8000/healthCheck",
      },
      {
        subcategoryname: "Infrastructure Check",
        url: "http://mtool-infrastructure-env.eba-vacqdbep.eu-west-1.elasticbeanstalk.com/alarm",
      }
    ],
  },

  {
    categoryname: "QR Code API",
    subAPIs: [
      {
        subcategoryname: "Article Hash URL",
        url: "https://0thtkwdzuh.execute-api.us-east-1.amazonaws.com/dev/hash?a=www.google.com",
      },
      {
        subcategoryname: "QR Code URL",
        url: "https://0thtkwdzuh.execute-api.us-east-1.amazonaws.com/dev/qr?a=fbbf224a0445784dff9c9e1ebd07d8a57c47fe9fc7c3bb520c61837dc9baeb1d87c4015b1702fc02212c3466cfa5066ee8e5a681f89557649c380b0591a37b083d743c4a2fc8bbe3dcd95ff23c82b39c97eb426b89a8de96ecdf95f30447c2ccc49e8c5aabb49e69aeb690ad51061bcdaaeea1793d9865",
      },
      {
        subcategoryname: "Code Check",
        url: "http://localhost:9000/healthCheck",
      },
      {
        subcategoryname: "Infrastructure Check",
        url: "http://mtool-infrastructure-env.eba-vacqdbep.eu-west-1.elasticbeanstalk.com/alarm",
      },
    ],
  },
  {
    categoryname: "DynamicDate API",
    subAPIs: [
      {
        subcategoryname: "Asia-Kolkota",
        url: DynamicDate + "/Asia/Kolkata",
      },
      {
        subcategoryname: "Asia-Tokyo",
        url: DynamicDate + "/Asia/Tokyo",
      },
      {
        subcategoryname: "Africa-Lagos",
        url: DynamicDate + "/Africa/Lagos",
      },
      {
        subcategoryname: "Africa-Timbuktu",
        url: DynamicDate + "/Africa/Timbuktu",
      },
      {
        subcategoryname: "America-Barbados",
        url: DynamicDate + "/America/Barbados",
      },
      {
        subcategoryname: "America-Los Angeles",
        url: DynamicDate + "/America/Los_Angeles",
      },
      {
        subcategoryname: "Atlantic-Canary",
        url: DynamicDate + "/Atlantic/Canary",
      },
      {
        subcategoryname: "Etc-GMT",
        url: DynamicDate + "/Etc/GMT",
      },
      {
        subcategoryname: "Australia-Queensland",
        url: DynamicDate + "/Australia/Queensland",
      },
      {
        subcategoryname: "US-Michigan",
        url: DynamicDate + "/US/Michigan",
      },
    ],
  },
  {
    categoryname: "Escalation Tool",
    subAPIs: [
      {
        subcategoryname: "Ticket",
        url: "https://main.d3l0x3ehbqef40.amplifyapp.com/ticket",
      },
      {
        subcategoryname: "All Users",
        url: "https://main.d3l0x3ehbqef40.amplifyapp.com/allusers",
      },
      {
        subcategoryname: "Roles",
        url: "https://main.d3l0x3ehbqef40.amplifyapp.com/roles",
      },
      {
        subcategoryname: "Report",
        url: "https://main.d3l0x3ehbqef40.amplifyapp.com/report",
      },
      {
        subcategoryname: "History",
        url: "https://main.d3l0x3ehbqef40.amplifyapp.com/history",
      },
    ],
  },
  {
    categoryname: "Escalation Slackbot",
    subAPIs: [
      {
        subcategoryname: "MockerAPI 1",
        url: "http://localhost:3001/mock-status",
      },
      {
        subcategoryname: "MockerAPI 2",
        url: "http://localhost:3001/mock-status",
      },
    ],
  },
  {
    categoryname: "MWTR Login API",
    subAPIs: [
      {
        subcategoryname: "Identity",
        url: "https://v1.identity.meltwater.io/",
      },
      {
        subcategoryname: "MockerAPI",
        url: "http://localhost:3001/mock-status",
      },
    ],
  },
  {
    categoryname: "Newsletter Mocker",
    subAPIs: [
      {
        subcategoryname: "Sub-API 1",
        url: "https://newsletter-mocker.dev.solutions.meltwater.io/#/login",
      },
      {
        subcategoryname: "Sub-API 2",
        url: "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions",
      },
    ],
  },
  {
    categoryname: "MFeeds",
    subAPIs: [
      {
        subcategoryname: "Accounts List",
        url: MFeedsBU + "/api/accounts",
      },
      {
        subcategoryname: "Single Account",
        url: MFeedsBU + "/api/accounts/64b7c513588263cf792c7e82",
      },
      {
        subcategoryname: "Subscriptions List",
        url: MFeedsBU + "/api/subscriptions",
      },
      {
        subcategoryname: "Single Subscription",
        url: MFeedsBU + "/api/subscriptions/643d203b26a063291c30894c",
      },
      {
        subcategoryname: "Avoindata RSS feed",
        url: MFeedsBU + "/api/listingsA/key",
      },
      // {
      //   subcategoryname: "Espacenet",
      //   url: MFeedsBU + "/esp",
      // },
      // {
      //   subcategoryname: "Hlisting",
      //   url: MFeedsBU + "/api/hlistings",
      // },
      // {
      //   subcategoryname: "Listing",
      //   url: MFeedsBU + "/api/listings",
      // },
      {
        subcategoryname: "Listing 2",
        url: MFeedsBU + "/api/listings/search?q=covid",
      },
      {
        subcategoryname: "Listing 3",
        url: MFeedsBU + "/api/listings/rss?q=covid",
      },
      {
        subcategoryname: "Listing 4",
        url:
          MFeedsBU +
          "/api/listings/rss/saved/dec6eb88-7c94-485f-865f-a79be2e4e79e",
      },
      // {
      //   subcategoryname: "Paikat",
      //   url: MFeedsBU + "/key",
      // },
      // {
      //   subcategoryname: "Tontit",
      //   url: MFeedsBU + "/api/Tlistings",
      // },
      {
        subcategoryname: "Tontit 2",
        url: MFeedsBU + "/api/Tlistings/search?q=covid",
      },
      {
        subcategoryname: "Tontit 3",
        url: MFeedsBU + "/api/Tlistings/rss?q=covid",
      },
      {
        subcategoryname: "Tontit 4",
        url: MFeedsBU + "/api/Tlistings/rss/saved/dec6eb88-7c94-485f-865f-a79be2e4e79e",
      },
    ],
  },
  {
    categoryname: "MWFeeds",
    subAPIs: [
      {
        subcategoryname: "MockerAPI 1",
        url: "http://localhost:3001/mock-status",
      },
      {
        subcategoryname: "MockerAPI 2",
        url: "http://localhost:3001/mock-status",
      },
    ],
  },
];

module.exports = apiList;
