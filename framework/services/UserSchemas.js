// json схемы для тестов

const doRegisterSchema = {
  type: "object",
  default: {},
  title: "do register json schema",
  required: [
    "name",
    "avatar",
    "password",
    "birthday",
    "email",
    "gender",
    "date_start",
    "hobby",
  ],
  properties: {
    name: {
      type: "string",
      default: "",
      title: "The name Schema",
      examples: ["Dr. Mark Schowalter"],
    },
    avatar: {
      type: "string",
      default: "",
      title: "The avatar Schema",
      examples: ["http://users.bugred.ru//tmp/default_avatar.jpg"],
    },
    password: {
      type: "string",
      default: "",
      title: "The password Schema",
      examples: [
        "4dff4ea340f0a823f15d3f4f01ab62eae0e5da579ccb851f8db9dfe84c58b2b37b89903a740e1ee172da793a6e79d560e5f7f9bd058a12a280433ed6fa46510a",
      ],
    },
    birthday: {
      type: "integer",
      default: 0,
      title: "The birthday Schema",
      examples: [0],
    },
    email: {
      type: "string",
      default: "",
      title: "The email Schema",
      examples: ["my_test957@gmail.com"],
    },
    gender: {
      type: "string",
      default: "",
      title: "The gender Schema",
      examples: [""],
    },
    date_start: {
      type: "integer",
      default: 0,
      title: "The date_start Schema",
      examples: [0],
    },
    hobby: {
      type: "string",
      default: "",
      title: "The hobby Schema",
      examples: [""],
    },
  },
};

export default {
  doRegisterSchema,
};
