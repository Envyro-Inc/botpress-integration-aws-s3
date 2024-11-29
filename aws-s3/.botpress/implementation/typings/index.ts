/* eslint-disable */
/* tslint:disable */
// This file is generated. Do not edit it manually.

import * as configuration from "./configuration/index"
import * as configurations from "./configurations/index"
import * as actions from "./actions/index"
import * as channels from "./channels/index"
import * as events from "./events/index"
import * as states from "./states/index"
import * as entities from "./entities/index"
export * as configuration from "./configuration/index"
export * as configurations from "./configurations/index"
export * as actions from "./actions/index"
export * as channels from "./channels/index"
export * as events from "./events/index"
export * as states from "./states/index"
export * as entities from "./entities/index"

export type TIntegration = {
  name: "aws-s3"
  version: "24.11.1"
  user: { "tags": { "id": { "title": "AWS Access Key ID" } }, "creation": { "enabled": false, "requiredTags": [] } }
  configuration: configuration.Configuration
  configurations: configurations.Configurations
  actions: actions.Actions
  channels: channels.Channels
  events: events.Events
  states: states.States
  entities: entities.Entities
}