const { create } = require("../functions/createUser");
const { get } = require("../functions/getUser");
const { update } = require("../functions/updateUser");
const { generateEvent } = require("../lib/url/generateEvent");

/* global jest */
jest.mock("aws-sdk", () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      get: jest
        .fn()
        .mockImplementationOnce(() => {
          return {
            promise() {
              return Promise.resolve({ Item: {} });
            },
          };
        })
        .mockImplementationOnce(() => {
          return {
            promise() {
              return Promise.resolve({});
            },
          };
        }),
      put: jest.fn().mockImplementationOnce(() => {
        return {
          promise() {
            return Promise.resolve({});
          },
        };
      }),
      update: jest.fn().mockImplementationOnce(() => {
        return {
          promise() {
            return Promise.resolve({});
          },
        };
      }),
      // delete: jest.fn().mockReturnThis()
    })),
  },
}));

const createEvent1 = generateEvent({
  body: {
    name: "hai",
    age: 15,
  },
});
const createEvent2 = generateEvent({
  body: {
    age: 15,
  },
});
const createEvent3 = generateEvent({
  body: {
    name: "hai",
  },
});
const createEvent4 = generateEvent({
  body: null,
});

const getEvent1 = generateEvent({
  pathParametersObject: {
    id: "jhfkashdjkf-asfds",
  },
});

const getEvent2 = generateEvent({
  pathParametersObject: null,
});

const updateEvent1 = generateEvent({
  body: {
    name: "hai",
    age: 15,
  },
  pathParametersObject: {
    id: "jhfkashdjkf-asfds",
  },
});

const updateEvent2 = generateEvent({
  pathParametersObject: {
    id: "jhfkashdjkf-asfds",
  },
});

const updateEvent3 = generateEvent({
  body: {
    name: "hai",
    age: 15,
  },
});

describe("Test create user", () => {
  test("test create user 1", async () => {
    const response = await create(createEvent1);
    expect(response.status).toBe(200);
  });
  test("test create user 2", async () => {
    const response = await create(createEvent2);
    expect(response.status).toBe(400);
  });
  test("test create user 3", async () => {
    const response = await create(createEvent3);
    expect(response.status).toBe(400);
  });
  test("test create user 4", async () => {
    const response = await create(createEvent4);
    expect(response.status).toBe(400);
  });
});

describe("Test get user", () => {
  test("test get user 1", async () => {
    const response = await get(getEvent1);
    expect(response.status).toBe(200);
  });
  test("test get user 2", async () => {
    const response = await get(getEvent2);
    expect(response.status).toBe(500);
  });
});

describe("Test update user", () => {
  test("test update user 1", async () => {
    const response = await update(updateEvent1);
    expect(response.status).toBe(200);
  });
  test("test update user 2", async () => {
    const response = await update(updateEvent2);
    expect(response.status).toBe(400);
  });
  test("test update user 3", async () => {
    const response = await update(updateEvent3);
    expect(response.status).toBe(500);
  });
});
