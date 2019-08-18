#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { EventScheduleApiStack } from '../lib/event-schedule-api-stack';

const app = new cdk.App();
new EventScheduleApiStack(app, 'EventScheduleApiStack');