import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";

import actions from "@/content/actions.json";
import centers from "@/content/centers.json";
import actionsSchema from "@/content/schemas/actions.schema.json";
import centersSchema from "@/content/schemas/centers.schema.json";
import events from "@/content/events.json";
import eventsSchema from "@/content/schemas/events.schema.json";
import siteFacts from "@/content/site-facts.json";
import siteFactsSchema from "@/content/schemas/site-facts.schema.json";
import terminology from "@/content/terminology.json";
import terminologySchema from "@/content/schemas/terminology.schema.json";

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

describe("JSON Schema content contracts", () => {
  it("validates every approved content record against its JSON Schema", () => {
    for (const [schema, data] of [
      [actionsSchema, actions],
      [centersSchema, centers],
      [eventsSchema, events],
      [siteFactsSchema, siteFacts],
      [terminologySchema, terminology],
    ]) {
      const validate = ajv.compile(schema);
      expect(validate(data), JSON.stringify(validate.errors)).toBe(true);
    }
  });
});
