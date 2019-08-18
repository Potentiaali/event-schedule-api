import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";

export class EventScheduleApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getScheduleLambda = new lambda.Function(this, "getOneItemFunction", {
      code: new lambda.AssetCode("src"),
      handler: "getSchedule.handler",
      runtime: lambda.Runtime.NODEJS_10_X,
      environment: {
        GDOCS_AUTH_KEY: "auth_key"
      }
    });

    const api = new apigateway.RestApi(this, "scheduleApi", {
      restApiName: "Kumpula's Potential Event Schedule API"
    });

    const schedule = api.root.addResource("schedule");
    const getScheduleIntegration = new apigateway.LambdaIntegration(
      getScheduleLambda
    );
    schedule.addMethod("GET", getScheduleIntegration);
    schedule.addMethod(
      "OPTIONS",
      new apigateway.MockIntegration({
        integrationResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Headers":
                "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
              "method.response.header.Access-Control-Allow-Origin": "'*'",
              "method.response.header.Access-Control-Allow-Credentials":
                "'false'",
              "method.response.header.Access-Control-Allow-Methods":
                "'OPTIONS,GET,PUT,POST,DELETE'"
            }
          }
        ],
        passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
        requestTemplates: {
          "application/json": '{"statusCode": 200}'
        }
      }),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Headers": true,
              "method.response.header.Access-Control-Allow-Methods": true,
              "method.response.header.Access-Control-Allow-Credentials": true,
              "method.response.header.Access-Control-Allow-Origin": true
            }
          }
        ]
      }
    );
  }
}
