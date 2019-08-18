# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

-------------------

## Bootstrapping environment

- Run `cdk bootstrap aws://{AWS_ACCOUNT_ID}/{AWS_REGION} --profile {PROFILE_NAME}`


## Deploying stack

- Run `cdk deploy --profile {PROFILE_NAME}`

## Reference

- **AWS_ACCOUNT_ID**: AWS Account ID

- **AWS_REGION**: AWS Region (Prefer eu-central-1)

- **PROFILE_NAME**: Profile with `Access key ID`, `Secret access key` and `Region configured`