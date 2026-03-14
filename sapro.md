I will attempt to document as i have been preparing to launch an affordable training course on AWS Solution Architect - Professional.

Services/ difficult topics I encountered:

1. https://aws.amazon.com/ec2/dedicated-hosts/

2. Difference between SCP vs IAM Policy

3. AWS Organizations which has multiple Organizational Units (OU)

4. All services within Systems Manager ( Automation, Run Command, Session Manager, State Manager, Patch Manager, Maintenance Window)

5. When to use AWS Serverless Application Model (SAM) vs CloudFormation in deploying Lambda with DynamoDB

6. Server Migration Service (SMS) + DMS + SCT - Can you migrate non-VM servers using SMS?

7. AWS Rekognition

8. AWS Mechanical Turk, AppStream?

9. AWS CI/CD Services (CodeCommit, CodeBuild, CodeDeploy, CodePipeline)

10. S3 Requester Pays

11. AWS Config and its integration with other services. Like managing "approved" AMI.



12. Managing S3 Bucket Permissions - Notify if there is a publicly accessible object in the bucket. Trusted Advisor vs AWS Config?

13. AWS WAF - applying rules for ELB, CloudFront, Amazon API Gateway and EC2

14. AWS Shield Advanced vs AWS Shield Standard

15. Amazon ES (Elasticsearch?) - Kibana

16. Providing access to data and visualization tool: QuickSight vs Kibana

17. Direct Connect, Direct Connect Gateway, VIFs and LAG

18. Lambda accessing a database from outside your VPC.

19. Transit VPC + Connecting hundreds of VPCs in your on-premise data center

20. A difficult scenario on VPC Peering when one VPC is peered with 2 VPCs which uses Longest Prefix Match.

21. Migration on-premise IBM MQ / WebSphere? Use Amazon MQ or EC2?

22. Private Hosted Zone in Route 53 to connect the routing of your multiple VPCs..

23. Lambda@edge when authenticating a website

24. Improving CloudFront performance (Cache Hit Rate?)

25. X-Ray vs Inspector vs Systems Manager

26. Athena, S3 Select, Glacier Select differences

27. Provisioned IOPS vs GP2,

28. DynamoDB Streams

29. AWS Batch,

30. AWS Directory Service

31. SWF vs Step Functions

32. Cached Volume vs Stored Volume vs File vs Tape Gateway

33. VPC Endpoint + Private vs Public VIF?

34. 6 Rs of migration: https://aws.amazon.com/blogs/enterprise-strategy/6-strategies-for-migrating-applications-to-the-cloud/

35. https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html

36. https://d1.awsstatic.com/whitepapers/architecture/AWS-Cost-Optimization-Pillar.pdf

37. https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-file-systems.html

38. https://docs.aws.amazon.com/amazonswf/latest/developerguide/swf-dg-intro-to-swf.html

39. https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html?ref_=pe_411040_126615030
40. https://d1.awsstatic.com/whitepapers/aws-scalable-gaming-patterns.pdf

41. https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.Partitions.html

42. https://aws.amazon.com/kinesis/data-streams/faqs/ https://aws.amazon.com/kinesis/data-firehose/faqs/

43. https://docs.aws.amazon.com/autoscaling/ec2/userguide/scaling_plan.html

44. https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-s3-messages.html (Upto 2GB per message using Java SQS SDK)
45. https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html

46. https://docs.aws.amazon.com/directconnect/latest/UserGuide/getting_started.html

47. https://aws.amazon.com/global-accelerator/features/

48. https://docs.aws.amazon.com/vpc/latest/peering/peering-configurations-partial-access.html

49. https://d1.awsstatic.com/whitepapers/Security/DDoS_White_Paper.pdf

50. https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_simple_ad.html

51. https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html

52. https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_example-scps.html#example-scp-deny-region

53. AWS Bedrock



Note: [ghaliba3.github.io/sapro.html](https://ghaliba3.github.io/sapro.html)
