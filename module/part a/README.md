## Module A: Introduction to Software Development

- Explore and understand how GitHub works.
- Save changes from local repository to the remote repository.
- Learn how to use programming and automation tools.

## Setup

```
- Python3
- Text editor
- Linux terminal
```

Note: 
- You are not required to have an IDE for programming, but [Visual Studio Code](https://code.visualstudio.com/) is a beginner-friendly, lightweight text editor that is IDE-like when given the appropriate plugins.
- For Windows OS, it is strongly recommended to have [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install) with your preferred Linux distribution installed or alternatively download [Git Bash](https://git-scm.com/) which provides limited command tools.

## Hello, World!

In this module, you will explore the fundamentals of GitHub and the basic of scripting. It is encouraged to use the CLI whenever possible such as creating directories or files. Becoming comfortable using command lines will yield more benefits in the field of cloud computing.

The majority of this module can be completed through Linux. Please refer to this [resource](https://learnxinyminutes.com/docs/bash/) for further technical assistance.

**1. Getting Started**

Login / create an account. [GitHub](https://docs.github.com/en/get-started/quickstart/hello-world) offers a cloud-based solution to version control and software development. This service allows you to upload your projects to remote repositories as well as streamlining collaboration with others.

Before you can start editing and saving the changes to your project, you will need to authenticate your local machine and associate it with your GitHub account. Open your Linux terminal / Git Bash and modify the following command which will create a [SSH key](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key) using the RSA algorithm:
```
ssh-keygen -t rsa -b 4096 -C <your_email@example.com>
```

Save at the default location and enter an optional password. Copy the generated content within your public key ```.ssh/id_rsa.pub``` and add it to your GitHub account with an appropriate name. This will allow you to push changes to your remote repository from your computer.
```
settings > SSH and GPG keys > New SSH key
```

Troubleshooting:
- For more information on how to setup your Git, refer to this [resource](https://docs.github.com/en/get-started/quickstart/set-up-git).
- When the keypair is generated, the key fingerpint is displayed which is the hash key to quickly identify your public key and is not the public key itself.
- Helpful commands such as ```ls -a```, ```cd <dir>```, and ```cat <file>``` to help identify and read your public key.

**2. Creating a New Repository**

You will be creating a very simple project and then saving them to the main branch. The main branch is considered the most up-to-date, stable version of your project. Create a new project with the title ```sample-project``` on GitHub. On your local machine, choose a working directory where your project can be saved. The following command will initialize a Git repository within that directory which enables other Git tools:
```
git init
```

Note:
- You can directly create resources with these commands: ```mkdir <dir>``` and ```touch <file>```.
- When Git is initialized, it creates a hidden folder ```.git/``` and can be verified with ```ls -a``` .

**3. Python Script**

Within the same directory where you initialized Git, create a new python file called ```hello.py```. Your program must meet the following requirements:
```
- Cannot prompt the user for input.
- Create a unique or identifiable output.
- Print to standard output.
```
You can view the example ```hello.py``` to help get started.

Troubleshooting:
- You can edit files on Linux with different text editors such as ```vim <file>``` or ```nano <file>```.

**4. Commiting the Changes**

In order to save these changes to the main branch on GitHub, you will need to commit these changes before pushing them. Commits are snapshots your working branch and allows you to rollback to previous versions. Modify and run the following commands:
```
git add hello.py
git commit -m "my first commit"
git branch -M main
git remote add origin git@github.com:<username>/sample-project.git
git push -u origin main
```
When you push the changes to the main branch, you are letting everyone know that the changes made are stable and working. Best practice is to use [branching](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) which allows you to work in isolation without affecting other branches. Whenever you make a clone onto another device or merge with your working directory, these changes should be reflected.

**5. Automation Through Scripting**

Automation is what allows for cloud practitioners to become successful in their careers. For this step, you will be creating a Bash script that will automatically run the ```hello.py``` that you have created and store its content within a HTML file called ```<firstname_lastname>.html```. You are not required to understand web programming to complete this step but here is a quick overview: HTML provides the structural component to store data, CSS makes your web page more visually appealing and intuitive, and JavaScript gives functionality to your web page. You need only to concern with [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML).

Carefully examine ```example.sh``` to understand how to create / modify the necessary HTML file. ```#!/bin/bash``` is the required header in order for a Bash script to run. After creating a Bash script called ```script.sh```, run the following command through either the Linux terminal or Windows Command Prompt:
```
bash script.sh
```

Verify that your Bash script ran successfully by opening the HTML file and viewing the web page. Commit and push your work to your GitHub account once more.
```
git add -A
git commit -m "message"
git push -u origin main
```

**6. End of Module A**

By the end of this module, you should have the following files:
```
sample-project/
    - hello.py
    - <firstname_lastname>.html
    - script.sh
```
Through this module, you have learned what are some of the tools that are required for development and automation. For the next module, you will be uploading the HTML file you have created and host it on a web server on the cloud.