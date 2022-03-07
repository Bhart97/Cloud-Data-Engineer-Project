## Module B: Introduction to Cloud Operations

- Create and connect to computer instances.
- Upload and download with Object storage.
- Host a web server and implement a load balancer. 

## Setup
```
- AWS IAM account
- <TODO> named vpc
- <TODO> region
```

Reminder, all permissions and access to AWS resources is denied by default. The information below details the implementations of the IAM permissions for this module.

```
Policies:
- Users are created with access to programmatic tools and the AWS CLI.
- Group is created for current users.
- Group is given permission to access AWS CloudShell.

- Group is given permission to manage EC2 and S3.
- Group is given permission to READ-only IAM and attach roles.
- Group is given permission to READ-only VPC.

- Group is given permission to manage CloudFormation.
- Group is given permission to manage AWS Lambda Functions.
- Group is given permission to manage Event Bridge.

Roles:
- EC2 instances are given permission to communicate with S3 services.
- Lambda Functions are given permission to delete EC2 resources and CloudFormation stacks.
```

## Working on the Cloud

In this module, students will be working within the OCP private cloud network on ```Amazon Web Services``` and provision resources required for a web hosting service. Because this is a private network, students will require a secured connection through ```<TODO>```.

In this module, there are two required learning paths available: the ```basic track``` and ```intermediate track```. The basic track serves as an introductory material for beginners and as warm-up for those familiar with cloud concepts. The intermediate track is a better representation of what is expected from entry-level cloud practitioners and will introduce new concepts and challenges.

## Working on the Cloud: Console (Basic)

This learning path focuses on utilizing the AWS console to create cloud resources. Each student will be provisioning their own elastic compute (EC2) instances and the required packages as well as managing objects in the simple storage service (S3). References will be provided to help resolve any troubleshooting issues that may occur but are encouraged to explore and make mistakes.

