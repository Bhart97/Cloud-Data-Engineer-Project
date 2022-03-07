## Module C: Maintaining and Modifying Existing Resources

After completing the previous modules, you are now equipped with the basic knowledge to start exploring additional topics. The only work required for this module is to simply update the existing database by adding information about your cohort into the database. Depending on whether the database is a relational database or a NoSQL database will determine how to format the data.

```
Database schema:
Database = OCP

SQL database:
CREATE TABLE cohorts (
    id NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Cohort VARCHAR(100) NOT NULL,
    TechnicalTrack VARCHAR(100) NOT NULL,
    Profile VARCHAR(100)
    PRIMARY KEY (id)
);

NoSQL database:
{
    "FirstName"  : <first name>,
    "LastName"   : <last name>,
    "Cohort"     : <cohort>,
    "tech track" : <tech track>,
    "profile"    : <profile>
}
```

## Updating the Website

(2/14/2022) The webpage is currently running on NodeJS and using the Express framework to make HTTP requests. Currently connected to a MySQL database.

To launch the website from a remote machine, the software packages ```nodejs``` and ```npm``` must be installed on the server. After the installation, the root directory of the webpage should contain both ```app.js``` and ```package-lock.json```. The JavaScript file creates the server and processes HTTP requests while the JSON file lists the dependencies required to run the webpage properly. Run the command ```npm ci``` which will create the dependencies within ```node_modules/``` described within ```package-lock.json```.

Should the webpage require a clean installation, install ```nodejs``` and ```npm``` on the server and run ```npm init``` to create the default ```node_modules/```. Then run ```npm install express``` and ```npm install mysql```.

You can simply launch the webpage through the command either ```npm start``` or ```node app.js``` and can be modified such that the [server can be ran until the instance shuts down](https://www.npmjs.com/package/forever). You can visit the web page through ```IP-ADDRESS : PORT-NUMBER``` (e.g., 44.127.34.05:3000 where 44.127.34.05 is the public IP address and 3000 is the port number) or assign a domain name.

## Moving Forward

For this repository, you can consider it as a playground where you can experiment and create different things ranging from a simple program or perhaps a script that automates certain tasks. Take advantage of this resource to showcase any of your work or to review any of the other works accomplished by your current and former peers.

If you are interested in having a side project to enhance your learning outside the traditional learning path such as online learning courses, then use this opportunity to do so. It is recommended to learn more about the [branching](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) features of GitHub if you want to start contributing.