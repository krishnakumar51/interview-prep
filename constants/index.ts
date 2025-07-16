import { CreateAssistantDTO, CreateWorkflowDTO  } from "@vapi-ai/web/dist/api";
import { Vapi } from "@vapi-ai/server-sdk";
import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

      
export const interviewer: CreateAssistantDTO  = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
            // @ts-expect-error
  clientMessages: ["transcript"],
  serverMessages: [],
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];



// export const generator: CreateWorkflowDTO = {
//   name: "Generate Interview",
//   nodes: [
//     {
//       name: "start",
//           // @ts-expect-error
//       type: "conversation",
//       isStart: true,
//       metadata: {
//         position: {
//           x: 0,
//           y: 0,
//         },
//       },
//       prompt:
//         "Speak first. Greet the user and help them create a new AI Interviewer",
//       voice: {
//         model: "aura-2",
//         voiceId: "thalia",
//         provider: "deepgram",
//       },
//       variableExtractionPlan: {
//         output: [
//           {
//             title: "level",
//             description: "The job experience level.",
//             type: "string",
//             enum: ["entry", "mid", "senior"],
//           },
//           {
//             title: "amount",
//             description: "How many questions would you like to generate?",
//             type: "number",
//             enum: [],
//           },
//           {
//             title: "techstack",
//             description:
//               "A list of technologies to cover during the job interview. For example, React, Next.js, Express.js, Node and so on...",
//             type: "string",
//             enum: [],
//           },
//           {
//             title: "role",
//             description:
//               "What role should would you like to train for? For example Frontend, Backend, Fullstack, Design, UX?",
//             type: "string",
//             enum: [],
//           },
//           {
//             title: "type",
//             description: "What type of the interview should it be? ",
//             type: "string",
//             enum: ["behavioural", "technical", "mixed"],
//           },
//         ],
//       },
//     },
//     {
//       name: "apiRequest_1747470739045",
//       type: "apiRequest",
//       metadata: {
//         position: {
//           x: -16.075937072883846,
//           y: 703.623428447121,
//         },
//       },
//       method: "POST",
//       url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/vapi/generate`,

//       headers: {
//         type: "object",
//         properties: {},
//       },
//       body: {
//         type: "object",
//         properties: {
//           role: {
//             type: "string",
//             description: "",
//             value: "{{ role }}",
//           },
//           level: {
//             type: "string",
//             description: "",
//             value: "{{ level }}",
//           },
//           type: {
//             type: "string",
//             description: "",
//             value: "{{ type }}",
//           },
//           amount: {
//             type: "number",
//             description: "",
//             value: "{{ amount }}",
//           },
//           userid: {
//             type: "string",
//             description: "",
//             value: "{{ userid }}",
//           },

//           techstack: {
//             type: "string",
//             description: "",
//             value: "{{ techstack }}",
//           },
//         },
//       },
//       output: {
//         type: "object",
//         properties: {},
//       },
//       mode: "blocking",
//       hooks: [],
//     },
//     {
//       name: "conversation_1747721261435",
//           // @ts-expect-error

//       type: "conversation",
//       metadata: {
//         position: {
//           x: -17.547788169718615,
//           y: 1003.3409337989506,
//         },
//       },
//       prompt:
//         "Thank the user for the conversation and inform them that the interview was generated successfully.",
//       voice: {
//         provider: "deepgram",
//         voiceId: "thalia",
//         model: "aura-2",
//       },
//     },
//     {
//       name: "conversation_1747744490967",
//       // @ts-expect-error
//       type: "conversation",
//       metadata: {
//         position: {
//           x: -11.165436030430953,
//           y: 484.94857971060617,
//         },
//       },
//       prompt: "Say that the Interview will be generated shortly.",
//       voice: {
//         provider: "deepgram",
//         voiceId: "thalia",
//         model: "aura-2",
//       },
//     },
//     {
//       name: "hangup_1747744730181",
//       type: "hangup",
//       metadata: {
//         position: {
//           x: 76.01267674000721,
//           y: 1272.0665127156606,
//         },
//       },
//     },
//   ],
//   edges: [
//     {
//       from: "apiRequest_1747470739045",
//       to: "conversation_1747721261435",
//       condition: {
//         type: "ai",
//         prompt: "",
//       },
//     },
//     {
//       from: "start",
//       to: "conversation_1747744490967",
//       condition: {
//         type: "ai",
//         prompt: "If user provided all the required variables",
//       },
//     },
//     {
//       from: "conversation_1747744490967",
//       to: "apiRequest_1747470739045",
//       condition: {
//         type: "ai",
//         prompt: "",
//       },
//     },
//     {
//       from: "conversation_1747721261435",
//       to: "hangup_1747744730181",
//       condition: {
//         type: "ai",
//         prompt: "",
//       },
//     },
//   ],
// };

