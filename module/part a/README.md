## Module A: Introduction to Software Development

- Explore and understand how GitHub works
- Save changes from local repository to the remote repository
- Learn how to use programming and automation tools

## Setup


To begin, download the following applications: 
- [Visual Studio Code](https://code.visualstudio.com/) - a beginner-friendly, lightweight text editor that is IDE-like(Integrated Development Environment) when given the appropriate plugins
- [Git Bash](https://git-scm.com/) - useful command-prompt enivronment which provides limited command tools
- [Python](https://www.python.org/downloads/) - the latest version of Python to test your code


## Hello, World!

In this module, you will explore the fundamentals of GitHub and the basics of scripting. It is encouraged to use the CLI (Command Line Interface - Git Bash) whenever possible, such as for creating directories or files. Becoming comfortable using command line interfaces will yield more benefits in the field of cloud computing and data engineering.

The majority of this module can be completed through Git Bash. Please refer to this [resource](https://learnxinyminutes.com/docs/bash/) for further technical assistance.

**1. Getting Started**

Login/create a [GitHub](https://docs.github.com/en/get-started/quickstart/hello-world) account. GitHub offers a cloud-based solution for version control and software development. This service allows you to upload your project(s) to remote repositories as well as collaborate with others.

Before you can start editing and saving the changes to your project, you will need to authenticate your local machine and associate it with your GitHub account. Open Git Bash and modify the following command which will create a [SSH key](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key) using the RSA algorithm:
```
ssh-keygen -t rsa -b 4096 -C your_email@example.com
```

Save at the default location (press enter after using command above) and enter an optional password (or press enter to bypass using a password).

Next, copy the generated content within your public key, which is found within ```C:\Users\yourname\.ssh/id_rsa.pub```. The file will open in Microsoft Publisher by default, you must open the file with Notepad in order to copy the generated key.
- Additionally, commands such as ```cd <dir>``` and ```cat <file>``` can help help identify and read your public key within Git Bash. For example using the ```cd C:/Users/username/.ssh``` command and then using the ```cat id_rsa.pub``` command, to retrieve the generated key



Then login to your GitHub account add the copied key with an appropriate name, using the steps below. This will allow you to push changes to your remote repository from your computer.
```
Within GitHub > settings > SSH and GPG keys > New SSH key
```

Troubleshooting:
- For more information on how to setup your Git, refer to this [resource](https://docs.github.com/en/get-started/quickstart/set-up-git)
- When the keypair is generated, the key fingerpint is displayed which is the hash key to quickly identify your public key and is not the public key itself
- Helpful commands such as ```ls -a```, ```cd <dir>```, and ```cat <file>``` to help identify and read your public key

**2. Creating a New Repository**

You will be creating a very simple project and then saving it to the main branch. The main branch is considered the most up-to-date, stable version of your project. Create a new project with the title ```sample-project``` within GitHub. On your local machine, choose a working directory where your project can be saved. Next, within Git Bash, enter the following command to initialize a Git repository within that directory. This will enable other Git tools:
```
git init
```

Note:
- You can directly create resources with these commands: ```mkdir <dir>``` and ```touch <file>```
- When Git is initialized, it creates a hidden folder ```.git/``` and can be verified with ```ls -a``` 
To view this folder within file explorer:
```
Open File Explorer > click on View (in top ribbon) > check the box for Hidden items
```
You will now be able to see the folder ```.git``` under ```C:\Users\yourname```

**3. Python Script**

Within the same directory where you initialized Git, create a new python file called ```hello```. You can write/test your Python code within your downloaded version of Python. You can make your Python script/program as complicated or as simple as you like, however your program must meet the following requirements:
```
- Cannot prompt the user for input
- Create a unique or identifiable output
- Print to standard output
```
You can view the example ```hello.py``` to help get started.

**4. Commiting the Changes**

In order to save these changes to the main branch on GitHub, you will need to commit these changes before pushing them. Commits are snapshots of your working branch and allow you to rollback to previous versions. Modify and run the following commands:
```
git add hello.py
git commit -m "my first commit"
git branch -M main
git remote add origin git@github.com:username/sample-project.git
git push -u origin main
```
username in the git command above will be the same username you chose for your GitHub account.

When you push changes to the main branch, you are letting everyone know that the changes made are stable and working. Best practice is to use [branching](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) which allows you to work in isolation without affecting other branches. Whenever you make a clone onto another device or merge with your working directory, these changes should be reflected.

**5. Automation Through Scripting**

Automation is what allows for cloud practitioners to become successful in their careers. For this step, you will be creating a Bash script that will automatically run the ```hello.py``` that you have created and store its content within a HTML file called ```firstname_lastname.html```. You are not required to understand web programming to complete this step but here is a quick overview: HTML provides the structural component to store data, CSS makes your web page more visually appealing and intuitive, and JavaScript gives functionality to your web page. You need only to concern with [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML).

Carefully examine ```example.sh``` to understand how to create/modify the necessary HTML file. ```#!/bin/bash``` is the required header in order for a Bash script to run. 

Creating a bash script can be done throught the use of Notepad, and copying the contents of ```example.sh``` above, and modifying the contents. Additionally, you can create your own from scratch. Save your script within ```C:\Users\yourname\sample-project```

After creating and saving a Bash script called ```script.sh```, run the following command through Git Bash:
```
bash script.sh
```

You may have to use the command ```cd C:/Users/yourname/sample-project``` within Git Bash in order to be in the proper file location, if an error occurs when using the command above.


Verify that your Bash script ran successfully by opening the new HTML file located within ```C:\Users\yourname\sample-project``` and then viewing the web page. Commit and push your work to your GitHub account once more.
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
    - firstname_lastname.html
    - script.sh
```
Through this module, you have learned how to use some of the tools that are required for development and automation. For the next module, you will be uploading the HTML file you have created and host it on a web server within the cloud.