Those who are more familiar with cloud concepts are suggested to use the [AWS CloudShell](https://aws.amazon.com/cloudshell/) for provisioning and managing resources. Note, you will also being using the [AWS CLI](https://aws.amazon.com/cli/) on your EC2 instances so it is recommended to become familiar with the AWS tools anyways. If planning on using your Linux terminal on your local machine, your access key ID and secret access key credentials must be requested.

**1. Creating and Configuring a Compute Instance**

Login with the provided AWS IAM account. Upload an [existing keypair](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#how-to-generate-your-own-key-and-import-it-to-aws) or create a new one. Note, managing your keypair is very important and is highly recommended to be consistent with how your keys are stored and accessed.

Create an EC2 instance with the following configurations listed below and default settings otherwise. View the documentations on initializing and launching [EC2 instances](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-ec2-instances.html) with the AWS CloudShell:
```
- Amazon Linux 2 AMI with t2.micro type
- <TODO> WebServerGroup security group 
```

Verify the connection via SSH protocol and then install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) on the EC2. This will give permission for your EC2 instance to access AWS tools.

Troubleshooting:
- Please refer to the console to get information required for the parameters if using the CloudShell.
- You can name your compute instances to make them much easier to manage.
- If the keypair does not authenticate, make sure to specify the entire path such as ```~/.ssh/<private_key>```.
- You cannot connect to a private network from a public network without a secured / private connection.

**2. Connecting to Object Storage**

Within the S3 bucket called ```<TODO>```, all objects will be stored under your cohort directory. You will be using the AWS CLI from within the EC2 instance to make calls to the S3 bucket. Review the documentations on using the [s3 commands](https://docs.aws.amazon.com/cli/latest/reference/s3/) to move files within the S3 bucket.

Go to the EC2 console and ```Actions > Security > Modify IAM role``` and attach the role to enable EC2 access with S3, then create a new file called <firstname_lastname>.txt from your EC2 instance. You will upload this file under the appropriate directory and it should contain the following text:
```
Hello, my name is <first name> <last name>!
```

Verify through the console that the S3 bucket now contains a file called ```<firstname_lastname>.txt``` with the text content. Upload your HTML file from the previous module either through the CloudShell or console, then download it onto your EC2. Verify that the contents are the same.

Troubleshooting:
- Be careful on how you specify the path for the bucket ```S3://<bucket_name>/<dir>/object```.
- EC2 instances cannot connect to S3 services without the AWS CLI installed and the instance role attached.

**3. Configure Web Server**

Carefully follow the instructions to install an [Apache HTTP web server](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateWebServer.html) and stop once you have set the files permission for the Apache web server. Either move or re-download your HTML file within your EC2 to the destination ```/var/www/html/<file>.html```.

Verify that your web server is currently hosting the correct page.

Troubleshooting:
- You are required to update the permissions within the EC2 in order to make changes to the contents under the ```var/``` directory.
- You can access your web page from the browser using the IP address ```http://<ip_address>```.

**4. Load Balancer**

Review the documentations about the [ELB](https://aws.amazon.com/elasticloadbalancing/). Create a target group and select any web servers that are currently available (adding a backend that is not currently running Apache may lead to unexpected errors). Create the ELB with the default settings and the following configurations:
```
<TODO> WebServerGroup security group
HTTP port 80 forwarding to selected target group
```

Verify that the traffic to your backend web servers are being distributed.

Troubleshooting:
- Connecting to your ELB is similar to connecting to your EC2 from a web browser.
- ELB may not work properly if the web page is not running.
- If a page reload does not update the contents of the web page, clear your cache to resolve some issues due DNS queries being cached.

**5. End of the Basic Track**

By the end of this learning path, you will have successfully provisioned a compute resource and managed objects with the S3 bucket, connect and install software packages on your EC2 instances, and created an ELB to distribute traffic across your backend web servers.

**REQUIRED:** _Terminate_ all resources that you have created for this module: EC2 instances, target group, and ELB.

## Working on the Cloud: Automation (Intermediate)

This learning path will similarly create web hosting servers but with more emphasis on resource and configuration management to achieve automation and managing at scale. Students will be responsible for managing more than one resource at a time and all previously created resources should be terminated before moving forward.

**1. Resource Management**

![Alt text](img/CloudFormation.png?raw=true)

[CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) provides an Infrastructure-as-Code solution by provisioning and managing resources written with a JSON / YAML template. When a template is created and read by CloudFormation, a stack is generated which is a collection of the AWS resources managed as a single unit. Thus, you can modify several resources at once by modifying the stack.

Examine ```server.json``` which provides an example template for creating EC2 instances with the given parameters. There are several ```TODO``` which denotes a missing value and update them with the appropriate value. Please refer to the CloudFormation guidelines on getting started and learning more about how to format a template.

You will be creating multiple web servers and a control node which will be detailed in the next section. Update the ```server.json``` file to create the following resources below. Access CloudFormation from the console and upload the template to create a stack and choose all default settings.
```
- Web server 1 compute instance
- Web server 2 compute instance
- Control node compute instance
```

Verify that you can reach each EC2 instance through a SSH connection.

**WARNING:** the current version (2/8/2021) of this template automatically assigns a public IP address and may be deprecated in the future.

Troubleshoot:
- Common errors can occur due to syntax mistakes.

**2. Configuration Mangement**

[Ansible](https://docs.ansible.com/ansible/latest/network/getting_started/basic_concepts.html) allows for the deployment of software packages to several compute instances simutaneously. Ansible playbooks, written in YAML format, allows for the orchestration of procedural tasks against an inventory of hosts via the SSH protocol. In this step, you will be deploying Apache web servers to the previously created EC2 instances.

To get started, you will install Ansible on the control node. Install AWS CLI onto the EC2 destinated as the control node. Please refer to [installation guide for Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installation-guide) for additional details. Run the following command on your control node:
```
sudo yum install epel-release
sudo amazon-linux-extras install ansible2
```

Next, read about the [Ansible playbook](https://docs.ansible.com/ansible/latest/user_guide/intro_getting_started.html). Refer to the user guide on how to properly set up Ansible. Follow the example and verify that the ```/tmp/ansible_was_here``` was created. Please note, modifying the contents under ```/etc/ansible``` requires root privilege which will require ```sudo <command>```. Additionally, your control node will require SSH connection to the servers, so generate a keypair and update the hosts' public key storage under ```~/.ssh/authorized_keys```.

Run ```apache.yaml``` to install the Apache HTTP web servers for your instances. Verify that the server is running by visiting the page. Note, the key-value pair ```become: yes``` allows for privilege escalation when installing software packages remotely.

Select one of the servers to be the test server. Connect via SSH and escalate your permissions with ```sudo -i```. This will grant temporary permission to modify ```/var/www/```. Create an empty HTML file and have it contain any desired text. You will not require a HTML skeleton for testing purposes. Verify that the page now reflects the text content.

Repeat but this time download your HTML file through any means to the other web server. Verify that the page now reflects your HTML.

Troubleshooting:
- Basic VIM commands: press ```insert``` to make changes, ```:w``` to write, ```:q``` to exit.
- If you cannot ping successfully to all hosts due to authentication issues, then manually SSH into each EC2 instance from within the control node.
- If an error occurs when running the command ```ansible-playbook```, try fixing any indentations and white spaces.
- If you happen to stop your EC2 instance that is using a public IP address, then it will be changed when restarted which may affect your inventory.

**3. Load Balancer**

Create an ELB using ```elb.json```. This will provision an elastic load balancer, its listener, and a target group. Assign the appriopriate EC2 instances to the target group. Verify that you can reach your backend web servers through the load balancer.

Troubleshooting:
- Make sure that the ELB has the proper configurations: VPC, subnets, and security group.
- Make sure that the address starts with http:// to reach your HTTP web server.

**4. Serverless Functions**

[AWS Lambda](https://aws.amazon.com/lambda/) enables you to call serverless functions which will run without provisioning infrastructure. You can assign the Lambda Function as an endpoint that events and other notifications services can access. For this section, you will be creating a function that when an ```EC2 stop event``` occurs, your function will be called to delete all your provisioned resources.

Using the console, create a AWS Lambda function in ```Python``` with the pre-defined role. Go to the [Event Bridge](https://aws.amazon.com/eventbridge/) on the console and create a new rule with the following conditions: ```Event pattern > event matching pattern > pre-defined pattern > AWS > EC2 > state-change notification > stopped > "instance id of control node"```. This will send an event notification when your control node has been stopped.

Add the trigger to your Lambda Function and update the template code ```lambda_function.py```. This template code will allow for your Lambda Function to delete the CloudFormation stack specified. Create a test case using the event pattern from the rule created. Deploy your code and verify that _stopping_ your control node will also terminate your CloudFormation resources.

Troubleshooting:
- You can modify the code to explicitly state any conditions for debugging purposes.
- The template function does not necessarily require the event request body so the event triggered is solely dependent on if the control node had been stopped and the test case simply checks for syntax errors.

**5. End of the Intermediate Track**

**REQUIRED:** _Terminate_ any remaining provisioned resources such as the serverless function and event rule.

By the end of this learning, you will have automated your work through the resource manager ```CloudFormation``` to manage several resources as a single unit and configuration manager ```Ansible``` to deploy software packages across multiple hosts. Finally, you have created an event rule to trigger a serverless function that allows for event-driven processes.