export const generator: CreateWorkflowDTO = {
  
  "name": "Generate Interview",
  "nodes": [
    {
      "name": "introduction",
       // @ts-expect-error
      "type": "conversation",
      "isStart": true,
      "metadata": {
        "position": {
          "x": -1801.1108548971224,
          "y": -1217.7984811004007
        }
      },
      "prompt": "Greet the user, with {{username}} and Inform them that you will get some information from them, to create a perfect interview. Ask the caller for data required to extract. Ask the questions one by one, and await an answer. The userid {{userid}} will be automatically passed to the API request.",
      "model": {
        "model": "claude-3-7-sonnet-20250219",
        "provider": "anthropic",
        "maxTokens": 250,
        "temperature": 0.3
      },
      "transcriber": {
        "model": "nova-2",
        "provider": "deepgram"
      },
      "variableExtractionPlan": {
        "output": [
          {
            "enum": [
              "Entry",
              "Mid-level",
              "Senior"
            ],
            "type": "string",
            "title": "level",
            "description": "The job experience level."
          },
          {
            "enum": [],
            "type": "string",
            "title": "role",
            "description": "What role should would you like to train for? For example Machine Learning, Data Science, Fullstack, Design, UX? "
          },
          {
            "enum": [],
            "type": "number",
            "title": "amount",
            "description": "How many questions would you like to generate? "
          },
          {
            "enum": [],
            "type": "string",
            "title": "techstack",
            "description": "A list of technologies to cover during the job interview. "
          },
          {
            "enum": [
              "Mixed (Technical and Behavorial)",
              "Technical",
              "Non Technical"
            ],
            "type": "string",
            "title": "type",
            "description": "What type of the interview should it be? eg, a mixed interview of technical skills and behavioral or technical, Non technical... "
          }
        ]
      },
      "messagePlan": {
        "firstMessage": ""
      }
    },
    {
      "name": "apiRequest_1752505194608",
       // @ts-expect-error
      "type": "tool",
      "metadata": {
        "position": {
          "x": -879.2746789562744,
          "y": -961.0474430915209
        }
      },
      "tool": {
        "type": "apiRequest",
        "function": {
          "name": "api_request_tool",
          "description": "API request tool",
          "parameters": {
            "type": "object",
            "properties": {},
            "required": []
          }
        },
        "messages": [
          {
            "type": "request-start",
            "content": "Please hold on. I'm sending a request to the app.",
            "blocking": true
          },
          {
            "type": "request-complete",
            "content": "The request has been sent and your interview has been generated. Thank you for the call! Bye!!",
            "role": "assistant",
            "endCallAfterSpokenEnabled": true
          },
          {
            "type": "request-failed",
            "content": "Oops!! Something went wrong while sending your data to the app! please try again.",
            "endCallAfterSpokenEnabled": true
          }
        ],
        "name": "getUserData",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/api/vapi/generate`,
        "method": "POST",
        "body": {
          "type": "object",
          "required": [
            "level",
            "role",
            "amount",
            "techstack",
            "type",
            "userid"
          ],
          "properties": {
            "role": {
              "type": "string",
              "value": "{{role}}",
              "description": ""
            },
            "type": {
              "type": "string",
              "value": "{{type}}",
              "description": ""
            },
            "level": {
              "type": "string",
              "value": "{{level}}",
              "description": ""
            },
            "amount": {
              "type": "number",
              "value": "{{amount}}",
              "description": ""
            },
            "userid": {
              "type": "string",
              "description": "User ID passed from variableValues",
              "value": "{{assistantOverrides.variableValues.userid}}"
            },
            "techstack": {
              "type": "string",
              "value": "{{techstack}}",
              "description": ""
            }
          }
        },
        "variableExtractionPlan": {
          "schema": {
            "type": "object",
            "required": [],
            "properties": {}
          },
          "aliases": []
        }
      }
    },
    {
      "name": "hangup_1752603146598",
       // @ts-expect-error
      "type": "tool",
      "metadata": {
        "position": {
          "x": -1525.182731434527,
          "y": -488.01528977259466
        }
      },
      "tool": {
        "type": "endCall",
        "function": {
          "name": "untitled_tool",
          "parameters": {
            "type": "object",
            "required": [],
            "properties": {}
          }
        },
        "messages": [
          {
            "type": "request-start",
            "content": "Everything has been generated, I'll redirect you to the dashboard now!\nThank you for the call.",
            "blocking": true
          }
        ]
      }
    }
  ],
  "edges": [
    {
      "from": "introduction",
      "to": "apiRequest_1752505194608",
      "condition": {
        "type": "ai",
        "prompt": "If user provided all the variables."
      }
    },
    {
      "from": "apiRequest_1752505194608",
      "to": "hangup_1752603146598",
      "condition": {
        "type": "ai",
        "prompt": "user said yes"
      }
    }
  ],
  "voice": {
    "voiceId": "Savannah",
    "provider": "vapi"
  },
  "globalPrompt": ""

};
